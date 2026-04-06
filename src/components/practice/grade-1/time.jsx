import React, { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Home, ArrowRight, Timer, Trophy, Star, ChevronLeft, RefreshCw, FileText, Check, X, Eye, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSessionLogger } from '@/hooks/useSessionLogger';
import { NODE_IDS } from '@/lib/curriculumIds';
import Navbar from '../../Navbar';
import { TOPIC_CONFIGS } from '../../../lib/topicConfig';
import { LatexText } from '../../LatexText';
import ExplanationModal from '../../ExplanationModal';
import StickerExit from '../../StickerExit';
import mascotImg from '../../../assets/mascot.png';
import avatarImg from '../../../assets/avatar.png';
import '../../../pages/juniors/class-1/Grade1Practice.css';

const DynamicVisual = ({ type, data }) => {
    if (type === 'day-night') {
        const { scenario, visualType } = data;
        return (
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="g1-time-visual">
                <div style={{
                    width: 'clamp(140px, 45vw, 200px)', height: 'clamp(140px, 45vw, 200px)', borderRadius: '40px',
                    background: scenario === 'Day' ? 'linear-gradient(135deg, #87CEEB, #BAE6FD)' : 'linear-gradient(135deg, #1E1B4B, #312E81)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: '0 15px 35px rgba(0,0,0,0.1)',
                    position: 'relative', overflow: 'hidden', border: '4px solid white'
                }}>
                    {visualType === 'sun' && (
                        <svg width="80%" height="80%" viewBox="0 0 100 100">
                            <defs>
                                <radialGradient id="sunGradient" cx="50%" cy="50%" r="50%">
                                    <stop offset="0%" stopColor="#FFF7ED" />
                                    <stop offset="60%" stopColor="#FBBF24" />
                                    <stop offset="100%" stopColor="#EA580C" />
                                </radialGradient>
                            </defs>
                            <motion.g animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} style={{ transformOrigin: 'center' }}>
                                {[...Array(12)].map((_, i) => (
                                    <path 
                                        key={i} 
                                        d="M 50 10 L 55 25 L 45 25 Z" 
                                        fill="#FDE047" 
                                        transform={`rotate(${i * 30}, 50, 50)`} 
                                    />
                                ))}
                            </motion.g>
                            <circle cx="50" cy="50" r="28" fill="url(#sunGradient)" filter="drop-shadow(0 0 10px rgba(251, 191, 36, 0.6))" />
                        </svg>
                    )}

                    {visualType === 'moon' && (
                        <svg width="80%" height="80%" viewBox="0 0 100 100">
                            <defs>
                                <filter id="moonGlow">
                                    <feGaussianBlur in="SourceAlpha" stdDeviation="2" />
                                    <feOffset dx="0" dy="0" result="offsetblur" />
                                    <feComponentTransfer><feFuncA type="linear" slope="0.5"/></feComponentTransfer>
                                    <feMerge><feMergeNode /><feMergeNode in="SourceGraphic" /></feMerge>
                                </filter>
                            </defs>
                            {[...Array(6)].map((_, i) => (
                                <motion.circle 
                                    key={i} 
                                    cx={Math.random() * 80 + 10} 
                                    cy={Math.random() * 80 + 10} 
                                    r={Math.random() * 1.5 + 0.5} 
                                    fill="white" 
                                    animate={{ opacity: [0.2, 1, 0.2] }} 
                                    transition={{ duration: Math.random() * 2 + 1, repeat: Infinity }} 
                                />
                            ))}
                            <path 
                                d="M 65 30 A 35 35 0 1 0 65 70 A 28 28 0 1 1 65 30 Z" 
                                fill="#F1F5F9" 
                                filter="url(#moonGlow)" 
                                transform="rotate(-15, 50, 50)" 
                            />
                        </svg>
                    )}

                    {visualType === 'sleep' && (
                        <svg width="80%" height="80%" viewBox="0 0 100 100">
                            <defs>
                                <filter id="glow">
                                    <feGaussianBlur stdDeviation="1.5" result="coloredBlur"/>
                                    <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
                                </filter>
                            </defs>
                            <path d="M 20 70 L 80 70 L 80 50 L 20 50 Z" fill="#4338CA" rx="5" />
                            <circle cx="20" cy="70" r="3" fill="#312E81" />
                            <circle cx="80" cy="70" r="3" fill="#312E81" />
                            <rect x="22" y="52" width="56" height="15" fill="#6366F1" rx="4" />
                            <rect x="25" y="45" width="15" height="8" fill="#F8FAFC" rx="3" />
                            <motion.text 
                                x="60" y="40" fontSize="12" fill="#E2E8F0" fontWeight="bold" 
                                animate={{ y: [40, 20], opacity: [1, 0], scale: [0.8, 1.2] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            >Z</motion.text>
                            <motion.text 
                                x="70" y="30" fontSize="8" fill="#E2E8F0" fontWeight="bold" 
                                animate={{ y: [30, 10], opacity: [1, 0], scale: [0.8, 1.2] }}
                                transition={{ duration: 2, delay: 0.7, repeat: Infinity }}
                            >z</motion.text>
                        </svg>
                    )}

                    {visualType === 'breakfast' && (
                        <svg width="80%" height="80%" viewBox="0 0 100 100">
                            <circle cx="50" cy="65" r="30" fill="#F1F5F9" stroke="#E2E8F0" strokeWidth="2" />
                            <circle cx="50" cy="65" r="22" fill="#FFFFFF" stroke="#F1F5F9" strokeWidth="1" />
                            <rect x="38" y="55" width="24" height="20" fill="#FDE68A" rx="2" transform="rotate(-5, 50, 65)" />
                            <path d="M 65 45 L 85 45 L 83 65 L 67 65 Z" fill="#FF6B6B" rx="3" />
                            <path d="M 85 50 Q 92 50 92 57 Q 92 64 85 64" fill="none" stroke="#FF6B6B" strokeWidth="3" />
                            <motion.path 
                                d="M 70 40 Q 72 35 70 30" 
                                fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round"
                                animate={{ y: [0, -10], opacity: [0, 0.8, 0] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            />
                            <motion.path 
                                d="M 78 40 Q 80 35 78 30" 
                                fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round"
                                animate={{ y: [0, -10], opacity: [0, 0.8, 0] }}
                                transition={{ duration: 2, delay: 0.5, repeat: Infinity }}
                            />
                        </svg>
                    )}
                </div>
                <div style={{ marginTop: '15px', fontWeight: 400, fontSize: '1.2rem', color: '#1E293B', textAlign: 'center' }}>
                    {scenario} Time! {scenario === 'Day' ? '☀️' : '🌙'}
                </div>
            </motion.div>
        );
    }
    if (type === 'clock') {
        const { hour } = data;
        const hourAngle = (hour % 12) * 30;
        return (
            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="g1-clock-visual">
                <svg width="100%" height="100%" style={{ maxWidth: '220px', filter: 'drop-shadow(0 12px 20px rgba(0,0,0,0.15))' }} viewBox="0 0 120 120">
                    <defs>
                        <radialGradient id="clockFace" cx="50%" cy="50%" r="50%">
                            <stop offset="85%" style={{ stopColor: '#ffffff', stopOpacity: 1 }} />
                            <stop offset="100%" style={{ stopColor: '#f8f9fa', stopOpacity: 1 }} />
                        </radialGradient>
                    </defs>
                    <circle cx="60" cy="60" r="58" fill="#333" />
                    <circle cx="60" cy="60" r="55" fill="url(#clockFace)" />

                    {/* Tick Marks */}
                    {Array.from({ length: 60 }).map((_, i) => {
                        const angle = i * 6 * Math.PI / 180;
                        const isMajor = i % 5 === 0;
                        return (
                            <line
                                key={i}
                                x1={60 + (isMajor ? 48 : 50) * Math.sin(angle)}
                                y1={60 - (isMajor ? 48 : 50) * Math.cos(angle)}
                                x2={60 + 53 * Math.sin(angle)}
                                y2={60 - 53 * Math.cos(angle)}
                                stroke={isMajor ? "#333" : "#999"}
                                strokeWidth={isMajor ? 1.5 : 0.8}
                            />
                        );
                    })}

                    {/* Numbers */}
                    {Array.from({ length: 12 }).map((_, i) => {
                        const angle = (i + 1) * 30 * Math.PI / 180;
                        return (
                            <text
                                key={i} x={60 + 38 * Math.sin(angle)} y={60 - 38 * Math.cos(angle)}
                                textAnchor="middle" fontSize="10" fontWeight="400" fill="#2D3436" dominantBaseline="middle"
                                style={{ fontFamily: 'Nunito, sans-serif' }}
                            >
                                {i + 1}
                            </text>
                        );
                    })}

                    {/* Hour Hand */}
                    <g transform={`rotate(${hourAngle}, 60, 60)`}>
                        <line x1="60" y1="60" x2="60" y2="35" stroke="#333" strokeWidth="6" strokeLinecap="round" />
                    </g>

                    {/* Minute Hand (Always at 12 for Grade 1) */}
                    <line x1="60" y1="60" x2="60" y2="22" stroke="#FF6B6B" strokeWidth="4" strokeLinecap="round" />

                    <circle cx="60" cy="60" r="5" fill="#333" />
                    <circle cx="60" cy="60" r="2" fill="#fff" />
                </svg>
            </motion.div>
        );
    }
    if (type === 'days-week') {
        const { day, isAfter, label } = data;
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        return (
            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="g1-calendar-visual-full">
                <div style={{
                    background: 'white',
                    padding: '25px',
                    borderRadius: '35px',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.08)',
                    border: '4px solid #F0F4F8',
                    maxWidth: '650px'
                }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                        <h3 style={{ margin: 0, color: '#31326F', fontWeight: 400, fontSize: '1.2rem', fontFamily: 'Nunito, sans-serif' }}>
                            {label === 'ORDER' ? 'WEEKLY ORDER 🔢' : 'WEEKLY CALENDAR 📅'}
                        </h3>
                        <div style={{ background: '#F0F4F8', padding: '5px 15px', borderRadius: '15px', fontSize: '0.8rem', color: '#64748B', fontWeight: 400 }}>
                            7 DAYS
                        </div>
                    </div>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(7, 1fr)',
                        gap: '10px',
                        marginBottom: '15px'
                    }}>
                        {days.map((d, i) => (
                            <div key={d} style={{ textAlign: 'center' }}>
                                <div style={{
                                    fontSize: '0.7rem',
                                    fontWeight: 400,
                                    color: '#94A3B8',
                                    marginBottom: '5px'
                                }}>
                                    {i + 1}{i === 0 ? 'st' : i === 1 ? 'nd' : i === 2 ? 'rd' : 'th'}
                                </div>
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    style={{
                                        background: d === day ? (label === 'ORDER' ? '#4C51BF' : '#FF6B6B') : '#F8FAFC',
                                        color: d === day ? 'white' : '#475569',
                                        padding: '12px 5px',
                                        borderRadius: '12px',
                                        fontSize: '0.75rem',
                                        fontWeight: 400,
                                        border: d === day ? 'none' : '2px solid #E2E8F0',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        gap: '5px',
                                        minHeight: '60px',
                                        justifyContent: 'center',
                                        boxShadow: d === day ? '0 8px 15px rgba(0,0,0,0.1)' : 'none'
                                    }}
                                >
                                    <span style={{ fontSize: '1rem' }}>
                                        {d === 'Sunday' ? '🏠' : d === 'Saturday' ? '🎉' : '📅'}
                                    </span>
                                    {d.substring(0, 3)}
                                </motion.div>
                            </div>
                        ))}
                    </div>

                    {label === 'ORDER' ? (
                        <div style={{ background: '#EEF2FF', padding: '15px', borderRadius: '20px', textAlign: 'center', border: '2px solid #C3DAFE' }}>
                            <span style={{ color: '#4C51BF', fontWeight: 400, fontSize: '0.95rem' }}>
                                Can you count to the correct day? 🧐
                            </span>
                        </div>
                    ) : (
                        <div style={{ background: '#FFF5F5', padding: '15px', borderRadius: '20px', textAlign: 'center', border: '2px solid #FED7D7' }}>
                            <span style={{ color: '#E53E3E', fontWeight: 400, fontSize: '0.95rem' }}>
                                {isAfter ? `Looking for the day AFTER ${day} ➡️` : `Looking for the day BEFORE ${day} ⬅️`}
                            </span>
                        </div>
                    )}
                </div>
            </motion.div>
        );
    }
    return null;
};

const SKILL_ID_MAP = {
    '601': NODE_IDS.g1MathTimeDayNight,
    '602': NODE_IDS.g1MathTimeDaysWeek,
    '603': NODE_IDS.g1MathTimeBeforeAfter,
    '604': NODE_IDS.g1MathTimeClock,
    '605': NODE_IDS.g1MathTimeMixed,
};

const Time = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { startSession, logAnswer, finishSession } = useSessionLogger();

    const queryParams = new URLSearchParams(location.search);
    const skillId = queryParams.get('skillId');
    const isTest = skillId === '605';
    const totalQuestions = isTest ? 15 : 5;

    const [qIndex, setQIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [showResults, setShowResults] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const [isAnswered, setIsAnswered] = useState(false);
    const [timer, setTimer] = useState(0);
    const [answers, setAnswers] = useState({});
    const [sessionQuestions, setSessionQuestions] = useState([]);
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
        return { topicName: 'Time', skillName: 'Mathematics', grade: '1' };
    };

    const { topicName, skillName } = getTopicInfo();

    const getNextSkill = () => {
        const { grade } = getTopicInfo();
        const gradeConfig = TOPIC_CONFIGS[grade];
        const topics = Object.keys(gradeConfig);
        let currentTopicIdx = -1;
        let currentSkillIdx = -1;
        for (let i = 0; i < topics.length; i++) {
            const skills = gradeConfig[topics[i]];
            const idx = skills.findIndex(s => s.id === skillId);
            if (idx !== -1) { currentTopicIdx = i; currentSkillIdx = idx; break; }
        }
        if (currentTopicIdx === -1) return null;
        const currentTopicSkills = gradeConfig[topics[currentTopicIdx]];
        if (currentSkillIdx < currentTopicSkills.length - 1) {
            return { ...currentTopicSkills[currentSkillIdx + 1], topicName: topics[currentTopicIdx] };
        }
        if (currentTopicIdx < topics.length - 1) {
            const nextTopicName = topics[currentTopicIdx + 1];
            const nextTopicSkills = gradeConfig[nextTopicName];
            if (nextTopicSkills.length > 0) return { ...nextTopicSkills[0], topicName: nextTopicName };
        }
        return null;
    };

    const generateQuestions = (selectedSkill) => {
        const questions = [];
        const types = ['day-night', 'days-week', 'clock'];
        for (let i = 0; i < totalQuestions; i++) {
            let type = '';
            if (isTest) {
                if (i < 3) type = 'day-night';
                else if (i < 7) type = 'days-week';
                else if (i < 11) type = 'before-after';
                else type = 'clock';
            } else {
                if (selectedSkill === '601') type = 'day-night';
                else if (selectedSkill === '602') type = 'days-week';
                else if (selectedSkill === '603') type = 'before-after';
                else if (selectedSkill === '604') type = 'clock';
                else type = types[i % types.length];
            }
            let question = {};
            if (type === 'day-night') {
                const scenarios = [
                    { q: 'When can we see the big yellow Sun?', a: 'Day', vt: 'sun' },
                    { q: 'When do we see the silver Moon?', a: 'Night', vt: 'moon' },
                    { q: 'When is it time to put on our sleeping clothes and go to bed? 😴', a: 'Night', vt: 'sleep' },
                    { q: 'When do we have yummy breakfast? 🥞', a: 'Day', vt: 'breakfast' },
                    { q: 'When do we see the beautiful twinkling stars in the sky? ✨', a: 'Night', vt: 'moon' }
                ];
                const item = scenarios[Math.floor(Math.random() * scenarios.length)];
                question = {
                    text: item.q,
                    options: ['Day', 'Night'].sort(() => 0.5 - Math.random()),
                    correct: item.a,
                    type: 'day-night',
                    visualData: { scenario: item.a, visualType: item.vt },
                    explanation: `We usually associate this activity or visual with the ${item.a.toUpperCase()} time.`
                };
            } else if (type === 'days-week') {
                const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
                const orderText = ['first', 'second', 'third', 'fourth', 'fifth', 'sixth', 'seventh'];
                const idx = Math.floor(Math.random() * 7);
                question = {
                    text: `If Sunday is the first day, which day is the ${orderText[idx]} day of the week?`,
                    options: [days[idx], days[(idx + 2) % 7], days[(idx + 4) % 7], days[(idx + 5) % 7]].sort(() => 0.5 - Math.random()),
                    correct: days[idx],
                    type: 'days-week',
                    visualData: { day: days[idx], isAfter: true, label: 'ORDER' },
                    explanation: `Counting from Sunday, the ${orderText[idx]} day is ${days[idx]}.`
                };
            } else if (type === 'before-after') {
                const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
                const dayIdx = Math.floor(Math.random() * days.length);
                const isAfter = Math.random() > 0.5;
                const targetIdx = isAfter ? (dayIdx + 1) % 7 : (dayIdx - 1 + 7) % 7;
                question = {
                    text: `Which day comes ${isAfter ? 'AFTER' : 'BEFORE'} ${days[dayIdx]}?`,
                    options: [days[targetIdx], days[(targetIdx + 2) % 7], days[(targetIdx + 4) % 7], days[(targetIdx + 5) % 7]].sort(() => 0.5 - Math.random()),
                    correct: days[targetIdx],
                    type: 'days-week',
                    visualData: { day: days[dayIdx], isAfter },
                    explanation: `The day ${isAfter ? 'after' : 'before'} ${days[dayIdx]} is ${days[targetIdx]}.`
                };
            } else {
                const hour = Math.floor(Math.random() * 12) + 1;
                question = {
                    text: `Look at the clock! What hour is the little hand showing?`,
                    options: [`${hour} o'clock`, `${(hour % 12) + 1} o'clock`, `${(hour + 10) % 12 + 1} o'clock`, `${(hour + 9) % 12 + 1} o'clock`].sort(() => 0.5 - Math.random()),
                    correct: `${hour} o'clock`,
                    type: 'clock',
                    visualData: { hour },
                    explanation: `The short hour hand points exactly to ${hour}, which means it is ${hour} o'clock.`
                };
            }
            questions.push(question);
        }
        return questions;
    };

    useEffect(() => {
        const qs = generateQuestions(skillId);
        setSessionQuestions(qs);
        const nodeId = SKILL_ID_MAP[skillId] || NODE_IDS.g1MathTimeMixed;
        startSession({ nodeId, sessionType: isTest ? 'assessment' : 'practice' });
    }, [skillId, isTest, startSession]);

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
        navigate('/junior/grade/1');
    };

    const handleOptionSelect = (option) => {
        if (isAnswered) return;
        setSelectedOption(option);
    };

    const handleSubmit = () => {
        if (isAnswered || selectedOption === null) return;
        const option = selectedOption;
        const currentQ = sessionQuestions[qIndex];
        const isCorrect = option === currentQ.correct;

        setIsAnswered(true);
        if (isCorrect) setScore(s => s + 1);

        const answerData = {
            question_text: currentQ.text,
            selected: option,
            correct: currentQ.correct,
            isCorrect
        };

        logAnswer({
            question_index: qIndex,
            answer_json: answerData,
            is_correct: isCorrect ? 1 : 0
        });

        setAnswers(prev => ({
            ...prev,
            [qIndex]: {
                selectedOption: option,
                isCorrect,
                type: currentQ.type,
                visualData: currentQ.visualData,
                questionText: currentQ.text,
                correctAnswer: currentQ.correct,
                explanation: currentQ.explanation || "Detailed explanation is coming soon!"
            }
        }));

        if (!isTest) {
            setShowExplanationModal(true);
        } else {
            handleNext();
        }
    };

    const handleSkip = () => {
        if (isAnswered) return;
        const currentQ = sessionQuestions[qIndex];

        logAnswer({
            question_index: qIndex,
            answer_json: { question_text: currentQ.text, selected: 'Skipped', correct: currentQ.correct, isCorrect: false },
            is_correct: 0
        });

        setAnswers(prev => ({
            ...prev,
            [qIndex]: {
                selectedOption: 'Skipped',
                isCorrect: false,
                type: currentQ.type,
                visualData: currentQ.visualData,
                questionText: currentQ.text,
                correctAnswer: currentQ.correct,
                explanation: "This question was skipped. " + currentQ.explanation
            }
        }));
        handleNext();
    };

    const handleNext = async () => {
        if (qIndex < totalQuestions - 1) {
            setQIndex(v => v + 1);
        } else {
            finishSession({
                totalQuestions,
                questionsAnswered: Object.keys(answers).length,
                answersPayload: answers
            });
            setShowResults(true);
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
                        <h2 style={{ fontSize: '2.5rem', fontWeight: 400, color: '#31326F', fontFamily: 'Nunito, sans-serif' }}>Quest Complete! 🎉</h2>

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
                                    {isTest ? (qIndex === totalQuestions - 1 ? 'Finish Test' : 'Next Question') : 'Check Answer'} <ChevronRight size={24} />
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

export default Time;

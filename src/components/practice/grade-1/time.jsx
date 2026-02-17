import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Home, ArrowRight, Timer, Trophy, Star, ChevronLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../../contexts/AuthContext';
import { api } from '../../../services/api';
import Navbar from '../../Navbar';
import { TOPIC_CONFIGS } from '../../../lib/topicConfig';
import './Grade1Practice.css';

const TOTAL_QUESTIONS = 5;

const DynamicVisual = ({ type, data }) => {
    if (type === 'day-night') {
        const { scenario } = data;
        return (
            <motion.div initial={{ scale: 0.8, rotate: -5 }} animate={{ scale: 1, rotate: 0 }} className="g1-time-visual">
                <div style={{
                    width: 'clamp(120px, 40vw, 180px)', height: 'clamp(120px, 40vw, 180px)', borderRadius: '50%',
                    background: scenario === 'Day' ? 'linear-gradient(135deg, #FFD700, #FFA500)' : 'linear-gradient(135deg, #1a1a2e, #16213e)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
                    position: 'relative', overflow: 'hidden'
                }}>
                    {scenario === 'Day' ? (
                        <>
                            <motion.div animate={{ rotate: 360 }} transition={{ duration: 10, repeat: Infinity, ease: "linear" }} style={{ position: 'absolute' }}>
                                <Star color="#fff" fill="#fff" size={'clamp(60px, 20vw, 100px)'} opacity={0.2} />
                            </motion.div>
                            <span style={{ fontSize: 'clamp(40px, 15vw, 60px)' }}>☀️</span>
                        </>
                    ) : (
                        <>
                            <div style={{ position: 'absolute', top: '20px', left: '30px', fontSize: '14px' }}>✨</div>
                            <div style={{ position: 'absolute', bottom: '30px', right: '40px', fontSize: '10px' }}>⭐</div>
                            <span style={{ fontSize: '60px' }}>🌙</span>
                        </>
                    )}
                </div>
            </motion.div>
        );
    }
    if (type === 'clock') {
        const { hour } = data;
        const hourAngle = (hour % 12) * 30;
        return (
            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="g1-clock-visual">
                <svg width="100%" height="auto" style={{ maxWidth: '180px', filter: 'drop-shadow(0 8px 12px rgba(0,0,0,0.1))' }} viewBox="0 0 120 120">
                    <defs>
                        <linearGradient id="clockGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" style={{ stopColor: '#ffffff', stopOpacity: 1 }} />
                            <stop offset="100%" style={{ stopColor: '#f0f0f0', stopOpacity: 1 }} />
                        </linearGradient>
                    </defs>
                    <circle cx="60" cy="60" r="55" fill="url(#clockGrad)" stroke="#333" strokeWidth="2.5" />
                    {Array.from({ length: 12 }).map((_, i) => {
                        const angle = (i + 1) * 30 * Math.PI / 180;
                        return (
                            <text
                                key={i} x={60 + 42 * Math.sin(angle)} y={60 - 42 * Math.cos(angle)}
                                textAnchor="middle" fontSize="9" fontWeight="800" fill="#333" dominantBaseline="middle"
                            >
                                {i + 1}
                            </text>
                        );
                    })}
                    {/* Hour Hand */}
                    <motion.line
                        x1="60" y1="60" x2="60" y2="35" animate={{ rotate: hourAngle }} style={{ transformOrigin: '60px 60px' }}
                        stroke="#333" strokeWidth="5" strokeLinecap="round"
                    />
                    {/* Minute Hand (Always at 12 for Grade 1 o'clock) */}
                    <line x1="60" y1="60" x2="60" y2="25" stroke="#FF6B6B" strokeWidth="3" strokeLinecap="round" />
                    <circle cx="60" cy="60" r="4" fill="#333" />
                </svg>
            </motion.div>
        );
    }
    return null;
};

const MOTIVATIONS = [
    { text: "Spectacular!", sub: "You're doing amazing!" },
    { text: "You're a Star!", sub: "Keep up the great work!" },
    { text: "Brilliant!", sub: "That's exactly right!" },
    { text: "Amazing!", sub: "You're a math wizard!" },
    { text: "Fantastic!", sub: "You've got this!" },
    { text: "Great Job!", sub: "Everything looks perfect!" }
];

const Time = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const skillId = queryParams.get('skillId');

    const [qIndex, setQIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [showResults, setShowResults] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const [isAnswered, setIsAnswered] = useState(false);
    const [timer, setTimer] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [sessionQuestions, setSessionQuestions] = useState([]);
    const [sessionId, setSessionId] = useState(null);
    const [motivation, setMotivation] = useState(null);

    const getTopicInfo = () => {
        const grade1Config = TOPIC_CONFIGS['1'];
        for (const [topicName, skills] of Object.entries(grade1Config)) {
            const skill = skills.find(s => s.id === skillId);
            if (skill) return { topicName, skillName: skill.name };
        }
        return { topicName: 'Time', skillName: 'Mathematics' };
    };

    const { topicName, skillName } = getTopicInfo();

    const generateQuestions = (selectedSkill) => {
        const questions = [];
        const types = ['day-night', 'days-week', 'clock'];

        for (let i = 0; i < TOTAL_QUESTIONS; i++) {
            let type = '';
            if (selectedSkill === 'G1-CH12-01') type = 'clock';
            else if (selectedSkill === 'G1-CH12-02') type = 'days-week';
            else type = types[i % types.length];

            let question = {};

            if (type === 'day-night') {
                const scenarios = [
                    { q: 'When can we see the big yellow Sun? ☀️', a: 'Day' },
                    { q: 'When do we see the silver Moon and Stars? ✨', a: 'Night' },
                    { q: 'When is it time to put on PJs and sleep? 😴', a: 'Night' },
                    { q: 'When do we have yummy breakfast? 🥞', a: 'Day' }
                ];
                const item = scenarios[Math.floor(Math.random() * scenarios.length)];
                question = {
                    text: item.q,
                    options: ['Day', 'Night'].sort(() => 0.5 - Math.random()),
                    correct: item.a,
                    type: 'day-night',
                    visualData: { scenario: item.a }
                };
            } else if (type === 'days-week') {
                const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
                const dayIdx = Math.floor(Math.random() * days.length);
                const isAfter = Math.random() > 0.5;
                const targetIdx = isAfter ? (dayIdx + 1) % 7 : (dayIdx - 1 + 7) % 7;
                question = {
                    text: `Checking the calendar! Which day comes ${isAfter ? 'AFTER' : 'BEFORE'} ${days[dayIdx]}? 📅`,
                    options: [days[targetIdx], days[(targetIdx + 2) % 7], days[(targetIdx + 4) % 7]].sort(() => 0.5 - Math.random()),
                    correct: days[targetIdx],
                    type: 'days-week'
                };
            } else {
                const hour = Math.floor(Math.random() * 12) + 1;
                question = {
                    text: `Look at the clock! What hour is the little hand showing? 🕒`,
                    options: [`${hour} o'clock`, `${(hour % 12) + 1} o'clock`, `${(hour + 10) % 12 + 1} o'clock`].sort(() => 0.5 - Math.random()),
                    correct: `${hour} o'clock`,
                    type: 'clock',
                    visualData: { hour }
                };
            }
            questions.push(question);
        }
        return questions;
    };

    useEffect(() => {
        const init = async () => {
            const qs = generateQuestions(skillId);
            setSessionQuestions(qs);
            try {
                const session = await api.createPracticeSession(user?.id, 'time-grade1');
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

    const handleOptionSelect = (option) => {
        if (isAnswered) return;
        setSelectedOption(option);
        setIsAnswered(true);
        const isCorrect = option === sessionQuestions[qIndex].correct;
        if (isCorrect) {
            setScore(s => s + 1);
            setMotivation(MOTIVATIONS[Math.floor(Math.random() * MOTIVATIONS.length)]);
        } else {
            setMotivation(null);
        }

        setAnswers([...answers, {
            question: sessionQuestions[qIndex].text,
            selected: option,
            correct: sessionQuestions[qIndex].correct,
            isCorrect
        }]);
    };

    const handleNext = async () => {
        if (qIndex < TOTAL_QUESTIONS - 1) {
            setQIndex(v => v + 1);
            setSelectedOption(null);
            setIsAnswered(false);
            setMotivation(null);
        } else {
            setShowResults(true);
            try {
                if (sessionId) {
                    await api.finishSession(sessionId);
                    await api.createReport({
                        session_id: sessionId,
                        user_id: user?.id,
                        score: score,
                        total_questions: TOTAL_QUESTIONS,
                        time_spent: timer,
                        answers: answers
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
        return (
            <div className="grade1-practice-page">
                <Navbar />
                <div className="g1-practice-container">
                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="g1-question-card g1-results-card">
                        <div className="g1-trophy-container">🏆</div>
                        <h2 className="g1-question-text">Quest Complete!</h2>
                        <div className="results-stats">
                            <div className="g1-stat-badge">
                                <Star color="#FFD700" fill="#FFD700" />
                                <span className="g1-stat-value">{score}/{TOTAL_QUESTIONS}</span>
                            </div>
                            <div className="g1-stat-badge">
                                <Timer color="#4ECDC4" />
                                <span className="g1-stat-value">{formatTime(timer)}</span>
                            </div>
                        </div>
                        <div className="g1-next-action">
                            <button className="g1-primary-btn" onClick={() => navigate('/junior/grade/1')}>
                                Back to Map <ArrowRight />
                            </button>
                        </div>
                    </motion.div>
                </div>
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
                    <button className="g1-back-btn" onClick={() => navigate(-1)}>
                        <ChevronLeft size={20} /> Back
                    </button>

                    <div className="g1-timer-badge">
                        <Timer size={18} />
                        {formatTime(timer)}
                    </div>

                    <div style={{ fontWeight: 800, color: '#666', fontSize: '1rem', background: 'white', padding: '8px 15px', borderRadius: '15px', boxShadow: '0 4px 10px rgba(0,0,0,0.05)' }}>
                        Question {qIndex + 1} of {TOTAL_QUESTIONS}
                    </div>
                </div>

                <div className="g1-progress-container" style={{ margin: '0 0 30px 0' }}>
                    <div className="g1-progress-fill" style={{ width: `${((qIndex + 1) / TOTAL_QUESTIONS) * 100}%` }}></div>
                </div>

                <div className="g1-topic-skill-header">
                    <span className="g1-topic-name">{topicName}</span>
                    <h1 className="g1-skill-name">{skillName}</h1>
                </div>

                <motion.div key={qIndex} initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="g1-question-card">
                    <div className="g1-visual-area">
                        <DynamicVisual type={currentQ.type} data={currentQ.visualData} />
                    </div>

                    <h2 className="g1-question-text">{currentQ.text}</h2>

                    <div className="g1-options-grid">
                        {currentQ.options.map((opt, i) => (
                            <button
                                key={i}
                                className={`g1-option-btn 
                                    ${selectedOption === opt ? (opt === currentQ.correct ? 'selected-correct' : 'selected-wrong') : ''}
                                    ${isAnswered && opt === currentQ.correct ? 'revealed-correct' : ''}
                                `}
                                onClick={() => handleOptionSelect(opt)}
                                disabled={isAnswered}
                            >
                                {opt}
                            </button>
                        ))}
                    </div>

                    <AnimatePresence>
                        {isAnswered && (
                            <motion.div
                                initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -20, opacity: 0 }}
                                className="g1-next-action"
                                style={{ flexDirection: 'column', gap: '20px' }}
                            >
                                {motivation && (
                                    <motion.div
                                        initial={{ scale: 0.8 }} animate={{ scale: 1 }}
                                        className="g1-motivation-container"
                                    >
                                        <span className="g1-motivation-text">{motivation.text}</span>
                                        <span className="g1-motivation-sub">{motivation.sub}</span>
                                    </motion.div>
                                )}
                                <button className="g1-primary-btn" style={{ padding: '20px 60px', borderRadius: '40px', fontSize: '1.4rem' }} onClick={handleNext}>
                                    {qIndex === TOTAL_QUESTIONS - 1 ? 'Finish Quest 🏆' : 'Next Challenge 🚀'} <ArrowRight />
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </div>
        </div>
    );
};

export default Time;

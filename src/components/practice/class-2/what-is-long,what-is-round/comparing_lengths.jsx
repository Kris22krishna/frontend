import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Home, ArrowRight, Timer, Trophy, Star, ChevronLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../../../contexts/AuthContext';
import { api } from '../../../../services/api';
import Navbar from '../../../Navbar';
import { TOPIC_CONFIGS } from '../../../../lib/topicConfig';
import '../../grade-1/Grade1Practice.css';

const TOTAL_QUESTIONS = 5;

const DynamicVisual = ({ data }) => {
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
            <div style={{ fontSize: '0.9rem', color: '#64748b', textAlign: 'center', marginBottom: '10px', fontWeight: 'bold' }}>
                📏 Align objects at the start to compare!
            </div>
            {renderObject(aLength, '#4ECDC4', objectType, 'A')}
            {renderObject(bLength, '#FF6B6B', objectType, 'B')}
        </div>
    );
};

const MOTIVATIONS = [
    { text: "Spectacular!", sub: "You're doing amazing!" },
    { text: "You're a Star!", sub: "Keep up the great work!" },
    { text: "Brilliant!", sub: "That's exactly right!" },
    { text: "Amazing!", sub: "You're a math wizard!" },
    { text: "Fantastic!", sub: "You've got this!" },
    { text: "Great Job!", sub: "Everything looks perfect!" }
];

const ComparingLengths = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const skillId = queryParams.get('skillId') || '1002';

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
        const grade2Config = TOPIC_CONFIGS['2'];
        for (const [topicName, skills] of Object.entries(grade2Config)) {
            const skill = skills.find(s => s.id === skillId);
            if (skill) return { topicName, skillName: skill.name };
        }
        return { topicName: 'What is Long, What is Round?', skillName: 'Comparing lengths' };
    };

    const { topicName, skillName } = getTopicInfo();

    const generateQuestions = () => {
        const questions = [];
        const objectTypes = ['pencil', 'bat', 'snake', 'ruler'];
        for (let i = 0; i < TOTAL_QUESTIONS; i++) {
            const isALonger = Math.random() > 0.5;
            const aLen = isALonger ? 85 : 45;
            const bLen = isALonger ? 45 : 85;
            const longerQ = Math.random() > 0.5;
            const objectType = objectTypes[Math.floor(Math.random() * objectTypes.length)];

            const question = {
                text: longerQ ? `Which one is LONGER? 📏` : `Which one is SHORTER? 📐`,
                options: ['A', 'B'],
                correct: longerQ ? (isALonger ? 'A' : 'B') : (isALonger ? 'B' : 'A'),
                visualData: { aLength: aLen, bLength: bLen, objectType }
            };
            questions.push(question);
        }
        return questions;
    };

    useEffect(() => {
        const init = async () => {
            const qs = generateQuestions();
            setSessionQuestions(qs);
            try {
                const session = await api.createPracticeSession(user?.id, 'comparing-lengths');
                setSessionId(session?.session_id);
            } catch (e) { console.error(e); }
        };
        init();
    }, [user]);

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
                        <h2 className="g1-question-text">Great Work!</h2>
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
                            <button className="g1-primary-btn" onClick={() => navigate('/junior/grade/2')}>
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

                    <div style={{ fontWeight: 800, color: '#666', fontSize: '1rem', background: 'white', padding: '5px 12px', borderRadius: '15px', boxShadow: '0 4px 10px rgba(0,0,0,0.05)' }}>
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
                    <h2 className="g1-question-text">{currentQ.text}</h2>

                    <div className="g1-content-split">
                        <div className="g1-visual-area">
                            <DynamicVisual data={currentQ.visualData} />
                        </div>

                        <div className="g1-quiz-side">
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
                                        {opt.charAt(0).toUpperCase() + opt.slice(1)}
                                    </button>
                                ))}
                            </div>
                        </div>
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

export default ComparingLengths;

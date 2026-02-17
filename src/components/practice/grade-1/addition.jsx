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
    if (type === 'visual') {
        const { n1, n2, color1, color2 } = data;
        return (
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="g1-addition-visual">
                <div style={{ display: 'flex', alignItems: 'center', gap: 'clamp(15px, 5vw, 30px)', justifyContent: 'center', flexWrap: 'wrap' }}>
                    <div className="g1-group" style={{ background: 'rgba(255,255,255,0.4)', padding: '15px', borderRadius: '25px' }}>
                        <svg width="100%" height="auto" style={{ maxWidth: '100px', maxHeight: '100px' }} viewBox="0 0 100 100">
                            {Array.from({ length: n1 }).map((_, i) => (
                                <circle key={i} cx={(i % 3) * 30 + 20} cy={Math.floor(i / 3) * 30 + 20} r="12" fill={color1} />
                            ))}
                        </svg>
                    </div>
                    <div style={{ fontSize: '3rem', fontWeight: 900, color: '#CBD5E0' }}>+</div>
                    <div className="g1-group" style={{ background: 'rgba(255,255,255,0.4)', padding: '15px', borderRadius: '25px' }}>
                        <svg width="100%" height="auto" style={{ maxWidth: '100px', maxHeight: '100px' }} viewBox="0 0 100 100">
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
            <div className="g1-numeric-card" style={{ display: 'flex', gap: 'clamp(10px, 4vw, 20px)', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap' }}>
                <motion.div initial={{ y: 20 }} animate={{ y: 0 }} className="g1-num-box" style={{ background: color1 + '20', color: color1 }}>{n1}</motion.div>
                <div style={{ fontSize: '2.5rem', fontWeight: 900, color: '#CBD5E0' }}>+</div>
                <motion.div initial={{ y: 20 }} animate={{ y: 0, transition: { delay: 0.1 } }} className="g1-num-box" style={{ background: color2 + '20', color: color2 }}>{n2}</motion.div>
                <div style={{ fontSize: '2.5rem', fontWeight: 900, color: '#CBD5E0' }}>=</div>
                <div className="g1-num-box" style={{ background: '#f0f0f0', border: '3px dashed #cbd5e0', color: '#cbd5e0' }}>?</div>
            </div>
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

const Addition = () => {
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
        return { topicName: 'Addition', skillName: 'Mathematics' };
    };

    const { topicName, skillName } = getTopicInfo();

    const generateQuestions = (selectedSkill) => {
        const questions = [];
        const colors = ['#FF6B6B', '#4ECDC4', '#FFE66D', '#98D8C8', '#C9A9E9'];

        for (let i = 0; i < TOTAL_QUESTIONS; i++) {
            let question = {};
            const color1 = colors[i % colors.length];
            const color2 = colors[(i + 1) % colors.length];

            if (selectedSkill === 'G1-CH1-04' || selectedSkill === 'G1-CH3-01' || !selectedSkill) {
                // Visual Addition
                const n1 = Math.floor(Math.random() * 5) + 1;
                const n2 = Math.floor(Math.random() * 4) + 1;
                question = {
                    text: `Count all the circles together! 🍭`,
                    options: [n1 + n2, (n1 + n2 + 1) % 11 || 1, Math.max(1, n1 + n2 - 1)].filter((v, idx, self) => self.indexOf(v) === idx).sort(() => 0.5 - Math.random()),
                    correct: n1 + n2,
                    type: 'visual',
                    visualData: { n1, n2, color1, color2 }
                };
            } else if (selectedSkill === 'G1-CH3-02') {
                // Numeric
                const n1 = Math.floor(Math.random() * 9) + 1;
                const n2 = Math.floor(Math.random() * (10 - n1));
                question = {
                    text: `What is ${n1} plus ${n2}? ➕`,
                    options: [n1 + n2, n1 + n2 + 2, Math.max(0, n1 + n2 - 1)].filter((v, idx, self) => self.indexOf(v) === idx).sort(() => 0.5 - Math.random()),
                    correct: n1 + n2,
                    type: 'numeric',
                    visualData: { n1, n2, color1, color2 }
                };
            } else if (selectedSkill === 'G1-CH3-03') {
                // Zero
                const n = Math.floor(Math.random() * 9) + 1;
                const withZeroFirst = Math.random() > 0.5;
                question = {
                    text: `Add zero to the number! ✨`,
                    options: [n, 0, n + 1].sort(() => 0.5 - Math.random()),
                    correct: n,
                    type: 'numeric',
                    visualData: { n1: withZeroFirst ? 0 : n, n2: withZeroFirst ? n : 0, color1, color2 }
                };
            } else {
                question = { text: "Add them up!", options: ["2"], correct: "2", type: "numeric", visualData: { n1: 1, n2: 1, color1, color2 } };
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
                const session = await api.createPracticeSession(user?.id, 'addition-grade1');
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

export default Addition;

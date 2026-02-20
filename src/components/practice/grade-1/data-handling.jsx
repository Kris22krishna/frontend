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
    if (type === 'sorting' || type === 'counting') {
        const { items, colorMap } = data;
        return (
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="g1-data-visual">
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(40px, 1fr))', gap: 'clamp(8px, 3vw, 15px)', justifyContent: 'center', background: 'rgba(255,255,255,0.4)', padding: 'clamp(10px, 5vw, 20px)', borderRadius: '30px', border: '2px dashed rgba(0,0,0,0.1)', width: '100%' }}>
                    {items.map((item, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ scale: 1.1, rotate: 10 }}
                            style={{
                                width: 'clamp(35px, 12vw, 50px)', height: 'clamp(35px, 12vw, 50px)', background: 'white',
                                borderRadius: '15px', display: 'flex', alignItems: 'center',
                                justifyContent: 'center', fontSize: 'clamp(1rem, 5vw, 1.5rem)',
                                boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
                                border: `2px solid ${colorMap[item]}40`
                            }}
                        >
                            {item}
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        );
    }
    if (type === 'grouping') {
        const { g1, g2, color1, color2 } = data;
        return (
            <div className="g1-grouping-areas" style={{ display: 'flex', gap: 'clamp(20px, 8vw, 40px)', justifyContent: 'center', flexWrap: 'wrap', width: '100%' }}>
                <motion.div initial={{ x: -30 }} animate={{ x: 0 }} className="g1-data-group" style={{ background: color1 + '10', borderColor: color1 }}>
                    <div className="g1-group-label" style={{ color: color1 }}>Group A</div>
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center' }}>
                        {Array.from({ length: g1 }).map((_, i) => (
                            <motion.div
                                key={i} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: i * 0.1 }}
                                style={{ width: '25px', height: '25px', backgroundColor: color1, borderRadius: '50%', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}
                            />
                        ))}
                    </div>
                </motion.div>
                <motion.div initial={{ x: 30 }} animate={{ x: 0 }} className="g1-data-group" style={{ background: color2 + '10', borderColor: color2 }}>
                    <div className="g1-group-label" style={{ color: color2 }}>Group B</div>
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center' }}>
                        {Array.from({ length: g2 }).map((_, i) => (
                            <motion.div
                                key={i} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: i * 0.1 }}
                                style={{ width: '25px', height: '25px', backgroundColor: color2, borderRadius: '50%', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}
                            />
                        ))}
                    </div>
                </motion.div>
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

const DataHandling = () => {
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
        return { topicName: 'Data Handling', skillName: 'Mathematics' };
    };

    const { topicName, skillName } = getTopicInfo();

    const generateQuestions = (selectedSkill) => {
        const questions = [];
        const colors = ['#FF6B6B', '#4ECDC4', '#FFE66D', '#98D8C8', '#C9A9E9'];

        for (let i = 0; i < TOTAL_QUESTIONS; i++) {
            let question = {};
            const types = ['sorting', 'counting', 'grouping'];
            const type = types[i % types.length];

            // For now, skillId G1-CH9-01 covers everything in Data Handling
            if (type === 'sorting') {
                const fruits = ['🍎', '🍌', '🍇'];
                const items = Array.from({ length: 8 }).map(() => fruits[Math.floor(Math.random() * 3)]);
                const target = fruits[Math.floor(Math.random() * 2)];
                const count = items.filter(f => f === target).length;
                question = {
                    text: `Look closely! How many ${target} fruits can you find? 🧺`,
                    options: [count, (count + 2) % 11, count + 1].filter((v, idx, s) => s.indexOf(v) === idx).sort(() => 0.5 - Math.random()),
                    correct: count,
                    type: 'sorting',
                    visualData: { items, colorMap: { '🍎': '#FF6B6B', '🍌': '#FFE66D', '🍇': '#C9A9E9' } }
                };
            } else if (type === 'counting') {
                const animals = ['🐶', '🐱', '🐰'];
                const items = Array.from({ length: 6 }).map(() => animals[Math.floor(Math.random() * 3)]);
                const target = animals[Math.floor(Math.random() * 3)];
                const count = items.filter(a => a === target).length;
                question = {
                    text: `Count the ${target} pets! 🐾`,
                    options: [count, count + 1, count > 0 ? count - 1 : 4].sort(() => 0.5 - Math.random()),
                    correct: count,
                    type: 'counting',
                    visualData: { items, colorMap: { '🐶': '#4ECDC4', '🐱': '#FF6B6B', '🐰': '#FFE66D' } }
                };
            } else {
                const g1 = Math.floor(Math.random() * 5) + 3;
                let g2 = Math.floor(Math.random() * 5) + 3;
                while (g1 === g2) g2 = Math.floor(Math.random() * 5) + 3;
                const isMore = Math.random() > 0.5;
                const correct = (isMore ? (g1 > g2 ? 'Group A' : 'Group B') : (g1 < g2 ? 'Group A' : 'Group B'));

                question = {
                    text: `Check the groups! Which one has ${isMore ? 'MORE' : 'FEWER'} bubbles? 🫧`,
                    options: ['Group A', 'Group B'],
                    correct: correct,
                    type: 'grouping',
                    visualData: { g1, g2, color1: colors[i % colors.length], color2: colors[(i + 1) % colors.length] }
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
                const session = await api.createPracticeSession(user?.id, 'data-handling-grade1');
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
                    <h2 className="g1-question-text">{currentQ.text}</h2>

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

export default DataHandling;

import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Home, ArrowRight, Timer, Trophy, Star, ChevronLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../../contexts/AuthContext';
import { api } from '../../../services/api';
import Navbar from '../../Navbar';
import { TOPIC_CONFIGS } from '../../../lib/topicConfig';
import './Grade1Practice.css';


const DynamicVisual = ({ type, data }) => {
    const { num, color, seq, step } = data;

    if (type === 'skip') {
        return (
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="g1-skip-visual">
                <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}>
                    {seq.map((n, i) => (
                        <motion.div
                            key={i}
                            initial={{ y: 10, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: i * 0.1 }}
                            className="g1-skip-node"
                        >
                            <div className="g1-node-circle" style={{ background: color }}>{n}</div>
                            {i < seq.length - 1 && <div className="g1-node-step">+{step}</div>}
                        </motion.div>
                    ))}
                    <div className="g1-skip-node">
                        <div className="g1-node-circle g1-node-target">?</div>
                    </div>
                </div>
            </motion.div>
        );
    }

    const tens = Math.floor(num / 10);
    const ones = num % 10;
    return (
        <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="g1-tens-grid-area" style={{ width: '100%' }}>
            <div style={{ display: 'flex', gap: '15px', alignItems: 'flex-end', justifyContent: 'center', flexWrap: 'wrap', width: '100%', maxWidth: '350px', margin: '0 auto' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '8px' }}>
                    {Array.from({ length: tens }).map((_, i) => (
                        <motion.div
                            key={i}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: i * 0.05 }}
                            style={{ display: 'flex', flexDirection: 'column-reverse', gap: '2px', padding: '3px', background: 'white', border: '2px solid #E2E8F0', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}
                        >
                            {Array.from({ length: 10 }).map((_, j) => (
                                <div key={j} style={{ width: '15px', height: '6px', backgroundColor: color, borderRadius: '1px' }}></div>
                            ))}
                        </motion.div>
                    ))}
                </div>
                {ones > 0 && (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 15px)', gap: '4px' }}>
                        {Array.from({ length: ones }).map((_, i) => (
                            <motion.div
                                key={i}
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: (tens * 0.05) + (i * 0.1) }}
                                style={{ width: '15px', height: '6px', backgroundColor: color, borderRadius: '1px', opacity: 0.8 }}
                            />
                        ))}
                    </div>
                )}
            </div>
            <div style={{ marginTop: '15px', fontSize: '1.2rem', fontWeight: 800, color: '#4A5568' }}>
                {tens} Tens and {ones} Ones
            </div>
        </motion.div>
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

const Numbers51to100 = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const skillId = queryParams.get('skillId');
    const totalQuestions = 5;

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
        return { topicName: 'Numbers 51-100', skillName: 'Mathematics' };
    };

    const { topicName, skillName } = getTopicInfo();

    const generateQuestions = (selectedSkill) => {
        const questions = [];
        const colors = ['#FF6B6B', '#4ECDC4', '#FFE66D', '#98D8C8', '#C9A9E9'];

        for (let i = 0; i < totalQuestions; i++) {
            let question = {};
            const color1 = colors[i % colors.length];

            if (selectedSkill === '1101' || !selectedSkill) {
                // Counting and recognition 51-100
                const num = Math.floor(Math.random() * 49) + 51;
                question = {
                    text: `How many blocks are there in total? 🔢`,
                    options: [num, (num + 10) % 101, Math.max(51, num - 5)].filter((v, idx, s) => s.indexOf(v) === idx).sort(() => 0.5 - Math.random()),
                    correct: num,
                    type: 'counting',
                    visualData: { num, color: color1 }
                };
            } else if (selectedSkill === '1102') {
                // Skip counting
                const start = Math.floor(Math.random() * 4) * 10 + 50;
                const step = [2, 5, 10][Math.floor(Math.random() * 3)];
                const seq = [start, start + step, start + step * 2];
                const nextValue = start + step * 3;
                question = {
                    text: `What is the next number in this pattern? ⚡`,
                    options: [nextValue, nextValue + step, nextValue - 1].sort(() => 0.5 - Math.random()),
                    correct: nextValue,
                    type: 'skip',
                    visualData: { seq, step, color: color1 }
                };
            } else if (selectedSkill === '1103') {
                // Comparison
                const n1 = Math.floor(Math.random() * 49) + 51;
                let n2 = Math.floor(Math.random() * 49) + 51;
                while (Math.abs(n1 - n2) < 3) n2 = Math.floor(Math.random() * 49) + 51;
                const compareType = Math.random() > 0.5 ? 'BIGGER' : 'SMALLER';
                question = {
                    text: `Which number is ${compareType}? ⚖️`,
                    options: [n1, n2],
                    correct: compareType === 'BIGGER' ? (n1 > n2 ? n1 : n2) : (n1 < n2 ? n1 : n2),
                    type: 'counting', // Reuse counting visual to show the correct one as hint if needed
                    visualData: { num: n1, color: color1 }
                };
            } else {
                question = { text: "Solve this!", options: ["100"], correct: "100", type: "counting", visualData: { num: 100, color: color1 } };
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
                const session = await api.createPracticeSession(user?.id, 'numbers-51-100');
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
        if (qIndex < totalQuestions - 1) {
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
                        total_questions: totalQuestions,
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
                                <span className="g1-stat-value">{score}/{totalQuestions}</span>
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
                        Question {qIndex + 1} of {totalQuestions}
                    </div>
                </div>

                <div className="g1-progress-container" style={{ margin: '0 0 30px 0' }}>
                    <div className="g1-progress-fill" style={{ width: `${((qIndex + 1) / totalQuestions) * 100}%` }}></div>
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
                                    {qIndex === totalQuestions - 1 ? 'Finish Quest 🏆' : 'Next Challenge 🚀'} <ArrowRight />
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </div>
        </div>
    );
};

export default Numbers51to100;

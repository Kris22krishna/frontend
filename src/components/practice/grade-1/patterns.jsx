import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Home, ArrowRight, Timer, Trophy, Star, ChevronLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../../contexts/AuthContext';
import { api } from '../../../services/api';
import Navbar from '../../Navbar';
import { TOPIC_CONFIGS } from '../../../lib/topicConfig';
import './Grade1Practice.css';


const DynamicVisual = ({ data }) => {
    const { seq, missingIdx, colorMap } = data;
    return (
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="g1-pattern-visual">
            <div className="g1-pattern-belt" style={{ display: 'flex', gap: 'clamp(10px, 3vw, 20px)', flexWrap: 'wrap', justifyContent: 'center', width: '100%' }}>
                {seq.map((item, i) => (
                    <motion.div
                        key={i}
                        initial={{ x: 20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: i * 0.1 }}
                        className="g1-pattern-slot"
                    >
                        {i === missingIdx ? (
                            <div className="g1-pattern-target">?</div>
                        ) : (
                            <motion.div
                                whileHover={{ scale: 1.1, rotate: 5 }}
                                className="g1-pattern-item"
                                style={{
                                    background: colorMap[item] || '#fff',
                                    borderRadius: item.includes('circle') || item.includes('moon') ? '50%' : '12px'
                                }}
                            >
                                {item.includes('star') ? '⭐' : item.includes('moon') ? '🌙' : item.includes('heart') ? '❤️' : item.includes('sun') ? '☀️' : '💎'}
                            </motion.div>
                        )}
                        {i < seq.length - 1 && <div className="g1-pattern-arrow">→</div>}
                    </motion.div>
                ))}
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

const Patterns = () => {
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
        return { topicName: 'Patterns', skillName: 'Mathematics' };
    };

    const { topicName, skillName } = getTopicInfo();

    const generateQuestions = (selectedSkill) => {
        const questions = [];
        const patternTypes = [
            { items: ['red-circle', 'blue-circle'], symbols: ['🍎', '🍌'], colors: { 'red-circle': '#FF6B6B', 'blue-circle': '#4ECDC4' } },
            { items: ['yellow-star', 'purple-moon'], symbols: ['⭐', '🌙'], colors: { 'yellow-star': '#FFE66D', 'purple-moon': '#C9A9E9' } },
            { items: ['green-heart', 'pink-heart'], symbols: ['💚', '💖'], colors: { 'green-heart': '#98D8C8', 'pink-heart': '#FF6B6B' } },
            { items: ['orange-sun', 'blue-moon'], symbols: ['☀️', '🌙'], colors: { 'orange-sun': '#FFA500', 'blue-moon': '#4ECDC4' } }
        ];

        for (let i = 0; i < totalQuestions; i++) {
            // Mapping skills logic if needed, currently patterns are mixed
            const pType = patternTypes[i % patternTypes.length];
            const isNext = Math.random() > 0.5;
            const seq = [pType.items[0], pType.items[1], pType.items[0], pType.items[1]];
            const missingIdx = isNext ? 4 : Math.floor(Math.random() * 4);

            let displaySeq = [...seq];
            if (isNext) {
                displaySeq.push(null);
            } else {
                displaySeq[missingIdx] = null;
            }

            const correct = seq[missingIdx === 4 ? 0 : missingIdx];

            questions.push({
                text: isNext ? "Look at the pattern belt! What comes next? 🚂" : "Someone is missing! Who goes in the empty spot? 🕵️",
                options: [pType.items[0], pType.items[1]].sort(() => 0.5 - Math.random()),
                correct: correct,
                type: 'pattern',
                visualData: { seq: displaySeq, missingIdx, colorMap: pType.colors }
            });
        }
        return questions;
    };

    useEffect(() => {
        const init = async () => {
            const qs = generateQuestions(skillId);
            setSessionQuestions(qs);
            try {
                const session = await api.createPracticeSession(user?.id, 'patterns-grade1');
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
                                        <span style={{ textTransform: 'capitalize' }}>{opt.replace('-', ' ')}</span>
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

export default Patterns;

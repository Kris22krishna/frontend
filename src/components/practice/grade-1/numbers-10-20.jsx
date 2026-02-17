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
    if (type === 'counting' || type === 'names' || type === 'tens-ones') {
        const { num, color } = data;
        const tens = Math.floor(num / 10);
        const ones = num % 10;
        return (
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="g1-tens-visual">
                <div style={{ display: 'flex', gap: 'clamp(15px, 5vw, 30px)', alignItems: 'flex-end', justifyContent: 'center', flexWrap: 'wrap' }}>
                    {/* Ten Bar */}
                    <motion.div
                        initial={{ height: 0 }} animate={{ height: 'auto' }}
                        style={{ display: 'flex', flexDirection: 'column-reverse', gap: '3px', padding: '8px', border: '3px solid #CBD5E0', borderRadius: '15px', background: 'white' }}
                    >
                        {Array.from({ length: 10 }).map((_, i) => (
                            <div key={i} style={{ width: '25px', height: '15px', backgroundColor: color, borderRadius: '4px' }}></div>
                        ))}
                        <div style={{ fontSize: '10px', fontWeight: 900, textAlign: 'center', color: '#666', marginBottom: '5px' }}>TENS</div>
                    </motion.div>
                    {/* Ones */}
                    {ones > 0 && (
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 25px)', gap: '5px' }}>
                            {Array.from({ length: ones }).map((_, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: i * 0.1 }}
                                    style={{ width: '25px', height: '15px', backgroundColor: color, borderRadius: '4px', opacity: 0.8 }}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </motion.div>
        );
    }
    if (type === 'comparison') {
        const { n1, n2, color1, color2 } = data;
        return (
            <div style={{ display: 'flex', gap: 'clamp(20px, 8vw, 50px)', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap' }}>
                <div className="g1-compare-box" style={{ background: color1 + '15', padding: '20px', borderRadius: '25px' }}>
                    <div style={{ fontSize: '2.5rem', fontWeight: 900, color: color1, marginBottom: '10px' }}>{n1}</div>
                    <div style={{ display: 'flex', gap: '4px' }}>
                        <div style={{ display: 'flex', flexDirection: 'column-reverse', gap: '2px' }}>
                            {Array.from({ length: 10 }).map((_, i) => (
                                <div key={i} style={{ width: '12px', height: '8px', backgroundColor: color1, borderRadius: '2px' }}></div>
                            ))}
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '12px', gap: '2px' }}>
                            {Array.from({ length: n1 - 10 }).map((_, i) => (
                                <div key={i} style={{ width: '12px', height: '8px', backgroundColor: color1, borderRadius: '2px', opacity: 0.7 }}></div>
                            ))}
                        </div>
                    </div>
                </div>
                <div style={{ fontSize: '2rem', fontWeight: 900, color: '#CBD5E0' }}>VS</div>
                <div className="g1-compare-box" style={{ background: color2 + '15', padding: '20px', borderRadius: '25px' }}>
                    <div style={{ fontSize: '2.5rem', fontWeight: 900, color: color2, marginBottom: '10px' }}>{n2}</div>
                    <div style={{ display: 'flex', gap: '4px' }}>
                        <div style={{ display: 'flex', flexDirection: 'column-reverse', gap: '2px' }}>
                            {Array.from({ length: 10 }).map((_, i) => (
                                <div key={i} style={{ width: '12px', height: '8px', backgroundColor: color2, borderRadius: '2px' }}></div>
                            ))}
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '12px', gap: '2px' }}>
                            {Array.from({ length: n2 - 10 }).map((_, i) => (
                                <div key={i} style={{ width: '12px', height: '8px', backgroundColor: color2, borderRadius: '2px', opacity: 0.7 }}></div>
                            ))}
                        </div>
                    </div>
                </div>
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

const Numbers10to20 = () => {
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
        return { topicName: 'Numbers 10-20', skillName: 'Mathematics' };
    };

    const { topicName, skillName } = getTopicInfo();

    const generateQuestions = (selectedSkill) => {
        const questions = [];
        const colors = ['#FF6B6B', '#4ECDC4', '#FFE66D', '#98D8C8', '#C9A9E9'];

        for (let i = 0; i < TOTAL_QUESTIONS; i++) {
            let question = {};
            const color1 = colors[i % colors.length];
            const color2 = colors[(i + 1) % colors.length];

            if (selectedSkill === 'G1-CH5-01' || !selectedSkill) {
                // Counting and recognition
                const count = Math.floor(Math.random() * 11) + 10;
                const isWord = Math.random() > 0.5;
                const names = {
                    10: 'Ten', 11: 'Eleven', 12: 'Twelve', 13: 'Thirteen', 14: 'Fourteen',
                    15: 'Fifteen', 16: 'Sixteen', 17: 'Seventeen', 18: 'Eighteen', 19: 'Nineteen', 20: 'Twenty'
                };
                question = {
                    text: isWord ? "Can you pick the name for this number?" : "What number is shown here? 🎯",
                    options: isWord ?
                        [names[count], names[(count + 1) % 11 + 10], names[(count - 1) % 11 + 10]].sort(() => 0.5 - Math.random()) :
                        [count, count + 1, count - 1].sort(() => 0.5 - Math.random()),
                    correct: isWord ? names[count] : count,
                    type: 'counting',
                    visualData: { num: count, color: color1 }
                };
            } else if (selectedSkill === 'G1-CH5-02') {
                // Tens and Ones
                const num = Math.floor(Math.random() * 11) + 10;
                const tens = Math.floor(num / 10);
                const ones = num % 10;
                const options = [
                    `${tens} Ten, ${ones} Ones`,
                    `${ones} Ten, ${tens} Ones`,
                    `${tens + 1} Ten, ${ones} Ones`
                ].sort(() => 0.5 - Math.random());
                question = {
                    text: `How many tens and ones in ${num}? 🧱`,
                    options: options,
                    correct: `${tens} Ten, ${ones} Ones`,
                    type: 'tens-ones',
                    visualData: { num, color: color1 }
                };
            } else if (selectedSkill === 'G1-CH5-03') {
                // Comparison
                const n1 = Math.floor(Math.random() * 11) + 10;
                let n2 = Math.floor(Math.random() * 11) + 10;
                while (n1 === n2) n2 = Math.floor(Math.random() * 11) + 10;
                const isGreater = Math.random() > 0.5;
                question = {
                    text: `Which group has ${isGreater ? 'MORE' : 'FEWER'} blocks? ⚖️`,
                    options: [n1, n2],
                    correct: isGreater ? (n1 > n2 ? n1 : n2) : (n1 < n2 ? n1 : n2),
                    type: 'comparison',
                    visualData: { n1, n2, color1, color2 }
                };
            } else {
                question = { text: "Count the tens!", options: ["1 Ten, 0 Ones"], correct: "1 Ten, 0 Ones", type: "tens-ones", visualData: { num: 10, color: color1 } };
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
                const session = await api.createPracticeSession(user?.id, 'numbers-10-20');
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

export default Numbers10to20;

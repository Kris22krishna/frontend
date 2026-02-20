import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowRight, Timer, Trophy, Star, ChevronLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../../../../contexts/AuthContext';
import { api } from '../../../../../services/api';
import Navbar from '../../../../Navbar';
import { TOPIC_CONFIGS } from '../../../../../lib/topicConfig';
import { LatexText } from '../../../../LatexText';
import ExplanationModal from '../../../../ExplanationModal';
import mascotImg from '../../../../../assets/mascot.png';
import '../../../grade-1/Grade1Practice.css';

const TOTAL_QUESTIONS = 5;

const DynamicVisual = ({ data }) => {
    const { objectA, objectB } = data;

    const renderSVG = (type, color) => {
        switch (type) {
            case 'Leaf': return (
                <svg width="60" height="60" viewBox="0 0 60 60">
                    <path d="M30 50 Q10 30 30 10 Q50 30 30 50" fill="#4CAF50" stroke="#2E7D32" strokeWidth="2" />
                    <line x1="30" y1="50" x2="30" y2="10" stroke="#2E7D32" strokeWidth="1" />
                </svg>
            );
            case 'Balloon': return (
                <svg width="60" height="80" viewBox="0 0 60 80">
                    <ellipse cx="30" cy="35" rx="25" ry="30" fill="#FF5252" stroke="#D32F2F" strokeWidth="2" />
                    <path d="M30 65 L25 75 L35 75 Z" fill="#D32F2F" />
                    <path d="M30 75 Q35 80 30 85" fill="none" stroke="#666" strokeWidth="1" />
                </svg>
            );
            case 'Elephant': return (
                <svg width="100" height="80" viewBox="0 0 100 80">
                    <rect x="20" y="30" width="60" height="40" rx="15" fill="#9E9E9E" />
                    <circle cx="85" cy="45" r="10" fill="#9E9E9E" />
                    <rect x="25" y="65" width="10" height="15" fill="#9E9E9E" />
                    <rect x="65" y="65" width="10" height="15" fill="#9E9E9E" />
                    <path d="M85 50 Q95 60 85 70" fill="none" stroke="#9E9E9E" strokeWidth="5" strokeLinecap="round" />
                </svg>
            );
            case 'Brick': return (
                <svg width="80" height="50" viewBox="0 0 80 50">
                    <rect x="10" y="10" width="60" height="30" fill="#B22222" stroke="#800000" strokeWidth="2" />
                    <line x1="10" y1="20" x2="70" y2="20" stroke="#800000" strokeWidth="1" />
                </svg>
            );
            case 'Truck': return (
                <svg width="100" height="60" viewBox="0 0 100 60">
                    <rect x="10" y="20" width="50" height="30" fill="#1976D2" />
                    <rect x="60" y="30" width="30" height="20" fill="#2196F3" />
                    <circle cx="25" cy="50" r="8" fill="#333" />
                    <circle cx="75" cy="50" r="8" fill="#333" />
                </svg>
            );
            case 'Paper': return (
                <svg width="60" height="80" viewBox="0 0 60 80">
                    <rect x="10" y="10" width="40" height="60" fill="white" stroke="#DDD" strokeWidth="1" />
                    <line x1="15" y1="25" x2="45" y2="25" stroke="#EEE" strokeWidth="1" />
                    <line x1="15" y1="35" x2="45" y2="35" stroke="#EEE" strokeWidth="1" />
                </svg>
            );
            default: return null;
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', gap: '80px', width: '100%', padding: '40px', background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)', borderRadius: '24px' }}>
            <motion.div whileHover={{ scale: 1.05 }} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px' }}>
                <div style={{ padding: '30px', background: 'white', borderRadius: '20px', boxShadow: '0 10px 25px rgba(0,0,0,0.05)', minWidth: '150px', display: 'flex', justifyContent: 'center' }}>
                    {renderSVG(objectA, '#4ECDC4')}
                </div>
                <span style={{ fontWeight: 800, color: '#0369a1' }}>{objectA}</span>
            </motion.div>
            <div style={{ display: 'flex', alignItems: 'center', fontSize: '2rem', color: '#94a3b8' }}>vs</div>
            <motion.div whileHover={{ scale: 1.05 }} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px' }}>
                <div style={{ padding: '30px', background: 'white', borderRadius: '20px', boxShadow: '0 10px 25px rgba(0,0,0,0.05)', minWidth: '150px', display: 'flex', justifyContent: 'center' }}>
                    {renderSVG(objectB, '#FF6B6B')}
                </div>
                <span style={{ fontWeight: 800, color: '#0369a1' }}>{objectB}</span>
            </motion.div>
        </div>
    );
};

const MOTIVATIONS = [
    { text: "Awesome!", sub: "You're a weight expert!" },
    { text: "Cool!", sub: "That was super fast!" },
    { text: "Wow!", sub: "You know your heavy and light!" }
];

const HeavierLighter = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const skillId = queryParams.get('skillId') || '1008';

    const [qIndex, setQIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [showResults, setShowResults] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const [isAnswered, setIsAnswered] = useState(false);
    const [timer, setTimer] = useState(0);
    const [answers, setAnswers] = useState({});
    const [sessionQuestions, setSessionQuestions] = useState([]);
    const [sessionId, setSessionId] = useState(null);
    const [motivation, setMotivation] = useState(null);
    const [showExplanationModal, setShowExplanationModal] = useState(false);

    const getTopicInfo = () => {
        const grade2Config = TOPIC_CONFIGS['2'];
        for (const [topicName, skills] of Object.entries(grade2Config)) {
            const skill = skills.find(s => s.id === skillId);
            if (skill) return { topicName, skillName: skill.name };
        }
        return { topicName: 'How Much Can You Carry?', skillName: 'Heavier/lighter' };
    };

    const { topicName, skillName } = getTopicInfo();

    const generateQuestions = () => {
        const objectPool = [
            { name: 'Elephant', weight: 5000 },
            { name: 'Leaf', weight: 1 },
            { name: 'Brick', weight: 200 },
            { name: 'Balloon', weight: 2 },
            { name: 'Truck', weight: 8000 },
            { name: 'Paper', weight: 1 }
        ];

        const questions = [];
        for (let i = 0; i < TOTAL_QUESTIONS; i++) {
            const idx1 = Math.floor(Math.random() * objectPool.length);
            let idx2 = Math.floor(Math.random() * objectPool.length);
            while (idx1 === idx2) idx2 = Math.floor(Math.random() * objectPool.length);

            const obj1 = objectPool[idx1];
            const obj2 = objectPool[idx2];
            const askingHeavier = Math.random() > 0.5;

            questions.push({
                text: askingHeavier ? `Which one is HEAVIER? 🐘` : `Which one is LIGHTER? 🍃`,
                options: [obj1.name, obj2.name],
                correct: askingHeavier ? (obj1.weight > obj2.weight ? obj1.name : obj2.name) : (obj1.weight < obj2.weight ? obj1.name : obj2.name),
                visualData: { objectA: obj1.name, objectB: obj2.name },
                explanation: `A ${obj1.weight > obj2.weight ? obj1.name : obj2.name} is much heavier than a ${obj1.weight > obj2.weight ? obj2.name : obj1.name}.`,
                solution: `\\text{Weight } ${obj1.name} = ${obj1.weight}, \\text{Weight } ${obj2.name} = ${obj2.weight}`
            });
        }
        return questions;
    };

    useEffect(() => {
        const init = async () => {
            const qs = generateQuestions();
            setSessionQuestions(qs);
            try {
                const session = await api.createPracticeSession(user?.id, 'heavier-lighter');
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

    const handleOptionSelect = (option) => {
        if (isAnswered) return;
        setSelectedOption(option);
        setIsAnswered(true);
        const isCorrect = option === sessionQuestions[qIndex].correct;
        if (isCorrect) {
            setScore(s => s + 1);
            setMotivation(MOTIVATIONS[Math.floor(Math.random() * MOTIVATIONS.length)]);
        }

        setAnswers(prev => ({
            ...prev,
            [qIndex]: { selectedOption: option, isCorrect }
        }));
        setShowExplanationModal(true);
    };

    const handleNext = async () => {
        if (qIndex < TOTAL_QUESTIONS - 1) {
            setQIndex(v => v + 1);
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
                        answers: Object.values(answers)
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
                        <h2 className="g1-question-text">Weight Master!</h2>
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
                <div className="blob blob-1" style={{ background: '#e0f2fe' }}></div>
                <div className="blob blob-2" style={{ background: '#dbeafe' }}></div>
                <div className="blob blob-3" style={{ background: '#e0f2fe' }}></div>
            </div>

            <div className="g1-practice-container">
                <div className="g1-header-nav">
                    <button className="g1-back-btn" onClick={() => navigate(-1)} disabled={qIndex === 0 && !isAnswered}>
                        <ChevronLeft size={20} /> Back
                    </button>
                    {qIndex > 0 && (
                        <button className="g1-back-btn" style={{ marginLeft: '10px' }} onClick={() => setQIndex(v => v - 1)}>
                            <ChevronLeft size={20} /> Previous
                        </button>
                    )}
                    <div className="g1-timer-badge">
                        <Timer size={18} />
                        {formatTime(timer)}
                    </div>
                </div>

                <div className="g1-progress-container" style={{ margin: '0 0 30px 0' }}>
                    <div className="g1-progress-fill" style={{ width: `${((qIndex + 1) / TOTAL_QUESTIONS) * 100}%`, background: '#0ea5e9' }}></div>
                </div>

                <div className="g1-topic-skill-header">
                    <span className="g1-topic-name" style={{ color: '#0369a1' }}>{topicName}</span>
                    <h1 className="g1-skill-name" style={{ color: '#0c4a6e' }}><LatexText text={skillName} /></h1>
                </div>

                <motion.div key={qIndex} initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="g1-question-card">
                    <h2 className="g1-question-text" style={{ fontSize: '1.8rem', color: '#0f172a' }}><LatexText text={currentQ.text} /></h2>

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
                                        style={{ fontSize: '1.3rem', padding: '20px' }}
                                    >
                                        <LatexText text={opt} />
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {isAnswered && (
                        <div className="flex flex-col items-center gap-4 mt-8">
                            {motivation && (
                                <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="flex flex-col items-center">
                                    <img src={mascotImg} alt="mascot" className="w-16 h-16 object-contain mb-2" />
                                    <span className="g1-motivation-text">{motivation.text}</span>
                                    <span className="g1-motivation-sub">{motivation.sub}</span>
                                </motion.div>
                            )}
                            <button className="g1-primary-btn" style={{ padding: '20px 60px', borderRadius: '40px', fontSize: '1.4rem', background: '#0ea5e9' }} onClick={handleNext}>
                                {qIndex === TOTAL_QUESTIONS - 1 ? 'Finish Quest 🏆' : 'Next Challenge 🚀'} <ArrowRight />
                            </button>
                        </div>
                    )}
                </motion.div>
            </div>

            <ExplanationModal
                isOpen={showExplanationModal}
                isCorrect={answers[qIndex]?.isCorrect}
                correctAnswer={currentQ.correct}
                explanation={currentQ.explanation}
                onClose={() => setShowExplanationModal(false)}
                onNext={handleNext}
            />
        </div>
    );
};

export default HeavierLighter;

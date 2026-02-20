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
    const { aWeight, bWeight, objectType } = data;

    const renderObject = (weight, color, type, label) => {
        const scale = 0.5 + (weight / 100);
        return (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: scale }}
                    transition={{ type: 'spring', damping: 12, stiffness: 100 }}
                    style={{ position: 'relative' }}
                >
                    {type === 'pumpkin' && (
                        <svg width="100" height="80" viewBox="0 0 100 80">
                            <ellipse cx="50" cy="45" rx="40" ry="30" fill="#FFB347" stroke="#E67E22" strokeWidth="2" />
                            <ellipse cx="30" cy="45" rx="20" ry="28" fill="#FFB347" stroke="#E67E22" strokeWidth="1" />
                            <ellipse cx="70" cy="45" rx="20" ry="28" fill="#FFB347" stroke="#E67E22" strokeWidth="1" />
                            <path d="M50 15 Q55 5 65 10" fill="none" stroke="#228B22" strokeWidth="4" strokeLinecap="round" />
                        </svg>
                    )}
                    {type === 'apple' && (
                        <svg width="80" height="80" viewBox="0 0 80 80">
                            <path d="M40 70 Q10 70 10 40 Q10 10 40 15 Q70 10 70 40 Q70 70 40 70" fill="#FF4B4B" stroke="#C0392B" strokeWidth="2" />
                            <path d="M40 15 Q45 5 55 10" fill="none" stroke="#228B22" strokeWidth="4" strokeLinecap="round" />
                        </svg>
                    )}
                    {type === 'watermelon' && (
                        <svg width="120" height="80" viewBox="0 0 120 80">
                            <ellipse cx="60" cy="40" rx="55" ry="35" fill="#2E7D32" stroke="#1B5E20" strokeWidth="2" />
                            <path d="M15 40 Q60 5 105 40" fill="none" stroke="#4CAF50" strokeWidth="2" strokeDasharray="5,5" />
                            <path d="M15 30 Q60 65 105 30" fill="none" stroke="#4CAF50" strokeWidth="2" strokeDasharray="5,5" />
                        </svg>
                    )}
                    {type === 'feather' && (
                        <svg width="100" height="40" viewBox="0 0 100 40">
                            <path d="M10 20 Q50 0 90 20 Q50 40 10 20" fill="#F0F0F0" stroke="#DDD" strokeWidth="1" />
                            <line x1="10" y1="20" x2="90" y2="20" stroke="#CCC" strokeWidth="1" />
                        </svg>
                    )}
                    {type === 'book' && (
                        <svg width="80" height="100" viewBox="0 0 80 100">
                            <rect x="10" y="10" width="60" height="80" rx="4" fill="#31326F" stroke="#25265E" strokeWidth="2" />
                            <rect x="15" y="15" width="50" height="70" rx="2" fill="#E0FBEF" />
                            <line x1="20" y1="25" x2="60" y2="25" stroke="#4FB7B3" strokeWidth="2" />
                            <line x1="20" y1="35" x2="60" y2="35" stroke="#4FB7B3" strokeWidth="2" />
                        </svg>
                    )}
                </motion.div>
                <div style={{ fontWeight: '900', color: color, fontSize: '1.2rem' }}>{label}</div>
            </div>
        );
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-end', gap: '60px', width: '100%', padding: '40px', minHeight: '200px', background: '#f8fafc', borderRadius: '20px', border: '2px dashed #e2e8f0' }}>
            {renderObject(aWeight, '#4ECDC4', objectType, 'Object A')}
            {renderObject(bWeight, '#FF6B6B', objectType, 'Object B')}
        </div>
    );
};

const MOTIVATIONS = [
    { text: "Spectacular!", sub: "You're doing amazing!" },
    { text: "You're a Star!", sub: "Keep up the great work!" },
    { text: "Brilliant!", sub: "That's exactly right!" }
];

const ComparingWeights = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const skillId = queryParams.get('skillId') || '1007';

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
        return { topicName: 'How Much Can You Carry?', skillName: 'Comparing weights' };
    };

    const { topicName, skillName } = getTopicInfo();

    const generateQuestions = () => {
        const questions = [];
        const objectTypes = ['pumpkin', 'apple', 'watermelon', 'feather', 'book'];
        for (let i = 0; i < TOTAL_QUESTIONS; i++) {
            const aW = Math.floor(Math.random() * 80) + 10;
            let bW = Math.floor(Math.random() * 80) + 10;
            while (Math.abs(aW - bW) < 15) bW = Math.floor(Math.random() * 80) + 10;

            const heavierQ = Math.random() > 0.5;
            const objectType = objectTypes[Math.floor(Math.random() * objectTypes.length)];

            questions.push({
                text: heavierQ ? `Which object is HEAVIER? ⚖️` : `Which object is LIGHTER? 🪶`,
                options: ['Object A', 'Object B'],
                correct: heavierQ ? (aW > bW ? 'Object A' : 'Object B') : (aW < bW ? 'Object A' : 'Object B'),
                visualData: { aWeight: aW, bWeight: bW, objectType },
                explanation: heavierQ
                    ? `Object ${aW > bW ? 'A' : 'B'} is larger and heavier than Object ${aW > bW ? 'B' : 'A'}.`
                    : `Object ${aW < bW ? 'A' : 'B'} is smaller and lighter than Object ${aW < bW ? 'B' : 'A'}.`,
                solution: `\\text{Weight A} = ${aW}, \\text{Weight B} = ${bW} \\implies ${aW} ${aW > bW ? '>' : '<'} ${bW}`
            });
        }
        return questions;
    };

    useEffect(() => {
        const init = async () => {
            const qs = generateQuestions();
            setSessionQuestions(qs);
            try {
                const session = await api.createPracticeSession(user?.id, 'comparing-weights');
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

                    <div style={{ fontWeight: 800, color: '#666', fontSize: '1rem', background: 'white', padding: '5px 12px', borderRadius: '15px', boxShadow: '0 4px 10px rgba(0,0,0,0.05)' }}>
                        Question {qIndex + 1} of {TOTAL_QUESTIONS}
                    </div>
                </div>

                <div className="g1-progress-container" style={{ margin: '0 0 30px 0' }}>
                    <div className="g1-progress-fill" style={{ width: `${((qIndex + 1) / TOTAL_QUESTIONS) * 100}%` }}></div>
                </div>

                <div className="g1-topic-skill-header">
                    <span className="g1-topic-name">{topicName}</span>
                    <h1 className="g1-skill-name"><LatexText text={skillName} /></h1>
                </div>

                <motion.div key={qIndex} initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="g1-question-card">
                    <h2 className="g1-question-text"><LatexText text={currentQ.text} /></h2>

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
                            <button className="g1-primary-btn" style={{ padding: '20px 60px', borderRadius: '40px', fontSize: '1.4rem' }} onClick={handleNext}>
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

export default ComparingWeights;

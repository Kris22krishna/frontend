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
    const { objectType } = data;

    const renderSVG = (type) => {
        switch (type) {
            case 'School Bag': return (
                <svg width="80" height="100" viewBox="0 0 80 100">
                    <rect x="10" y="20" width="60" height="70" rx="10" fill="#4A90E2" stroke="#2171C1" strokeWidth="2" />
                    <rect x="20" y="35" width="40" height="30" rx="5" fill="#2171C1" />
                    <path d="M25 20 Q40 5 55 20" fill="none" stroke="#2171C1" strokeWidth="4" />
                </svg>
            );
            case 'Pencil Box': return (
                <svg width="100" height="40" viewBox="0 0 100 40">
                    <rect x="10" y="10" width="80" height="20" rx="4" fill="#67C23A" stroke="#4B9E27" strokeWidth="2" />
                    <circle cx="20" cy="20" r="2" fill="white" />
                    <circle cx="80" cy="20" r="2" fill="white" />
                </svg>
            );
            case 'Water Bottle': return (
                <svg width="40" height="100" viewBox="0 0 40 100">
                    <rect x="10" y="30" width="20" height="60" rx="5" fill="#E6A23C" />
                    <rect x="12" y="15" width="16" height="15" rx="2" fill="#E6A23C" />
                    <path d="M10 30 Q20 20 30 30" fill="#E6A23C" />
                </svg>
            );
            case 'Tiffin': return (
                <svg width="80" height="60" viewBox="0 0 80 60">
                    <rect x="10" y="20" width="60" height="35" rx="5" fill="#F56C6C" />
                    <rect x="10" y="15" width="60" height="10" rx="2" fill="#D84E4E" />
                    <rect x="30" y="15" width="20" height="5" fill="#999" />
                </svg>
            );
            default: return null;
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', padding: '40px', background: '#fff7ed', borderRadius: '30px', border: '3px solid #ffedd5' }}>
            <motion.div
                initial={{ rotate: -5 }} animate={{ rotate: 5 }} transition={{ repeat: Infinity, repeatType: 'reverse', duration: 2 }}
                style={{ filter: 'drop-shadow(0 15px 15px rgba(251, 146, 60, 0.2))' }}
            >
                {renderSVG(objectType)}
            </motion.div>
        </div>
    );
};

const MOTIVATIONS = [
    { text: "Great Estimate!", sub: "You're a math pro!" },
    { text: "Spot On!", sub: "You really know your weights!" },
    { text: "Perfect!", sub: "You're getting so good at this!" }
];

const EstimatingWeight = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const skillId = queryParams.get('skillId') || '1009';

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
        return { topicName: 'How Much Can You Carry?', skillName: 'Estimating weight' };
    };

    const { topicName, skillName } = getTopicInfo();

    const generateQuestions = () => {
        const scenarios = [
            { obj: 'School Bag', heaviness: 'Heavy', hint: 'It has many books inside!' },
            { obj: 'Pencil Box', heaviness: 'Light', hint: 'It only holds pens and pencils.' },
            { obj: 'Water Bottle', heaviness: 'Heavy', hint: 'It is full of water!' },
            { obj: 'Tiffin', heaviness: 'Heavy', hint: 'Full of yummy food!' }
        ];

        const questions = [];
        for (let i = 0; i < TOTAL_QUESTIONS; i++) {
            const scenario = scenarios[i % scenarios.length];
            questions.push({
                text: `Is a ${scenario.obj} usually HEAVY or LIGHT? 🎒`,
                options: ['Heavy', 'Light'],
                correct: scenario.heaviness,
                visualData: { objectType: scenario.obj },
                hint: scenario.hint,
                explanation: `A ${scenario.obj} often feels ${scenario.heaviness.toLowerCase()} because of what it holds.`,
                solution: `\\text{Object: } ${scenario.obj} \\implies \\text{Estimated Weight: } ${scenario.heaviness}`
            });
        }
        return questions;
    };

    useEffect(() => {
        const init = async () => {
            const qs = generateQuestions();
            setSessionQuestions(qs);
            try {
                const session = await api.createPracticeSession(user?.id, 'estimating-weight');
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
                        <h2 className="g1-question-text">Excellent Estimation!</h2>
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
                <div className="blob blob-1" style={{ background: '#ffedd5' }}></div>
                <div className="blob blob-2" style={{ background: '#fed7aa' }}></div>
                <div className="blob blob-3" style={{ background: '#fff7ed' }}></div>
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
                    <div className="g1-progress-fill" style={{ width: `${((qIndex + 1) / TOTAL_QUESTIONS) * 100}%`, background: '#fb923c' }}></div>
                </div>

                <div className="g1-topic-skill-header">
                    <span className="g1-topic-name" style={{ color: '#ea580c' }}>{topicName}</span>
                    <h1 className="g1-skill-name" style={{ color: '#9a3412' }}><LatexText text={skillName} /></h1>
                </div>

                <motion.div key={qIndex} initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="g1-question-card">
                    <h2 className="g1-question-text" style={{ color: '#431407' }}><LatexText text={currentQ.text} /></h2>
                    <p style={{ color: '#9a3412', fontStyle: 'italic', marginBottom: '20px' }}>💡 Hint: {currentQ.hint}</p>

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
                                        style={{ background: 'white', border: '2px solid #fdba74', color: '#9a3412' }}
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
                            <button className="g1-primary-btn" style={{ background: '#ea580c', padding: '20px 60px', borderRadius: '40px', fontSize: '1.4rem' }} onClick={handleNext}>
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

export default EstimatingWeight;

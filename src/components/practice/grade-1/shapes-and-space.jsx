import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Home, ArrowRight, Timer, Trophy, Star, ChevronLeft, RefreshCw, FileText, Check, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../../contexts/AuthContext';
import { api } from '../../../services/api';
import Navbar from '../../Navbar';
import { TOPIC_CONFIGS } from '../../../lib/topicConfig';
import { LatexText } from '../../LatexText';
import ExplanationModal from '../../ExplanationModal';
import StickerExit from '../../StickerExit';
import mascotImg from '../../../assets/mascot.png';
import avatarImg from '../../../assets/avatar.png';
import './Grade1Practice.css';

const TOTAL_QUESTIONS = 5;

const DynamicVisual = ({ type, data }) => {
    if (type === 'shape') {
        const { shape, color } = data;
        return (
            <motion.div
                initial={{ scale: 0.5, rotate: -10 }}
                animate={{ scale: 1, rotate: 0 }}
                className="g1-visual-item"
            >
                <svg width="100%" height="auto" style={{ maxWidth: '300px', maxHeight: '300px', filter: 'drop-shadow(0 10px 15px rgba(0,0,0,0.1))' }} viewBox="0 0 100 100">
                    {shape === 'circle' && <circle cx="50" cy="50" r="42" fill={color} stroke="rgba(0,0,0,0.1)" strokeWidth="2" />}
                    {shape === 'square' && <rect x="8" y="8" width="84" height="84" rx="15" fill={color} stroke="rgba(0,0,0,0.1)" strokeWidth="2" />}
                    {shape === 'triangle' && <polygon points="50,5 95,90 5,90" fill={color} stroke="rgba(0,0,0,0.1)" strokeWidth="2" />}
                    {shape === 'rectangle' && <rect x="5" y="25" width="90" height="50" rx="12" fill={color} stroke="rgba(0,0,0,0.1)" strokeWidth="2" />}
                </svg>
            </motion.div>
        );
    }
    if (type === 'position') {
        const { pos } = data;
        return (
            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="position-visual">
                <svg width="100%" height="auto" style={{ maxWidth: '280px' }} viewBox="0 0 200 120">
                    <rect x="50" y="40" width="100" height="70" rx="10" fill="white" stroke="#CBD5E0" strokeWidth="4" />
                    <text x="100" y="85" textAnchor="middle" fill="#A0AEC0" fontSize="14" fontWeight="600">BOX</text>
                    {pos === 'top' && <motion.circle initial={{ y: -20 }} animate={{ y: 0 }} cx="100" cy="20" r="18" fill="url(#ballGradient)" />}
                    {pos === 'bottom' && <motion.circle initial={{ y: 20 }} animate={{ y: 0 }} cx="100" cy="95" r="18" fill="url(#ballGradient)" />}
                    {pos === 'inside' && <motion.circle initial={{ scale: 0 }} animate={{ scale: 1 }} cx="100" cy="75" r="18" fill="url(#ballGradient)" />}
                    {pos === 'outside' && <motion.circle initial={{ x: -20 }} animate={{ x: 0 }} cx="30" cy="75" r="18" fill="url(#ballGradient)" />}
                    {pos === 'near' && <circle cx="170" cy="75" r="18" fill="url(#ballGradient)" />}
                    {pos === 'far' && <circle cx="280" cy="75" r="8" fill="url(#ballGradient)" opacity="0.5" />}
                    <defs>
                        <radialGradient id="ballGradient">
                            <stop offset="0%" stopColor="#FFD54F" />
                            <stop offset="100%" stopColor="#FB8C00" />
                        </radialGradient>
                    </defs>
                </svg>
            </motion.div>
        );
    }
    if (type === 'size') {
        const { aSize, bSize, itemType } = data;
        return (
            <div style={{ display: 'flex', gap: 'clamp(20px, 10vw, 80px)', alignItems: 'flex-end', justifyContent: 'center' }}>
                <div style={{ textAlign: 'center' }}>
                    <motion.div
                        initial={{ height: 0 }} animate={{ height: aSize }}
                        style={{ width: 'clamp(40px, 15vw, 80px)', background: 'linear-gradient(to top, #4ECDC4, #A5F3EB)', borderRadius: '15px 15px 0 0', border: '5px solid white', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}
                    />
                    <div style={{ marginTop: '15px', fontWeight: '900', color: '#4ECDC4', fontSize: '1.5rem' }}>A</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                    <motion.div
                        initial={{ height: 0 }} animate={{ height: bSize }}
                        style={{ width: 'clamp(40px, 15vw, 80px)', background: 'linear-gradient(to top, #FF6B6B, #FFADAD)', borderRadius: '15px 15px 0 0', border: '5px solid white', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}
                    />
                    <div style={{ marginTop: '15px', fontWeight: '900', color: '#FF6B6B', fontSize: '1.5rem' }}>B</div>
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

const ShapesAndSpace = () => {
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
    const [answers, setAnswers] = useState({});
    const [sessionQuestions, setSessionQuestions] = useState([]);
    const [sessionId, setSessionId] = useState(null);
    const [motivation, setMotivation] = useState(null);
    const [showExplanationModal, setShowExplanationModal] = useState(false);

    const getTopicInfo = () => {
        const grade1Config = TOPIC_CONFIGS['1'];
        for (const [topicName, skills] of Object.entries(grade1Config)) {
            const skill = skills.find(s => s.id === skillId);
            if (skill) return { topicName, skillName: skill.name };
        }
        return { topicName: 'Shapes and Space', skillName: 'Mathematics' };
    };

    const { topicName, skillName } = getTopicInfo();

    const generateQuestions = (selectedSkill) => {
        const questions = [];
        const colors = ['#FF6B6B', '#4ECDC4', '#FFE66D', '#98D8C8', '#C9A9E9'];

        for (let i = 0; i < TOTAL_QUESTIONS; i++) {
            let question = {};

            // Skill Allocation Logic
            if (selectedSkill === 'G1-CH1-01' || !selectedSkill) {
                // Identifying shapes
                const shapes = ['circle', 'square', 'triangle', 'rectangle'];
                const target = shapes[Math.floor(Math.random() * shapes.length)];
                const otherOptions = shapes.filter(s => s !== target);
                question = {
                    text: `What shape is this? 🔍`,
                    options: [target, ...otherOptions.sort(() => 0.5 - Math.random()).slice(0, 2)].sort(() => 0.5 - Math.random()),
                    correct: target,
                    type: 'shape',
                    visualData: { shape: target, color: colors[i % colors.length] },
                    explanation: `This object has the characteristics of a ${target.toUpperCase()}.`
                };
            } else if (selectedSkill === 'G1-CH1-02') {
                // Understanding positions
                const posTypes = [
                    { q: 'Where is the yellow ball? 🎾', a: 'top' },
                    { q: 'Is the ball inside or outside the box? 📦', a: 'inside' },
                    { q: 'Where is the ball located? 📍', a: 'bottom' },
                    { q: 'Where can you see the ball? 👀', a: 'outside' }
                ];
                const item = posTypes[Math.floor(Math.random() * posTypes.length)];
                question = {
                    text: item.q,
                    options: ['top', 'bottom', 'inside', 'outside'].sort(() => 0.5 - Math.random()),
                    correct: item.a,
                    type: 'position',
                    visualData: { pos: item.a },
                    explanation: `The ball is positioned at the ${item.a.toUpperCase()} in this visual representation.`
                };
            } else if (selectedSkill === 'G1-CH1-03') {
                // Comparing sizes
                const sizeQuestions = [
                    { q: 'Which bar is HIGHER? 🏢', a: 'A', aSize: 180, bSize: 80, exp: 'Bar A is taller than Bar B.' },
                    { q: 'Which one is SMALLER? 🐜', a: 'B', aSize: 160, bSize: 40, exp: 'Bar B has a smaller height than Bar A.' },
                    { q: 'Which bar is SHORTER? 📏', a: 'B', aSize: 140, bSize: 70, exp: 'Bar B is not as long/tall as Bar A.' },
                    { q: 'Pick the LONGER one! 🚀', a: 'A', aSize: 170, bSize: 90, exp: 'Bar A extends further than Bar B.' }
                ];
                const item = sizeQuestions[Math.floor(Math.random() * sizeQuestions.length)];
                question = {
                    text: item.q,
                    options: ['A', 'B'],
                    correct: item.a,
                    type: 'size',
                    visualData: { aSize: item.aSize, bSize: item.bSize },
                    explanation: item.exp
                };
            } else {
                // Default fallback
                question = { text: "Look at the object!", options: ["Yes"], correct: "Yes", type: "shape", visualData: { shape: 'circle', color: '#FF6B6B' }, explanation: "Visual matching is key here!" };
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
                const session = await api.createPracticeSession(user?.id, 'shapes-and-space');
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
        } else {
            setMotivation(null);
        }

        setAnswers(prev => ({
            ...prev,
            [qIndex]: {
                selectedOption: option,
                isCorrect,
                questionText: sessionQuestions[qIndex].text,
                correctAnswer: sessionQuestions[qIndex].correct,
                explanation: sessionQuestions[qIndex].explanation
            }
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
        const percentage = Math.round((score / TOTAL_QUESTIONS) * 100);
        return (
            <div className="grade1-practice-page results-view overflow-y-auto">
                <Navbar />
                <header className="results-header">
                    <div className="sun-timer-results">
                        <div className="sun-timer">
                            <div className="sun-rays"></div>
                            <span className="timer-text-sun">{formatTime(timer)}</span>
                        </div>
                    </div>
                    <h1 className="results-title">Adventure Report</h1>
                    <div className="exit-container">
                        <StickerExit onClick={() => navigate('/junior/grade/1')} />
                    </div>
                </header>

                <main className="results-content">
                    <div className="results-hero-section">
                        <img src={avatarImg} alt="Mascot" style={{ width: '120px', height: '120px', margin: '0 auto 20px' }} />
                        <h2 style={{ fontSize: '2.5rem', fontWeight: 900, color: '#31326F', fontFamily: 'Fredoka, cursive' }}>Adventure Complete! 🎉</h2>

                        <div className="stars-container">
                            {[1, 2, 3].map(i => (
                                <motion.div
                                    key={i}
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: i * 0.2 }}
                                    className="star-wrapper"
                                >
                                    <Star
                                        size={60}
                                        fill={percentage >= (i * 33) ? "#FFD700" : "#EDF2F7"}
                                        color={percentage >= (i * 33) ? "#F6AD55" : "#CBD5E0"}
                                    />
                                </motion.div>
                            ))}
                        </div>

                        <div className="results-stats-grid">
                            <div className="stat-card">
                                <span className="stat-label">Correct</span>
                                <span className="stat-value-large">{score}/{TOTAL_QUESTIONS}</span>
                            </div>
                            <div className="stat-card">
                                <span className="stat-label">Time</span>
                                <span className="stat-value-large">{formatTime(timer)}</span>
                            </div>
                            <div className="stat-card">
                                <span className="stat-label">Accuracy</span>
                                <span className="stat-value-large">{percentage}%</span>
                            </div>
                            <div className="stat-card">
                                <span className="stat-label">Score</span>
                                <span className="stat-value-large">{score * 10}</span>
                            </div>
                        </div>
                    </div>

                    <div className="detailed-breakdown">
                        <h3 className="breakdown-title">Quest Log 📜</h3>
                        <div className="quest-log-list">
                            {sessionQuestions.map((q, idx) => {
                                const ans = answers[idx];
                                if (!ans) return null;
                                return (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        className="quest-log-item"
                                    >
                                        <div className={`log-number ${!ans.isCorrect ? 'wrong' : ''}`}>
                                            {idx + 1}
                                        </div>
                                        <div className="log-content">
                                            <div className="log-question">
                                                <LatexText text={ans.questionText} />
                                            </div>
                                            <div className="log-answers">
                                                <div className={`log-answer-box ${ans.isCorrect ? 'correct-box' : 'wrong-box'}`}>
                                                    <span className="log-label">Your Answer</span>
                                                    <span className="log-value">{ans.selectedOption}</span>
                                                </div>
                                                {!ans.isCorrect && (
                                                    <div className="log-answer-box correct-box">
                                                        <span className="log-label">Correct Answer</span>
                                                        <span className="log-value">{ans.correctAnswer}</span>
                                                    </div>
                                                )}
                                            </div>
                                            <div className="log-explanation">
                                                <span className="log-label" style={{ color: '#4C51BF' }}>Explain? 💡</span>
                                                <LatexText text={ans.explanation} />
                                            </div>
                                        </div>
                                        <div className="log-icon">
                                            {ans.isCorrect ? (
                                                <Check size={32} color="#4FB7B3" strokeWidth={3} />
                                            ) : (
                                                <X size={32} color="#FF6B6B" strokeWidth={3} />
                                            )}
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>

                    <div className="results-actions">
                        <button className="action-btn-large play-again-btn" onClick={() => window.location.reload()}>
                            <RefreshCw size={24} /> Start New Quest
                        </button>
                        <button className="action-btn-large back-topics-btn" onClick={() => navigate('/junior/grade/1')}>
                            <FileText size={24} /> Back to Topics
                        </button>
                    </div>
                </main>
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

                    <div className="g1-timer-badge">
                        <Timer size={18} />
                        {formatTime(timer)}
                    </div>

                    <div style={{ fontWeight: 800, color: '#666', fontSize: '1rem', background: 'white', padding: '5px 12px', borderRadius: '15px', boxShadow: '0 4px 10px rgba(0,0,0,0.05)' }}>
                        Question {qIndex + 1} of {TOTAL_QUESTIONS}
                    </div>

                    <div className="exit-practice-sticker" style={{ marginLeft: 'auto' }}>
                        <StickerExit onClick={() => navigate('/junior/grade/1')} />
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
                                        <LatexText text={opt.charAt(0).toUpperCase() + opt.slice(1)} />
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

export default ShapesAndSpace;

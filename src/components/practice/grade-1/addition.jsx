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
    const totalQuestions = 5;
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
        return { topicName: 'Addition', skillName: 'Mathematics' };
    };

    const { topicName, skillName } = getTopicInfo();

    const generateQuestions = (selectedSkill) => {
        const questions = [];
        const colors = ['#FF6B6B', '#4ECDC4', '#FFE66D', '#98D8C8', '#C9A9E9'];

        for (let i = 0; i < totalQuestions; i++) {
            let question = {};
            const color1 = colors[i % colors.length];
            const color2 = colors[(i + 1) % colors.length];

            if (selectedSkill === '301' || !selectedSkill) {
                // Visual Addition
                const n1 = Math.floor(Math.random() * 5) + 1;
                const n2 = Math.floor(Math.random() * 4) + 1;
                question = {
                    text: `Count all the circles together! 🍭`,
                    options: [n1 + n2, (n1 + n2 + 1) % 11 || 1, Math.max(1, n1 + n2 - 1)].filter((v, idx, self) => self.indexOf(v) === idx).sort(() => 0.5 - Math.random()),
                    correct: n1 + n2,
                    type: 'visual',
                    visualData: { n1, n2, color1, color2 },
                    explanation: `We have ${n1} circles and ${n2} more circles. Counting them all gives us ${n1 + n2}.`,
                    solution: `${n1} + ${n2} = ${n1 + n2}`
                };
            } else if (selectedSkill === '302') {
                // Numeric
                const n1 = Math.floor(Math.random() * 9) + 1;
                const n2 = Math.floor(Math.random() * (10 - n1));
                question = {
                    text: `What is ${n1} plus ${n2}? ➕`,
                    options: [n1 + n2, n1 + n2 + 2, Math.max(0, n1 + n2 - 1)].filter((v, idx, self) => self.indexOf(v) === idx).sort(() => 0.5 - Math.random()),
                    correct: n1 + n2,
                    type: 'numeric',
                    visualData: { n1, n2, color1, color2 },
                    explanation: `Starting from ${n1}, if we count forward ${n2} times, we reach ${n1 + n2}.`,
                    solution: `${n1} + ${n2} = ${n1 + n2}`
                };
            } else if (selectedSkill === '303') {
                // Zero
                const n = Math.floor(Math.random() * 9) + 1;
                const withZeroFirst = Math.random() > 0.5;
                const n1 = withZeroFirst ? 0 : n;
                const n2 = withZeroFirst ? n : 0;
                question = {
                    text: `Add zero to the number! ✨`,
                    options: [n, 0, n + 1].sort(() => 0.5 - Math.random()),
                    correct: n,
                    type: 'numeric',
                    visualData: { n1, n2, color1, color2 },
                    explanation: `Adding zero to any number doesn't change it. So ${n1} + ${n2} is still ${n}.`,
                    solution: `${n1} + ${n2} = ${n}`
                };
            } else {
                question = { text: "Add them up!", options: ["2"], correct: "2", type: "numeric", visualData: { n1: 1, n2: 1, color1, color2 }, explanation: "Simple addition!" };
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
                        total_questions: totalQuestions,
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
        const percentage = Math.round((score / totalQuestions) * 100);
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
                                <span className="stat-value-large">{score}/{totalQuestions}</span>
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

                    <div style={{ fontWeight: 800, color: '#666', fontSize: '1rem', background: 'white', padding: '8px 15px', borderRadius: '15px', boxShadow: '0 4px 10px rgba(0,0,0,0.05)' }}>
                        Question {qIndex + 1} of {totalQuestions}
                    </div>

                    <div className="exit-practice-sticker" style={{ marginLeft: 'auto' }}>
                        <StickerExit onClick={() => navigate('/junior/grade/1')} />
                    </div>
                </div>

                <div className="g1-progress-container" style={{ margin: '0 0 30px 0' }}>
                    <div className="g1-progress-fill" style={{ width: `${((qIndex + 1) / totalQuestions) * 100}%` }}></div>
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
                                        <LatexText text={opt.toString()} />
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
                                {qIndex === totalQuestions - 1 ? 'Finish Quest 🏆' : 'Next Challenge 🚀'} <ArrowRight />
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
                solution={currentQ.solution}
                onClose={() => setShowExplanationModal(false)}
                onNext={handleNext}
            />
        </div>
    );
};

export default Addition;

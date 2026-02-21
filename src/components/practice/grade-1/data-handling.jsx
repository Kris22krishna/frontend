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
    if (type === 'pictograph') {
        const { chartData } = data;
        return (
            <div className="g1-pictograph-container" style={{ background: 'white', padding: '20px', borderRadius: '30px', border: '3px solid #E0FBEF', width: '100%' }}>
                {chartData.map((row, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', marginBottom: '15px', borderBottom: '1px dashed #E2E8F0', paddingBottom: '10px' }}>
                        <div style={{ width: '80px', fontWeight: 800, color: '#4A5568', fontSize: '1.2rem' }}>{row.label}</div>
                        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                            {Array.from({ length: row.count }).map((_, idx) => (
                                <motion.span
                                    key={idx}
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: idx * 0.1 }}
                                    style={{ fontSize: '1.5rem' }}
                                >
                                    {row.icon}
                                </motion.span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
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
                                key={i}
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: i * 0.05 }}
                                className="g1-bubble"
                                style={{ background: color1 }}
                            />
                        ))}
                    </div>
                </motion.div>

                <motion.div initial={{ x: 30 }} animate={{ x: 0 }} className="g1-data-group" style={{ background: color2 + '10', borderColor: color2 }}>
                    <div className="g1-group-label" style={{ color: color2 }}>Group B</div>
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center' }}>
                        {Array.from({ length: g2 }).map((_, i) => (
                            <motion.div
                                key={i}
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: i * 0.05 }}
                                className="g1-bubble"
                                style={{ background: color2 }}
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
    const totalQuestions = 5;

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
        return { topicName: 'Data Handling', skillName: 'Mathematics' };
    };

    const { topicName, skillName } = getTopicInfo();
    const isTest = skillId === '904';

    const generateQuestions = (selectedSkill) => {
        const questions = [];
        const colors = ['#FF6B6B', '#4ECDC4', '#FFE66D', '#98D8C8', '#C9A9E9'];

        const questionsPoolCount = isTest ? 15 : totalQuestions;

        for (let i = 0; i < questionsPoolCount; i++) {
            let type;
            if (isTest) {
                const types = ['sorting', 'pictograph', 'counting', 'grouping'];
                type = types[i % types.length];
            } else {
                if (selectedSkill === '901') type = 'sorting';
                else if (selectedSkill === '902') type = 'pictograph';
                else if (selectedSkill === '903') type = (i % 2 === 0) ? 'counting' : 'grouping';
                else type = 'sorting'; // fallback
            }

            let question = {};
            if (type === 'sorting') {
                const fruits = ['🍎', '🍌', '🍇'];
                const items = Array.from({ length: 12 }).map(() => fruits[Math.floor(Math.random() * 3)]);
                const target = fruits[Math.floor(Math.random() * 3)];
                const count = items.filter(f => f === target).length;
                question = {
                    text: `Look at this big collection! How many ${target} fruits are there in total? 🧺`,
                    options: [count, count + 1, count + 2].filter(v => v >= 0),
                    correct: count,
                    type: 'sorting',
                    visualData: { items, colorMap: { '🍎': '#FF6B6B', '🍌': '#FFE66D', '🍇': '#C9A9E9' } },
                    explanation: `We sorted them and found exactly ${count} ${target}.`
                };
            } else if (type === 'pictograph') {
                const items = [
                    { label: 'Books', icon: '📚', count: Math.floor(Math.random() * 4) + 2 },
                    { label: 'Pens', icon: '✏️', count: Math.floor(Math.random() * 4) + 2 },
                    { label: 'Toys', icon: '🪀', count: Math.floor(Math.random() * 4) + 2 }
                ];
                const targetObj = items[Math.floor(Math.random() * 3)];
                question = {
                    text: `This chart shows our favorite things. How many ${targetObj.label} do we have? 📊`,
                    options: [targetObj.count, targetObj.count + 1, targetObj.count + 2].sort(() => 0.5 - Math.random()),
                    correct: targetObj.count,
                    type: 'pictograph',
                    visualData: { chartData: items },
                    explanation: `If you count the ${targetObj.icon} icons in the row for ${targetObj.label}, you'll see there are ${targetObj.count}.`
                };
            } else if (type === 'counting') {
                const animals = ['🐶', '🐱', '🐰'];
                const items = Array.from({ length: 6 }).map(() => animals[Math.floor(Math.random() * 3)]);
                const target = animals[Math.floor(Math.random() * 3)];
                const count = items.filter(a => a === target).length;
                question = {
                    text: `Count the ${target} pets! 🐾`,
                    options: [count, count + 1, count > 0 ? count - 1 : 10].filter((v, idx, s) => s.indexOf(v) === idx).sort(() => 0.5 - Math.random()),
                    correct: count,
                    type: 'counting',
                    visualData: { items, colorMap: { '🐶': '#4ECDC4', '🐱': '#FF6B6B', '🐰': '#FFE66D' } },
                    explanation: `There are ${count} ${target} pets here.`
                };
            } else if (type === 'grouping') {
                const g1 = Math.floor(Math.random() * 5) + 3;
                let g2 = Math.floor(Math.random() * 5) + 3;
                while (g1 === g2) g2 = Math.floor(Math.random() * 5) + 3;
                const isMore = Math.random() > 0.5;
                const correct = (isMore ? (g1 > g2 ? 'Group A' : 'Group B') : (g1 < g2 ? 'Group A' : 'Group B'));

                question = {
                    text: `Compare the groups! Which one has ${isMore ? 'more' : 'fewer'} bubbles? 🫧`,
                    options: ['Group A', 'Group B'],
                    correct: correct,
                    type: 'grouping',
                    visualData: { g1, g2, color1: colors[i % colors.length], color2: colors[(i + 1) % colors.length] },
                    explanation: `${correct} has ${isMore ? 'more' : 'fewer'} bubbles than the other group.`,
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
                const session = await api.createPracticeSession(user?.id, isTest ? 'data-handling-test' : 'data-handling-practice');
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
            if (!isTest) {
                setMotivation(MOTIVATIONS[Math.floor(Math.random() * MOTIVATIONS.length)]);
            }
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
                explanation: sessionQuestions[qIndex].explanation || "Great job!"
            }
        }));
        if (!isTest) {
            setShowExplanationModal(true);
        }
    };

    const handleNext = async () => {
        const total = isTest ? 15 : totalQuestions;
        if (qIndex < total - 1) {
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
                        total_questions: total,
                        time_spent: timer,
                        answers: Object.values(answers)
                    });
                }
            } catch (e) { console.error(e); }
        }
    };

    const handleSkip = () => {
        if (isAnswered) return;
        setAnswers(prev => ({
            ...prev,
            [qIndex]: {
                selectedOption: 'Skipped',
                isCorrect: false,
                questionText: sessionQuestions[qIndex].text,
                correctAnswer: sessionQuestions[qIndex].correct,
                explanation: "This question was skipped. " + (sessionQuestions[qIndex].explanation || "")
            }
        }));
        handleNext();
    };

    const formatTime = (s) => {
        const mins = Math.floor(s / 60);
        const secs = s % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    if (sessionQuestions.length === 0) return <div className="grade1-practice-page"><div className="g1-loading-blob" /></div>;

    if (showResults) {
        const total = isTest ? 15 : totalQuestions;
        const percentage = Math.round((score / total) * 100);
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
                                <span className="stat-value-large">{score}/{total}</span>
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

                    {isTest ? (
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
                    ) : (
                        <div className="practice-summary" style={{ textAlign: 'center', padding: '20px 0' }}>
                            <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap', marginBottom: '20px' }}>
                                {Object.values(answers).map((ans, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ delay: idx * 0.1 }}
                                        style={{
                                            width: '50px', height: '50px', borderRadius: '50%',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            fontSize: '1.5rem',
                                            background: ans.isCorrect ? '#C6F6D5' : '#FED7D7',
                                            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                                        }}
                                    >
                                        {ans.isCorrect ? '✅' : '❌'}
                                    </motion.div>
                                ))}
                            </div>
                            <p style={{ fontSize: '1.3rem', fontWeight: 700, color: '#4A5568', marginBottom: '10px' }}>
                                {percentage >= 80 ? '🌟 Amazing work! Keep it up!' :
                                 percentage >= 60 ? '💪 Good effort! Keep practicing!' :
                                 '🌱 Nice try! Practice makes perfect!'}
                            </p>
                        </div>
                    )}

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
    const totalLines = isTest ? 15 : totalQuestions;

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
                        Question {qIndex + 1} of {totalLines}
                    </div>

                    {isTest && (
                        <button
                            className="g1-skip-btn"
                            onClick={handleSkip}
                            disabled={isAnswered}
                            style={{
                                marginLeft: '10px',
                                background: '#EDF2F7',
                                color: '#4A5568',
                                padding: '8px 15px',
                                borderRadius: '15px',
                                fontWeight: 700,
                                fontSize: '0.9rem',
                                border: 'none',
                                cursor: isAnswered ? 'not-allowed' : 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '5px'
                            }}
                        >
                            Skip Quest ⏭️
                        </button>
                    )}

                    <div className="exit-practice-sticker" style={{ marginLeft: 'auto' }}>
                        <StickerExit onClick={() => navigate('/junior/grade/1')} />
                    </div>
                </div>

                <div className="g1-progress-container" style={{ margin: '0 0 30px 0' }}>
                    <div className="g1-progress-fill" style={{ width: `${((qIndex + 1) / totalLines) * 100}%` }}></div>
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
                                            ${selectedOption === opt ? (isTest ? 'selected-test' : (opt === currentQ.correct ? 'selected-correct' : 'selected-wrong')) : ''}
                                            ${!isTest && isAnswered && opt === currentQ.correct ? 'revealed-correct' : ''}
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
                                        <img src={mascotImg} alt="mascot" className="w-16 h-16 object-contain mb-2" />
                                        <span className="g1-motivation-text">{motivation.text}</span>
                                        <span className="g1-motivation-sub">{motivation.sub}</span>
                                    </motion.div>
                                )}
                                <button className="g1-primary-btn" style={{ padding: '20px 60px', borderRadius: '40px', fontSize: '1.4rem' }} onClick={handleNext}>
                                    {qIndex === totalLines - 1 ? (isTest ? 'Submit Test 📝' : 'Finish Quest 🏆') : 'Next Challenge 🚀'} <ArrowRight />
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
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

export default DataHandling;

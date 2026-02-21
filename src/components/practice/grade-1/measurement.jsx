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
    if (type === 'length' || type === 'height') {
        const { l1, l2, color1, color2, label1, label2, isVertical } = data;
        return (
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="g1-measure-visual">
                <div style={{
                    display: 'flex',
                    flexDirection: isVertical ? 'row' : 'column',
                    gap: '20px',
                    alignItems: isVertical ? 'flex-end' : 'flex-start',
                    justifyContent: 'center',
                    padding: '30px',
                    background: 'white',
                    borderRadius: '30px',
                    boxShadow: '0 10px 25px rgba(0,0,0,0.05)',
                    width: '100%'
                }}>
                    <div style={{ display: 'flex', flexDirection: isVertical ? 'column-reverse' : 'row', alignItems: 'center', gap: '15px' }}>
                        <motion.div
                            initial={{ width: 0, height: 0 }} animate={{ width: isVertical ? 35 : l1, height: isVertical ? l1 : 35 }}
                            style={{ background: `linear-gradient(${isVertical ? '0' : '90'}deg, ${color1}, ${color1}dd)`, borderRadius: '10px' }}
                        />
                        <span style={{ fontWeight: 800, color: '#31326F' }}>{label1}</span>
                    </div>
                    <div style={{ display: 'flex', flexDirection: isVertical ? 'column-reverse' : 'row', alignItems: 'center', gap: '15px' }}>
                        <motion.div
                            initial={{ width: 0, height: 0 }} animate={{ width: isVertical ? 35 : l2, height: isVertical ? l2 : 35 }}
                            style={{ background: `linear-gradient(${isVertical ? '0' : '90'}deg, ${color2}, ${color2}dd)`, borderRadius: '10px' }}
                        />
                        <span style={{ fontWeight: 800, color: '#31326F' }}>{label2}</span>
                    </div>
                </div>
            </motion.div>
        );
    }

    if (type === 'weight') {
        const { label1, label2, objA, objB } = data;
        return (
            <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} style={{ display: 'flex', gap: '50px', justifyContent: 'center', background: 'white', padding: '30px', borderRadius: '30px', boxShadow: '0 10px 25px rgba(0,0,0,0.05)' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
                    <div style={{ fontSize: '60px', filter: 'drop-shadow(0 5px 10px rgba(0,0,0,0.1))' }}>
                        {objA.emoji}
                    </div>
                    <span style={{ fontWeight: 900, color: '#31326F' }}>{label1}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', fontSize: '1.5rem', color: '#94a3b8', fontWeight: 900 }}>VS</div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
                    <div style={{ fontSize: '60px', filter: 'drop-shadow(0 5px 10px rgba(0,0,0,0.1))' }}>
                        {objB.emoji}
                    </div>
                    <span style={{ fontWeight: 900, color: '#31326F' }}>{label2}</span>
                </div>
            </motion.div>
        );
    }

    if (type === 'capacity') {
        const { f1, f2, color1, color2, label1, label2 } = data; // content fillers
        return (
            <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} style={{ display: 'flex', gap: '50px', justifyContent: 'center', background: 'white', padding: '30px', borderRadius: '30px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
                    <div style={{ position: 'relative', width: '60px', height: '100px', border: '3px solid #64748b', borderTop: 'none', borderRadius: '0 0 10px 10px', overflow: 'hidden' }}>
                        <motion.div initial={{ height: 0 }} animate={{ height: `${f1}%` }} style={{ position: 'absolute', bottom: 0, width: '100%', background: color1, opacity: 0.7 }} />
                    </div>
                    <span style={{ fontWeight: 900, color: '#31326F' }}>{label1}</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
                    <div style={{ position: 'relative', width: '60px', height: '100px', border: '3px solid #64748b', borderTop: 'none', borderRadius: '0 0 10px 10px', overflow: 'hidden' }}>
                        <motion.div initial={{ height: 0 }} animate={{ height: `${f2}%` }} style={{ position: 'absolute', bottom: 0, width: '100%', background: color2, opacity: 0.7 }} />
                    </div>
                    <span style={{ fontWeight: 900, color: '#31326F' }}>{label2}</span>
                </div>
            </motion.div>
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

const Measurement = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const skillId = queryParams.get('skillId');
    const isTest = skillId === '704';
    const totalQuestions = isTest ? 10 : 5;

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
        return { topicName: 'Measurement', skillName: 'Mathematics' };
    };

    const { topicName, skillName } = getTopicInfo();

    const generateQuestions = (selectedSkill) => {
        const questions = [];
        const colors = ['#FF6B6B', '#4ECDC4', '#FFE66D', '#98D8C8', '#A9D18E'];

        for (let i = 0; i < totalQuestions; i++) {
            let question = {};
            const color1 = colors[i % colors.length];
            const color2 = colors[(i + 1) % colors.length];

            // 701: Measuring Length/Height
            // 702: Comparing Weights
            // 703: Comparing Capacities
            let type = 'length';
            if (isTest) {
                if (i < 4) type = Math.random() > 0.5 ? 'length' : 'height';
                else if (i < 7) type = 'weight';
                else type = 'capacity';
            } else if (selectedSkill === '701') {
                type = Math.random() > 0.5 ? 'length' : 'height';
            } else if (selectedSkill === '702') {
                type = 'weight';
            } else if (selectedSkill === '703') {
                type = 'capacity';
            } else {
                const randomTypes = ['length', 'height', 'weight', 'capacity'];
                type = randomTypes[i % 4];
            }

            if (type === 'length' || type === 'height') {
                const isLonger = Math.random() > 0.5;
                const l1 = Math.floor(Math.random() * 80) + 60;
                const l2 = l1 + (Math.random() > 0.5 ? 40 : -40);

                let label1, label2, adjLong, adjShort, icon;
                if (type === 'length') {
                    label1 = "Ribbon A"; label2 = "Ribbon B";
                    adjLong = "longer"; adjShort = "shorter";
                    icon = "📏";
                } else {
                    label1 = "Building A"; label2 = "Building B";
                    adjLong = "taller"; adjShort = "shorter";
                    icon = "🏢";
                }

                const adj = isLonger ? adjLong : adjShort;
                const correct = (isLonger ? (l1 > l2 ? label1 : label2) : (l1 < l2 ? label1 : label2));

                question = {
                    text: `Which one is ${adj}? ${icon}`,
                    options: [label1, label2].sort(() => 0.5 - Math.random()),
                    correct: correct,
                    type,
                    visualData: { l1, l2, color1, color2, label1, label2, isVertical: type === 'height' },
                    explanation: `Compare the ends of the objects. ${correct} is clearly ${adj}.`
                };
            } else if (type === 'weight') {
                const pairs = [
                    { h: { name: 'Elephant', emoji: '🐘', w: 1000 }, l: { name: 'Mouse', emoji: '🐭', w: 1 } },
                    { h: { name: 'Watermelon', emoji: '🍉', w: 50 }, l: { name: 'Apple', emoji: '🍎', w: 5 } },
                    { h: { name: 'School Bus', emoji: '🚌', w: 5000 }, l: { name: 'Bicycle', emoji: '🚲', w: 50 } },
                    { h: { name: 'Brick', emoji: '🧱', w: 30 }, l: { name: 'Feather', emoji: '🪶', w: 1 } },
                    { h: { name: 'Pumpkin', emoji: '🎃', w: 40 }, l: { name: 'Leaf', emoji: '🍃', w: 1 } },
                    { h: { name: 'Big Stone', emoji: '🪨', w: 60 }, l: { name: 'Balloon', emoji: '🎈', w: 2 } },
                    { h: { name: 'Cake', emoji: '🎂', w: 10 }, l: { name: 'Cupcake', emoji: '🧁', w: 2 } },
                    { h: { name: 'Tiger', emoji: '🐅', w: 200 }, l: { name: 'Cat', emoji: '🐈', w: 5 } },
                    { h: { name: 'Bag', emoji: '🎒', w: 15 }, l: { name: 'Pencil Box', emoji: '✏️', w: 1 } },
                    { h: { name: 'Tree', emoji: '🌳', w: 500 }, l: { name: 'Flower', emoji: '🌸', w: 1 } }
                ];

                const isHeavier = Math.random() > 0.5;
                const pair = pairs[i % pairs.length];
                const isReverse = Math.random() > 0.5;
                const objA = isReverse ? pair.l : pair.h;
                const objB = isReverse ? pair.h : pair.l;

                const adj = isHeavier ? 'heavier' : 'lighter';
                const correct = (isHeavier ? (objA.w > objB.w ? objA.name : objB.name) : (objA.w < objB.w ? objA.name : objB.name));

                question = {
                    text: `Look at the objects! Which one is ${adj}? ⚖️`,
                    options: [objA.name, objB.name].sort(() => 0.5 - Math.random()),
                    correct: correct,
                    type: 'weight',
                    visualData: { objA, objB, label1: objA.name, label2: objB.name },
                    explanation: `A ${pair.h.name} is heavier than a ${pair.l.name}. So, ${correct} is ${adj}.`
                };
            } else {
                const isMore = Math.random() > 0.5;
                const f1 = 30 + Math.floor(Math.random() * 20);
                const f2 = f1 + (Math.random() > 0.5 ? 40 : -20);
                const label1 = "Jug A";
                const label2 = "Cup B";
                const adj = isMore ? 'holds more' : 'holds less';
                const correct = (isMore ? (f1 > f2 ? label1 : label2) : (f1 < f2 ? label1 : label2));

                question = {
                    text: `Which container ${adj}? 💧`,
                    options: [label1, label2].sort(() => 0.5 - Math.random()),
                    correct: correct,
                    type: 'capacity',
                    visualData: { f1, f2, color1: '#3b82f6', color2: '#3b82f6', label1, label2 },
                    explanation: `Comparing the liquid levels, ${correct} ${adj}.`
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
                const session = await api.createPracticeSession(user?.id, 'measurement-grade1');
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
                explanation: sessionQuestions[qIndex].explanation
            }
        }));
        if (!isTest) {
            setShowExplanationModal(true);
        }
    };

    const handleNext = async () => {
        if (qIndex < totalQuestions - 1) {
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

    const handleSkip = () => {
        if (isAnswered) return;
        setAnswers(prev => ({
            ...prev,
            [qIndex]: {
                selectedOption: 'Skipped',
                isCorrect: false,
                questionText: sessionQuestions[qIndex].text,
                correctAnswer: sessionQuestions[qIndex].correct,
                explanation: "This question was skipped. " + sessionQuestions[qIndex].explanation
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
                        <h2 style={{ fontSize: '2.5rem', fontWeight: 900, color: '#31326F', fontFamily: 'Fredoka, cursive' }}>Quest Complete! 🎉</h2>

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
                            <RefreshCw size={24} /> New Quest
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

                    {isTest && !isAnswered && (
                        <button className="g1-skip-btn" onClick={handleSkip}>
                            Skip Quest ⏭️
                        </button>
                    )}

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

                    {isAnswered && (
                        <div className="flex flex-col items-center gap-4 mt-8">
                            {motivation && !isTest && (
                                <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="flex flex-col items-center">
                                    <img src={mascotImg} alt="mascot" className="w-16 h-16 object-contain mb-2" />
                                    <span className="g1-motivation-text">{motivation.text}</span>
                                    <span className="g1-motivation-sub">{motivation.sub}</span>
                                </motion.div>
                            )}
                            <button className="g1-primary-btn" style={{ padding: '20px 60px', borderRadius: '40px', fontSize: '1.4rem' }} onClick={handleNext}>
                                {qIndex === totalQuestions - 1 ? (isTest ? 'Submit Test 📝' : 'Finish Quest 🏆') : 'Next Challenge 🚀'} <ArrowRight />
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

export default Measurement;

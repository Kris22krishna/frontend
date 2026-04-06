import React, { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Home, ArrowRight, Timer, Trophy, Star, ChevronLeft, RefreshCw, FileText, Check, X, Eye, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSessionLogger } from '@/hooks/useSessionLogger';
import { NODE_IDS } from '@/lib/curriculumIds';
import Navbar from '../../Navbar';
import { TOPIC_CONFIGS } from '../../../lib/topicConfig';
import { LatexText } from '../../LatexText';
import ExplanationModal from '../../ExplanationModal';
import StickerExit from '../../StickerExit';
import mascotImg from '../../../assets/mascot.png';
import avatarImg from '../../../assets/avatar.png';
import '../../../pages/juniors/class-1/Grade1Practice.css';

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
                        <span style={{ fontWeight: 400, color: '#31326F' }}>{label1}</span>
                    </div>
                    <div style={{ display: 'flex', flexDirection: isVertical ? 'column-reverse' : 'row', alignItems: 'center', gap: '15px' }}>
                        <motion.div
                            initial={{ width: 0, height: 0 }} animate={{ width: isVertical ? 35 : l2, height: isVertical ? l2 : 35 }}
                            style={{ background: `linear-gradient(${isVertical ? '0' : '90'}deg, ${color2}, ${color2}dd)`, borderRadius: '10px' }}
                        />
                        <span style={{ fontWeight: 400, color: '#31326F' }}>{label2}</span>
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
                    <span style={{ fontWeight: 400, color: '#31326F' }}>{label1}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', fontSize: '1.5rem', color: '#94a3b8', fontWeight: 400 }}>VS</div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
                    <div style={{ fontSize: '60px', filter: 'drop-shadow(0 5px 10px rgba(0,0,0,0.1))' }}>
                        {objB.emoji}
                    </div>
                    <span style={{ fontWeight: 400, color: '#31326F' }}>{label2}</span>
                </div>
            </motion.div>
        );
    }

    if (type === 'capacity') {
        const { f1, f2, color1, color2, label1, label2, isAnswered } = data; // content fillers
        return (
            <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} style={{ display: 'flex', gap: '50px', justifyContent: 'center', background: 'white', padding: '30px', borderRadius: '30px', boxShadow: '0 10px 25px rgba(0,0,0,0.05)' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
                    <div style={{ position: 'relative', width: '60px', height: '100px', border: '3px solid #64748b', borderTop: 'none', borderRadius: '0 0 10px 10px', overflow: 'hidden', background: '#f8fafc' }}>
                        <motion.div initial={{ height: 0 }} animate={{ height: `${f1}%` }} style={{ position: 'absolute', bottom: 0, width: '100%', background: color1, opacity: 0.7 }} />
                        <AnimatePresence>
                            {isAnswered && (
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontWeight: 900, color: '#1e3a8a', fontSize: '1.2rem', textShadow: '0 0 10px white' }}>
                                    {f1}%
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                    <span style={{ fontWeight: 600, color: '#31326F' }}>{label1}</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
                    <div style={{ position: 'relative', width: '60px', height: '100px', border: '3px solid #64748b', borderTop: 'none', borderRadius: '0 0 10px 10px', overflow: 'hidden', background: '#f8fafc' }}>
                        <motion.div initial={{ height: 0 }} animate={{ height: `${f2}%` }} style={{ position: 'absolute', bottom: 0, width: '100%', background: color2, opacity: 0.7 }} />
                        <AnimatePresence>
                            {isAnswered && (
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontWeight: 900, color: '#1e3a8a', fontSize: '1.2rem', textShadow: '0 0 10px white' }}>
                                    {f2}%
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                    <span style={{ fontWeight: 600, color: '#31326F' }}>{label2}</span>
                </div>
            </motion.div>
        );
    }

    return null;
};

const SKILL_ID_MAP = {
    '701': NODE_IDS.g1MathMeasurementLengthHeight,
    '702': NODE_IDS.g1MathMeasurementWeight,
    '703': NODE_IDS.g1MathMeasurementCapacity,
    '704': NODE_IDS.g1MathMeasurementMixed,
};

const Measurement = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { startSession, logAnswer, finishSession } = useSessionLogger();

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
    const [showExplanationModal, setShowExplanationModal] = useState(false);

    const getTopicInfo = () => {
        const grade1Config = TOPIC_CONFIGS['1'];
        for (const gradeKey of Object.keys(TOPIC_CONFIGS)) {
            const gradeConfig = TOPIC_CONFIGS[gradeKey];
            for (const [topicName, skills] of Object.entries(gradeConfig)) {
                const skill = skills.find(s => s.id === skillId);
                if (skill) return { topicName, skillName: skill.name, grade: gradeKey };
            }
        }
        return { topicName: 'Measurement', skillName: 'Mathematics', grade: '1' };
    };

    const { topicName, skillName } = getTopicInfo();

    const getNextSkill = () => {
        const { grade } = getTopicInfo();
        const gradeConfig = TOPIC_CONFIGS[grade];
        const topics = Object.keys(gradeConfig);
        let currentTopicIdx = -1;
        let currentSkillIdx = -1;
        for (let i = 0; i < topics.length; i++) {
            const skills = gradeConfig[topics[i]];
            const idx = skills.findIndex(s => s.id === skillId);
            if (idx !== -1) { currentTopicIdx = i; currentSkillIdx = idx; break; }
        }
        if (currentTopicIdx === -1) return null;
        const currentTopicSkills = gradeConfig[topics[currentTopicIdx]];
        if (currentSkillIdx < currentTopicSkills.length - 1) {
            return { ...currentTopicSkills[currentSkillIdx + 1], topicName: topics[currentTopicIdx] };
        }
        if (currentTopicIdx < topics.length - 1) {
            const nextTopicName = topics[currentTopicIdx + 1];
            const nextTopicSkills = gradeConfig[nextTopicName];
            if (nextTopicSkills.length > 0) return { ...nextTopicSkills[0], topicName: nextTopicName };
        }
        return null;
    };

    const generateQuestions = (selectedSkill) => {
        const questions = [];
        const colors = ['#FF6B6B', '#4ECDC4', '#FFE66D', '#98D8C8', '#A9D18E'];
        for (let i = 0; i < totalQuestions; i++) {
            let question = {};
            const color1 = colors[i % colors.length];
            const color2 = colors[(i + 1) % colors.length];
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
                let label1, label2, adjLong, adjShort;
                if (type === 'length') {
                    label1 = "Ribbon A"; label2 = "Ribbon B";
                    adjLong = "longer"; adjShort = "shorter";
                } else {
                    label1 = "Building A"; label2 = "Building B";
                    adjLong = "taller"; adjShort = "shorter";
                }
                const adj = isLonger ? adjLong : adjShort;
                const correct = (isLonger ? (l1 > l2 ? label1 : label2) : (l1 < l2 ? label1 : label2));
                question = {
                    text: `Which one is ${adj}?`,
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
                ];
                const isHeavier = Math.random() > 0.5;
                const pair = pairs[i % pairs.length];
                const objA = pair.h; const objB = pair.l;
                const adj = isHeavier ? 'heavier' : 'lighter';
                const correct = (isHeavier ? objA.name : objB.name);
                question = {
                    text: `Which one is ${adj}?`,
                    options: [objA.name, objB.name].sort(() => 0.5 - Math.random()),
                    correct: correct,
                    type: 'weight',
                    visualData: { objA, objB, label1: objA.name, label2: objB.name },
                    explanation: `${correct} is ${adj}.`
                };
            } else {
                const isMore = Math.random() > 0.5;
                const f1 = 30 + Math.floor(Math.random() * 20);
                const f2 = f1 + (Math.random() > 0.5 ? 40 : -20);
                const label1 = "Jug A"; const label2 = "Jug B";
                const adj = isMore ? 'holds more' : 'holds less';
                const correct = (isMore ? (f1 > f2 ? label1 : label2) : (f1 < f2 ? label1 : label2));
                question = {
                    text: `Which one ${adj}?`,
                    options: [label1, label2].sort(() => 0.5 - Math.random()),
                    correct: correct,
                    type: 'capacity',
                    visualData: { f1, f2, color1: '#3b82f6', color2: '#3b82f6', label1, label2 },
                    explanation: `${correct} ${adj}.`
                };
            }
            questions.push(question);
        }
        return questions;
    };

    useEffect(() => {
        const qs = generateQuestions(skillId);
        setSessionQuestions(qs);
        const nodeId = SKILL_ID_MAP[skillId] || NODE_IDS.g1MathMeasurementMixed;
        startSession({ nodeId, sessionType: isTest ? 'assessment' : 'practice' });
    }, [skillId, isTest, startSession]);

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

    const handleExit = async () => {
        navigate('/junior/grade/1');
    };

    const handleOptionSelect = (option) => {
        if (isAnswered) return;
        setSelectedOption(option);
    };

    const handleSubmit = () => {
        if (isAnswered || selectedOption === null) return;
        const option = selectedOption;
        const currentQ = sessionQuestions[qIndex];
        const isCorrect = option === currentQ.correct;

        setIsAnswered(true);
        if (isCorrect) setScore(s => s + 1);

        const answerData = {
            question_text: currentQ.text,
            selected: option,
            correct: currentQ.correct,
            isCorrect
        };

        logAnswer({
            question_index: qIndex,
            answer_json: answerData,
            is_correct: isCorrect ? 1 : 0
        });

        setAnswers(prev => ({
            ...prev,
            [qIndex]: {
                selectedOption: option,
                isCorrect,
                type: currentQ.type,
                visualData: currentQ.visualData,
                questionText: currentQ.text,
                correctAnswer: currentQ.correct,
                explanation: currentQ.explanation || "Detailed explanation is coming soon!"
            }
        }));

        if (!isTest) {
            setShowExplanationModal(true);
        } else {
            setTimeout(() => {
                handleNext();
            }, 800);
        }
    };

    const handleNext = async () => {
        if (qIndex < totalQuestions - 1) {
            setQIndex(v => v + 1);
        } else {
            finishSession({
                totalQuestions,
                questionsAnswered: Object.keys(answers).length,
                answersPayload: answers
            });
            setShowResults(true);
        }
    };

    const handleSkip = () => {
        if (isAnswered) return;
        const currentQ = sessionQuestions[qIndex];
        
        logAnswer({
            question_index: qIndex,
            answer_json: { question_text: currentQ.text, selected: 'Skipped', correct: currentQ.correct, isCorrect: false },
            is_correct: 0
        });

        setAnswers(prev => ({
            ...prev,
            [qIndex]: {
                selectedOption: 'Skipped',
                isCorrect: false,
                type: currentQ.type,
                visualData: currentQ.visualData,
                questionText: currentQ.text,
                correctAnswer: currentQ.correct,
                explanation: "This question was skipped. " + currentQ.explanation
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
                    <h1 className="results-title">Adventure Report</h1>
                    <div className="exit-container">
                        <StickerExit onClick={handleExit} />
                    </div>
                </header>

                <main className="results-content">
                    <div className="results-hero-section">
                        <img src={avatarImg} alt="Mascot" style={{ width: '120px', height: '120px', margin: '0 auto 20px' }} />
                        <h2 style={{ fontSize: '2.5rem', fontWeight: 400, color: '#31326F', fontFamily: 'Nunito, sans-serif' }}>Quest Complete! 🎉</h2>

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
                                                    {ans.visualData && (
                                                        <div className="log-visual-area" style={{ marginTop: '10px', display: 'flex', justifyContent: 'center' }}>
                                                            <DynamicVisual type={ans.type} data={{ ...ans.visualData, isAnswered: true }} />
                                                        </div>
                                                    )}
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
                            <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '20px' }}>
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
                            <p style={{ fontSize: '1.3rem', fontWeight: 400, color: '#4A5568', marginBottom: '10px' }}>
                                {percentage >= 80 ? '🌟 Amazing work! Keep it up!' :
                                    percentage >= 60 ? '💪 Good effort! Keep practicing!' :
                                        '🌱 Nice try! Practice makes perfect!'}
                            </p>
                        </div>
                    )}

                    <div className="results-actions">
                        <button className="action-btn-large retake-skill-btn" onClick={() => window.location.reload()}>
                            <RefreshCw size={24} /> Retake Skill
                        </button>

                        {getNextSkill() && (
                            <button className="action-btn-large next-skill-btn" onClick={() => {
                                const next = getNextSkill();
                                navigate(`/junior/grade/1/${next.route}?skillId=${next.id}`);
                                window.location.reload();
                            }}>
                                Next Skill <ArrowRight size={24} />
                            </button>
                        )}

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
                    <div className="g1-timer-badge">
                        <Timer size={18} />
                        {formatTime(timer)}
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px', flex: 1, minWidth: 0 }}>
                        <span style={{ fontWeight: 400, color: '#666', fontSize: '1rem', background: 'white', padding: '8px 15px', borderRadius: '15px', boxShadow: '0 4px 10px rgba(0,0,0,0.05)', whiteSpace: 'nowrap' }}>
                            Q {qIndex + 1}/{totalQuestions}
                        </span>
                        <span style={{ fontWeight: 400, color: '#2D3436', fontSize: '1rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            <LatexText text={skillName} />
                        </span>
                    </div>

                    {isTest && !isAnswered && (
                        <button className="g1-skip-btn" onClick={handleSkip}>
                            Skip Quest ⏭️
                        </button>
                    )}

                    <div className="exit-practice-sticker" style={{ marginLeft: 'auto' }}>
                        <StickerExit onClick={handleExit} />
                    </div>
                </div>

                <div className="g1-progress-container" style={{ margin: '0 0 10px 0' }}>
                    <div className="g1-progress-fill" style={{ width: `${((qIndex + 1) / totalQuestions) * 100}%` }}></div>
                </div>
                <div className="g1-topic-header-compact" style={{ textAlign: 'center', margin: '5px 0', fontSize: '0.8rem', color: '#64748B', textTransform: 'uppercase', letterSpacing: '2px', fontWeight: 400 }}>{topicName}</div>
                <motion.div key={qIndex} initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="g1-question-card">
                    <h2 className="g1-question-text"><LatexText text={currentQ.text} /></h2>

                    <div className="g1-content-split">
                        <div className="g1-visual-area">
                            <DynamicVisual type={currentQ.type} data={{ ...currentQ.visualData, isAnswered }} />
                        </div>

                        <div className="g1-quiz-side">
                            <div className="g1-options-grid">
                                {currentQ.options.map((opt, i) => (
                                    <button
                                        key={i}
                                        className={`g1-option-btn 
                                            ${selectedOption === opt ? (isTest ? 'selected-test' : (isAnswered ? (opt === currentQ.correct ? 'selected-correct' : 'selected-wrong') : 'selected-test')) : ''}
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


                    {/* --- INJECTED FOOTER V2 --- */}
                    <div className="g1-navigation-footer">
                        <button className="g1-nav-btn prev-btn" onClick={() => { if (qIndex > 0) setQIndex(qIndex - 1); }} disabled={qIndex === 0}>
                            <ChevronLeft size={24} /> Prev
                        </button>

                        <div>
                            {isAnswered && !isTest && !answers[qIndex]?.isCorrect && (
                                <button className="g1-nav-btn steps-btn" onClick={() => setShowExplanationModal(true)}>
                                    <Eye size={24} /> Steps
                                </button>
                            )}

                            {!isAnswered ? (
                                <button className="g1-nav-btn submit-btn" onClick={handleSubmit} disabled={selectedOption === null}>
                                    {isTest ? 'Next' : 'Check Answer'} <ChevronRight size={24} />
                                </button>
                            ) : (
                                <button className="g1-nav-btn next-btn" onClick={handleNext}>
                                    {qIndex === totalQuestions - 1 ? (isTest ? 'Finish Test' : 'Finish') : 'Next Question'} <ChevronRight size={24} />
                                </button>
                            )}
                        </div>
                    </div>
                </motion.div>
            </div>

            <ExplanationModal
                isOpen={showExplanationModal}
                isCorrect={answers[qIndex]?.isCorrect}
                correctAnswer={currentQ.correct}
                explanation={currentQ.explanation}
                onClose={() => setShowExplanationModal(false)}
                onNext={() => {
                    setShowExplanationModal(false);
                    handleNext();
                }}
            />
        </div>
    );
};

export default Measurement;

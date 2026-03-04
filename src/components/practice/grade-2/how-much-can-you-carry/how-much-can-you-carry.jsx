import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Timer, Star, ChevronLeft, RefreshCw, FileText, Check, X, Eye, ChevronRight, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../../../contexts/AuthContext';
import { api } from '../../../../services/api';
import Navbar from '../../../Navbar';
import { TOPIC_CONFIGS } from '../../../../lib/topicConfig';
import { LatexText } from '../../../LatexText';
import ExplanationModal from '../../../ExplanationModal';
import StickerExit from '../../../StickerExit';
import mascotImg from '../../../../assets/mascot.png';
import avatarImg from '../../../../assets/avatar.png';
import '../../../../pages/juniors/class-1/Grade1Practice.css';

const DynamicVisual = ({ type, data }) => {
    if (type === 'compare') {
        const { objectA, objectB } = data;
        return (
            <div style={{ display: 'flex', justifyContent: 'center', gap: '80px', width: '100%', padding: '40px', background: 'white', borderRadius: '30px', boxShadow: '0 10px 25px rgba(0,0,0,0.05)' }}>
                <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px' }}>
                    <div style={{ fontSize: '70px', filter: 'drop-shadow(0 10px 15px rgba(0,0,0,0.1))' }}>
                        {objectA.emoji}
                    </div>
                    <span style={{ fontWeight: 900, color: '#31326F', fontSize: '1.2rem' }}>{objectA.name}</span>
                </motion.div>
                <div style={{ display: 'flex', alignItems: 'center', fontSize: '2rem', color: '#94a3b8', fontWeight: 900 }}>VS</div>
                <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px' }}>
                    <div style={{ fontSize: '70px', filter: 'drop-shadow(0 10px 15px rgba(0,0,0,0.1))' }}>
                        {objectB.emoji}
                    </div>
                    <span style={{ fontWeight: 900, color: '#31326F', fontSize: '1.2rem' }}>{objectB.name}</span>
                </motion.div>
            </div>
        );
    }

    if (type === 'estimate') {
        const { objectType } = data;
        const renderSVG = (objType) => {
            switch (objType) {
                case 'School Bag': return (
                    <svg width="120" height="150" viewBox="0 0 80 100">
                        <rect x="10" y="20" width="60" height="70" rx="10" fill="#4A90E2" stroke="#2171C1" strokeWidth="2" />
                        <rect x="20" y="35" width="40" height="30" rx="5" fill="#2171C1" />
                        <path d="M25 20 Q40 5 55 20" fill="none" stroke="#2171C1" strokeWidth="4" />
                    </svg>
                );
                case 'Pencil Box': return (
                    <svg width="150" height="60" viewBox="0 0 100 40">
                        <rect x="10" y="10" width="80" height="20" rx="4" fill="#67C23A" stroke="#4B9E27" strokeWidth="2" />
                        <circle cx="20" cy="20" r="2" fill="white" />
                        <circle cx="80" cy="20" r="2" fill="white" />
                    </svg>
                );
                case 'Water Bottle': return (
                    <svg width="60" height="150" viewBox="0 0 40 100">
                        <rect x="10" y="30" width="20" height="60" rx="5" fill="#E6A23C" />
                        <rect x="12" y="15" width="16" height="15" rx="2" fill="#E6A23C" />
                        <path d="M10 30 Q20 20 30 30" fill="#E6A23C" />
                    </svg>
                );
                case 'Tiffin': return (
                    <svg width="120" height="90" viewBox="0 0 80 60">
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
    }

    return null;
};

const Grade2HowMuchCanYouCarry = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const queryParams = new URLSearchParams(location.search);
    const skillId = queryParams.get('skillId');
    const isTest = skillId ? skillId.includes('TEST') : false;
    const totalQuestions = isTest ? 15 : 5;

    const [qIndex, setQIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [showResults, setShowResults] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const [isAnswered, setIsAnswered] = useState(false);
    const [timer, setTimer] = useState(0);
    const [answers, setAnswers] = useState({});
    const [sessionQuestions, setSessionQuestions] = useState([]);
    const [sessionId, setSessionId] = useState(null);
    const [showExplanationModal, setShowExplanationModal] = useState(false);

    const getTopicInfo = () => {
        const grade2Config = TOPIC_CONFIGS['2'];
        if (!grade2Config) return { topicName: 'Practice', skillName: 'Mathematics' };

        for (const [topicName, skills] of Object.entries(grade2Config)) {
            const skill = skills.find(s => s.id === skillId);
            if (skill) return { topicName, skillName: skill.name };
        }
        return { topicName: 'How Much Can You Carry?', skillName: 'Practice' };
    };

    const { topicName, skillName } = getTopicInfo();

    const generateComparingQuestions = () => {
        const questions = [];
        const pairs = [
            { h: { name: 'Elephant', emoji: '🐘', w: 1000 }, l: { name: 'Mouse', emoji: '🐭', w: 1 } },
            { h: { name: 'Watermelon', emoji: '🍉', w: 50 }, l: { name: 'Apple', emoji: '🍎', w: 5 } },
            { h: { name: 'School Bus', emoji: '🚌', w: 5000 }, l: { name: 'Bicycle', emoji: '🚲', w: 50 } },
            { h: { name: 'Brick', emoji: '🧱', w: 30 }, l: { name: 'Feather', emoji: '🪶', w: 1 } },
            { h: { name: 'Pumpkin', emoji: '🎃', w: 40 }, l: { name: 'Leaf', emoji: '🍃', w: 1 } },
            { h: { name: 'Big Stone', emoji: '🪨', w: 60 }, l: { name: 'Balloon', emoji: '🎈', w: 2 } }
        ];

        const shuffledPairs = [...pairs].sort(() => Math.random() - 0.5);

        for (let i = 0; i < totalQuestions; i++) {
            const pair = shuffledPairs[i % shuffledPairs.length];
            const askingHeavier = Math.random() > 0.5;

            const isReverse = Math.random() > 0.5;
            const objA = isReverse ? pair.l : pair.h;
            const objB = isReverse ? pair.h : pair.l;

            questions.push({
                text: askingHeavier ? `Which one is HEAVIER? ⚖️` : `Which one is LIGHTER? 🪶`,
                options: [objA.name, objB.name],
                correct: askingHeavier ? (objA.w > objB.w ? objA.name : objB.name) : (objA.w < objB.w ? objA.name : objB.name),
                type: 'compare',
                visualData: { objectA: objA, objectB: objB },
                explanation: `A ${pair.h.name} is much heavier than a ${pair.l.name}.`
            });
        }
        return questions;
    };

    const generateEstimatingQuestions = () => {
        const scenarios = [
            { obj: 'School Bag', heaviness: 'Heavy', hint: 'It has many books inside!' },
            { obj: 'Pencil Box', heaviness: 'Light', hint: 'It only holds pens and pencils.' },
            { obj: 'Water Bottle', heaviness: 'Heavy', hint: 'It is full of water!' },
            { obj: 'Tiffin', heaviness: 'Heavy', hint: 'Full of yummy food!' }
        ];

        const questions = [];
        for (let i = 0; i < totalQuestions; i++) {
            const scenario = scenarios[i % scenarios.length];
            questions.push({
                text: `Is a ${scenario.obj} usually HEAVY or LIGHT? 🎒`,
                options: ['Heavy', 'Light'],
                correct: scenario.heaviness,
                type: 'estimate',
                visualData: { objectType: scenario.obj },
                hint: scenario.hint,
                explanation: `A ${scenario.obj} often feels ${scenario.heaviness.toLowerCase()} because of what it holds.`
            });
        }
        return questions;
    };

    const generateQuestions = (selectedSkill) => {
        if (selectedSkill === '1007' || selectedSkill === '1008') return generateComparingQuestions();
        if (selectedSkill === '1009') return generateEstimatingQuestions();

        // MIXED For Test or Default
        const q1 = generateComparingQuestions().slice(0, 10);
        const q2 = generateEstimatingQuestions().slice(0, 5);
        return [...q1, ...q2].sort(() => 0.5 - Math.random()).slice(0, totalQuestions);
    };

    useEffect(() => {
        const init = async () => {
            const userId = user?.user_id || user?.id;
            if (!userId) return;
            const qs = generateQuestions(skillId);
            setSessionQuestions(qs);
            try {
                const parsedSkillId = parseInt(skillId) || 0;
                const session = await api.createPracticeSession(userId, parsedSkillId);
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

    const handleExit = async () => {
        try {
            if (sessionId) {
                await api.finishSession(sessionId);
            }
        } catch (e) {
            console.error("Error finishing session:", e);
        }
        navigate('/junior/grade/2');
    };

    const handleOptionSelect = (option) => {
        if (isAnswered) return;
        setSelectedOption(option);
    };

    const handleSubmit = () => {
        if (isAnswered || selectedOption === null) return;
        const option = selectedOption;

        setIsAnswered(true);
        const isCorrect = option === sessionQuestions[qIndex].correct;

        // Auto-log
        try {
            const uid = user?.user_id || user?.id || sessionStorage.getItem('userId') || localStorage.getItem('userId');
            const qData = sessionQuestions[qIndex] || {};
            const skId = typeof skillId !== 'undefined' ? skillId : '0';
            const currentTimer = typeof timer !== 'undefined' ? timer : 0;

            if (uid && sessionId) {
                api.recordAttempt({
                    user_id: parseInt(uid, 10),
                    session_id: sessionId,
                    skill_id: parseInt(skId, 10) || 0,
                    template_id: null,
                    difficulty_level: 'Medium',
                    question_text: String(qData.text || ''),
                    correct_answer: String(qData.correct || qData.correctAnswer || ''),
                    student_answer: String(option),
                    is_correct: isCorrect,
                    solution_text: String(qData.explanation || qData.solution || ''),
                    time_spent_seconds: currentTimer
                }).catch(err => console.error("Auto-log failed:", err));
            }
        } catch (err) {
            console.error("Auto-log error:", err);
        }

        if (isCorrect) {
            setScore(s => s + 1);
        }

        setAnswers(prev => ({
            ...prev,
            [qIndex]: {
                selectedOption: option,
                isCorrect,
                type: sessionQuestions[qIndex].type,
                visualData: sessionQuestions[qIndex].visualData,
                questionText: sessionQuestions[qIndex].text,
                correctAnswer: sessionQuestions[qIndex].correct,
                explanation: sessionQuestions[qIndex].explanation || "Here is the explanation."
            }
        }));

        if (!isTest && !isCorrect) {
            setShowExplanationModal(true);
        } else {
            setTimeout(() => {
                handleNext();
            }, 800);
        }
    };

    const handleSkip = () => {
        if (isAnswered) return;
        setAnswers(prev => ({
            ...prev,
            [qIndex]: {
                selectedOption: 'Skipped',
                isCorrect: false,
                type: sessionQuestions[qIndex].type,
                visualData: sessionQuestions[qIndex].visualData,
                questionText: sessionQuestions[qIndex].text,
                correctAnswer: sessionQuestions[qIndex].correct,
                explanation: "This question was skipped. " + sessionQuestions[qIndex].explanation
            }
        }));
        handleNext();
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
                        uid: user?.id || 'unknown',
                        category: 'Practice',
                        reportData: {
                            skill_id: skillId,
                            skill_name: skillName,
                            score: Math.round((score / totalQuestions) * 100),
                            total_questions: totalQuestions,
                            correct_answers: score,
                            time_spent: timer,
                            timestamp: new Date().toISOString(),
                            answers: Object.values(answers).filter(a => a !== undefined)
                        }
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
                        <StickerExit onClick={handleExit} />
                    </div>
                </header>

                <main className="results-content">
                    <div className="results-hero-section">
                        <img src={avatarImg} alt="Mascot" style={{ width: '120px', height: '120px', margin: '0 auto 20px' }} />
                        <h2 style={{ fontSize: '2.5rem', fontWeight: 400, color: '#31326F', fontFamily: 'Nunito, sans-serif' }}>Adventure Complete! 🎉</h2>

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
                                                            <DynamicVisual type={ans.type} data={ans.visualData} />
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
                        <button className="action-btn-large play-again-btn" onClick={() => window.location.reload()}>
                            <RefreshCw size={24} /> Start New Quest
                        </button>
                        <button className="action-btn-large back-topics-btn" onClick={() => navigate('/junior/grade/2')}>
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
                        <button className="g1-skip-btn" onClick={handleSkip} style={{ marginLeft: '15px' }}>
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
                    {currentQ.hint && (
                        <p style={{ color: '#9a3412', fontStyle: 'italic', marginBottom: '20px', textAlign: 'center', marginTop: '-10px' }}>💡 Hint: {currentQ.hint}</p>
                    )}

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
                                            ${selectedOption === opt.toString() || selectedOption === opt ? (isTest ? 'selected-test' : (isAnswered ? (opt === currentQ.correct ? 'selected-correct' : 'selected-wrong') : 'selected-test')) : ''}
                                            ${!isTest && isAnswered && opt === currentQ.correct ? 'revealed-correct' : ''}
                                        `}
                                        onClick={() => handleOptionSelect(opt)}
                                        disabled={isAnswered}
                                    >
                                        <LatexText text={opt.toString().charAt(0).toUpperCase() + opt.toString().slice(1)} />
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

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
                                    Next <ChevronRight size={24} />
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
                onNext={() => setShowExplanationModal(false)}
            />
        </div>
    );
};

export default Grade2HowMuchCanYouCarry;

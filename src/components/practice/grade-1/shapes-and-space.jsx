import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Home, ArrowRight, Timer, Trophy, Star, ChevronLeft, RefreshCw, FileText, Check, X, Eye, ChevronRight } from 'lucide-react';
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
    if (type === 'shape') {
        const { shape, color } = data;
        return (
            <motion.div
                initial={{ scale: 0.5, rotate: -10 }}
                animate={{ scale: 1, rotate: 0 }}
                className="g1-visual-item"
            >
                <svg width="100%" height="auto" style={{ maxWidth: '300px', maxHeight: '300px', filter: 'drop-shadow(0 10px 15px rgba(0,0,0,0.1))' }} viewBox="0 0 100 100">
                    {shape === 'circle' && <circle cx="50" cy="50" r="42" fill={color} />}
                    {shape === 'square' && <rect x="8" y="8" width="84" height="84" fill={color} />}
                    {shape === 'triangle' && <polygon points="50,5 95,90 5,90" fill={color} />}
                    {shape === 'rectangle' && <rect x="5" y="25" width="90" height="50" fill={color} />}
                </svg>
            </motion.div>
        );
    }
    if (type === 'position') {
        const { pos } = data;
        return (
            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="position-visual" style={{border: "none"}}>
                <svg width="100%" height="auto" style={{ maxWidth: '280px' }} viewBox="0 0 200 120">
                    <rect x="50" y="40" width="100" height="70" rx="10" fill="white" stroke="#CBD5E0" strokeWidth="4" />
                    <text x="100" y="85" textAnchor="middle" fill="#A0AEC0" fontSize="14" fontWeight="400">BOX</text>
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
                    <div style={{ marginTop: '15px', fontWeight: '400', color: '#4ECDC4', fontSize: '1.5rem' }}>A</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                    <motion.div
                        initial={{ height: 0 }} animate={{ height: bSize }}
                        style={{ width: 'clamp(40px, 15vw, 80px)', background: 'linear-gradient(to top, #FF6B6B, #FFADAD)', borderRadius: '15px 15px 0 0', border: '5px solid white', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}
                    />
                    <div style={{ marginTop: '15px', fontWeight: '400', color: '#FF6B6B', fontSize: '1.5rem' }}>B</div>
                </div>
            </div>
        );
    }
    return null;
};

const ShapesAndSpace = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const skillId = queryParams.get('skillId');
    const isTest = skillId === '104';
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

        for (let i = 0; i < totalQuestions; i++) {
            let question = {};

            // Skill Allocation Logic
            let typeToGen = 'shape';
            if (isTest) {
                if (i < 4) typeToGen = 'shape';
                else if (i < 7) typeToGen = 'position';
                else typeToGen = 'size';
            } else if (selectedSkill === '101' || !selectedSkill) {
                typeToGen = 'shape';
            } else if (selectedSkill === '102') {
                typeToGen = 'position';
            } else if (selectedSkill === '103') {
                typeToGen = 'size';
            }

            if (typeToGen === 'shape') {
                // Identifying shapes
                const shapes = ['circle', 'square', 'triangle', 'rectangle'];
                let target;
                if (isTest) {
                    target = shapes[i % shapes.length];
                } else {
                    target = shapes[Math.floor(Math.random() * shapes.length)];
                }
                const otherOptions = shapes.filter(s => s !== target);
                question = {
                    text: `What shape is this? 🔍`,
                    options: [target, ...otherOptions.sort(() => 0.5 - Math.random()).slice(0, 2)].sort(() => 0.5 - Math.random()),
                    correct: target,
                    type: 'shape',
                    visualData: { shape: target, color: colors[i % colors.length] },
                    explanation: `This object has the characteristics of a ${target.toUpperCase()}.`
                };
            } else if (typeToGen === 'position') {
                // Understanding positions
                const posTypes = [
                    { q: 'Where is the yellow ball? 🎾', a: 'top' },
                    { q: 'Is the ball inside or outside the box? 📦', a: 'inside' },
                    { q: 'Where is the ball located? 📍', a: 'bottom' },
                    { q: 'Where can you see the ball? 👀', a: 'outside' }
                ];
                let item;
                if (isTest) {
                    item = posTypes[(i - 4) % posTypes.length];
                } else {
                    item = posTypes[Math.floor(Math.random() * posTypes.length)];
                }
                question = {
                    text: item.q,
                    options: ['top', 'bottom', 'inside', 'outside'].sort(() => 0.5 - Math.random()),
                    correct: item.a,
                    type: 'position',
                    visualData: { pos: item.a },
                    explanation: `The ball is positioned at the ${item.a.toUpperCase()} in this visual representation.`
                };
            } else if (typeToGen === 'size') {
                // Comparing sizes
                const sizeQuestions = [
                    { q: 'Which bar is HIGHER?', a: 'A', aSize: 180, bSize: 80, exp: 'Bar A is taller than Bar B.' },
                    { q: 'Which one is SMALLER?', a: 'B', aSize: 160, bSize: 40, exp: 'Bar B has a smaller height than Bar A.' },
                    { q: 'Which bar is SHORTER?', a: 'B', aSize: 140, bSize: 70, exp: 'Bar B is not as long/tall as Bar A.' },
                    { q: 'Pick the LONGER one!', a: 'A', aSize: 170, bSize: 90, exp: 'Bar A extends further than Bar B.' }
                ];
                let item;
                if (isTest) {
                    item = sizeQuestions[(i - 7) % sizeQuestions.length];
                } else {
                    item = sizeQuestions[Math.floor(Math.random() * sizeQuestions.length)];
                }
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
            const userId = user?.user_id || user?.id;
            if (!userId) return;
            const qs = generateQuestions(skillId);
            setSessionQuestions(qs);
            try {
                const session = await api.createPracticeSession(userId, parseInt(skillId) || 101);
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
    };

    
    const handleSubmit = () => {
        if (isAnswered || selectedOption === null) return;
        const option = selectedOption;

        setIsAnswered(true);
        const isCorrect = option === sessionQuestions[qIndex].correct;
        // --- AUTO-INJECTED LOGGING ---
        try {
            const uid = user?.user_id || user?.id || sessionStorage.getItem('userId') || localStorage.getItem('userId');
            const qData = sessionQuestions[qIndex] || {};
            const skId = typeof selectedSkill !== 'undefined' ? selectedSkill : (typeof skillId !== 'undefined' ? skillId : '0');
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
        } catch(err) {
            console.error("Auto-log error:", err);
        }
        // -----------------------------

        if (isCorrect) {
            setScore(s => s + 1);
        }

        setAnswers(prev => ({
            ...prev,
            [qIndex]: {
                selectedOption: option,
                isCorrect,
                questionText: sessionQuestions[qIndex].text,
                correctAnswer: sessionQuestions[qIndex].correct,
                explanation: sessionQuestions[qIndex].explanation || "Here is the explanation."
            }
        }));
        
        // Auto advance if correct, or show modal if incorrect
        if (!isTest && !isCorrect) {
            setShowExplanationModal(true);
        } else {
            // Give a tiny delay so they see the option highlight green
            setTimeout(() => {
                handleNext();
            }, 800);
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
                        answers: Object.values(answers).filter(a => a !== undefined)
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
                                                        <span className="log-value">{typeof ans.selectedOption === 'string' ? ans.selectedOption.charAt(0).toUpperCase() + ans.selectedOption.slice(1) : ans.selectedOption}</span>
                                                    </div>
                                                    {!ans.isCorrect && (
                                                        <div className="log-answer-box correct-box">
                                                            <span className="log-label">Correct Answer</span>
                                                            <span className="log-value">{typeof ans.correctAnswer === 'string' ? ans.correctAnswer.charAt(0).toUpperCase() + ans.correctAnswer.slice(1) : ans.correctAnswer}</span>
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

                    <div style={{ fontWeight: 800, color: '#666', fontSize: '1rem', background: 'white', padding: '5px 12px', borderRadius: '15px', boxShadow: '0 4px 10px rgba(0,0,0,0.05)' }}>
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

                <div className="g1-progress-container" style={{ margin: '0 0 10px 0' }}>
                    <div className="g1-progress-fill" style={{ width: `${((qIndex + 1) / totalQuestions) * 100}%` }}></div>
                </div>
                <div className="g1-topic-header-compact" style={{ textAlign: 'center', margin: '5px 0', fontSize: '0.8rem', color: '#64748B', textTransform: 'uppercase', letterSpacing: '2px', fontWeight: 400 }}>{topicName}</div>
                <motion.div key={qIndex} initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="g1-question-card">
                    <h2 className="g1-question-text"><LatexText text={currentQ.text} /></h2>

                    <div className="g1-content-split">
                        <div className="g1-visual-area" style={{border: "none", background: "transparent"}}>
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
                                        <LatexText text={opt.charAt(0).toUpperCase() + opt.slice(1)} />
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
                correctAnswer={typeof currentQ.correct === 'string' ? currentQ.correct.charAt(0).toUpperCase() + currentQ.correct.slice(1) : currentQ.correct}
                explanation={currentQ.explanation}
                onClose={() => setShowExplanationModal(false)}
                onNext={() => setShowExplanationModal(false)}
            />
        </div>
    );
};

export default ShapesAndSpace;

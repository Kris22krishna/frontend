import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Timer, Star, ChevronLeft, RefreshCw, FileText, Check, X, Eye, ChevronRight, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../../../../contexts/AuthContext';
import { api } from '../../../../services/api';
import Navbar from '../../../Navbar';
import { TOPIC_CONFIGS } from '../../../../lib/topicConfig';
import { LatexText } from '../../../LatexText';
import ExplanationModal from '../../../ExplanationModal';
import StickerExit from '../../../StickerExit';
import avatarImg from '../../../../assets/avatar.png';
import '../../../../pages/juniors/class-1/Grade1Practice.css';

// ─── Visual Components ───
const MeasurementVisual = ({ type, data }) => {
    if (type === 'measure') {
        const { object, unit, count } = data;
        const unitEmoji = unit === 'Fingers' ? '☝️' : (unit === 'Handspans' ? '✋' : '👣');
        return (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '30px', padding: '40px', background: 'white', borderRadius: '35px', border: '3px solid #EDF2F7', width: '100%', minHeight: '300px' }}>
                <div style={{ fontSize: '100px', marginBottom: '10px' }}>{object.emoji}</div>
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center', background: '#F8FAFC', padding: '15px', borderRadius: '20px', border: '2px dashed #CBD5E0' }}>
                    {Array.from({ length: count }).map((_, i) => (
                        <motion.span key={i} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: i * 0.1 }} style={{ fontSize: '30px' }}>
                            {unitEmoji}
                        </motion.span>
                    ))}
                </div>
                <div style={{ fontWeight: 800, color: '#4A5568', fontSize: '1.2rem' }}>{object.name}</div>
            </div>
        );
    }
    if (type === 'compare') {
        const { path1, path2 } = data;
        return (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '100%', padding: '30px', background: '#F0FDFA', borderRadius: '30px', border: '2px solid #CCFBF1' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px', background: 'white', padding: '20px', borderRadius: '20px', boxShadow: '0 4px 10px rgba(0,0,0,0.05)' }}>
                    <span style={{ fontSize: '2rem' }}>{path1.emoji}</span>
                    <div style={{ flex: 1, height: '10px', background: '#E2E8F0', borderRadius: '10px', overflow: 'hidden' }}>
                        <div style={{ width: `${(path1.steps / 15) * 100}%`, height: '100%', background: '#4ECDC4' }} />
                    </div>
                    <span style={{ fontWeight: 800, color: '#31326F' }}>{path1.steps} steps</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px', background: 'white', padding: '20px', borderRadius: '20px', boxShadow: '0 4px 10px rgba(0,0,0,0.05)' }}>
                    <span style={{ fontSize: '2rem' }}>{path2.emoji}</span>
                    <div style={{ flex: 1, height: '10px', background: '#E2E8F0', borderRadius: '10px', overflow: 'hidden' }}>
                        <div style={{ width: `${(path2.steps / 15) * 100}%`, height: '100%', background: '#FF6B6B' }} />
                    </div>
                    <span style={{ fontWeight: 800, color: '#31326F' }}>{path2.steps} steps</span>
                </div>
            </div>
        );
    }
    if (type === 'estimate') {
        return (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px', padding: '40px', background: '#f8fafc', borderRadius: '35px', border: '3px solid #e2e8f0', width: '100%' }}>
                <div style={{ fontSize: '120px' }}>{data.emoji}</div>
                <div style={{ fontSize: '2rem', fontWeight: 800, color: '#334155' }}>{data.name}</div>
            </div>
        );
    }
    return null;
};

const DynamicVisual = ({ type, data }) => {
    return <MeasurementVisual type={type} data={data} />;
};

class ErrorBoundary extends React.Component {
    constructor(props) { super(props); this.state = { hasError: false }; }
    static getDerivedStateFromError(error) { return { hasError: true }; }
    render() {
        if (this.state.hasError) return <div style={{ padding: '20px', textAlign: 'center' }}><h2>Something went wrong.</h2><button onClick={() => window.location.reload()}>Reload</button></div>;
        return this.props.children;
    }
}

const Grade2TheLongestStep = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const queryParams = new URLSearchParams(location.search);
    const skillId = queryParams.get('skillId');
    const isTest = skillId ? (skillId.includes('TEST') || skillId.startsWith('11')) : false;
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
    const [isAutoAdvancing, setIsAutoAdvancing] = useState(false);

    const getTopicInfo = () => {
        const grade2Config = TOPIC_CONFIGS['2'];
        for (const [topicName, skills] of Object.entries(grade2Config)) {
            const skill = skills.find(s => s.id === skillId);
            if (skill) return { topicName, skillName: skill.name };
        }
        return { topicName: 'The Longest Step', skillName: 'Measurement' };
    };

    const { topicName, skillName } = getTopicInfo();
    const getNextSkill = () => {
        const grade2Config = TOPIC_CONFIGS['2'];
        if (!grade2Config) return null;

        const topics = Object.keys(grade2Config);
        let currentTopicIdx = -1;
        let currentSkillIdx = -1;

        for (let i = 0; i < topics.length; i++) {
            const skills = grade2Config[topics[i]];
            const idx = skills.findIndex(s => s.id === skillId);
            if (idx !== -1) {
                currentTopicIdx = i;
                currentSkillIdx = idx;
                break;
            }
        }

        if (currentTopicIdx === -1) return null;

        const currentTopicSkills = grade2Config[topics[currentTopicIdx]];

        if (currentSkillIdx < currentTopicSkills.length - 1) {
            return {
                ...currentTopicSkills[currentSkillIdx + 1],
                topic: topics[currentTopicIdx]
            };
        }

        if (currentTopicIdx < topics.length - 1) {
            const nextTopicSkills = grade2Config[topics[currentTopicIdx + 1]];
            if (nextTopicSkills.length > 0) {
                return {
                    ...nextTopicSkills[0],
                    topic: topics[currentTopicIdx + 1]
                };
            }
        }

        return null;
    };

    const generateMeasurementQS = () => {
        const objects = [
            { name: 'Pencil', emoji: '✏️', units: ['Fingers'], avg: 8 },
            { name: 'Table', emoji: '📑', units: ['Handspans'], avg: 6 },
            { name: 'Blackboard', emoji: '🏫', units: ['Handspans'], avg: 12 },
            { name: 'Room Width', emoji: '🏠', units: ['Steps'], avg: 10 },
            { name: 'Bat', emoji: '🏏', units: ['Handspans'], avg: 5 }
        ];
        const qs = [];
        for (let i = 0; i < totalQuestions; i++) {
            const obj = objects[i % objects.length];
            const unit = obj.units[0];
            const count = Math.floor(Math.random() * 5) + (obj.avg - 2);
            qs.push({
                text: `Count the units shown. How many ${unit.toLowerCase()} long is the ${obj.name.toLowerCase()}?`,
                options: [String(count), String(count + 2), String(count - 1), String(count + 5)].sort(() => 0.5 - Math.random()),
                correct: String(count),
                type: 'measure',
                visualData: { object: obj, unit, count },
                explanation: `Count the icons! There are exactly ${count} ${unit.toLowerCase()} shown.`
            });
        }
        return qs;
    };

    const generateEstimationQS = () => {
        const items = [
            { name: 'Eraser', emoji: '🧽', unit: 'Fingers' },
            { name: 'Mathematics Book', emoji: '📚', unit: 'Handspans' },
            { name: 'Cricket Pitch', emoji: '🏟️', unit: 'Steps' },
            { name: 'Sharpener', emoji: '📎', unit: 'Fingers' },
            { name: 'Mobile Phone', emoji: '📱', unit: 'Handspans' }
        ];
        const qs = [];
        for (let i = 0; i < totalQuestions; i++) {
            const item = items[i % items.length];
            qs.push({
                text: `Which unit is best to measure the length of a ${item.name.toLowerCase()}?`,
                options: ['Fingers', 'Handspans', 'Steps', 'Arm lengths'].sort(() => 0.5 - Math.random()),
                correct: item.unit,
                type: 'estimate',
                visualData: { emoji: item.emoji, name: item.name },
                explanation: `A ${item.name.toLowerCase()} is small enough to be measured comfortably with ${item.unit.toLowerCase()}.`
            });
        }
        return qs;
    };

    const generateComparisonQS = () => {
        const pairs = [
            { o1: { name: 'Home to School', emoji: '🏫', steps: 12 }, o2: { name: 'Home to Park', emoji: '🌳', steps: 8 } },
            { o1: { name: 'Table', emoji: '🪑', steps: 6 }, o2: { name: 'Bed', emoji: '🛌', steps: 10 } },
            { o1: { name: 'Cat to Milk', emoji: '🐈', steps: 4 }, o2: { name: 'Dog to Bone', emoji: '🐕', steps: 7 } }
        ];
        const qs = [];
        for (let i = 0; i < totalQuestions; i++) {
            const pair = pairs[i % pairs.length];
            const longer = pair.o1.steps > pair.o2.steps ? pair.o1 : pair.o2;
            qs.push({
                text: `Which distance is longer?`,
                options: [pair.o1.name, pair.o2.name],
                correct: longer.name,
                type: 'compare',
                visualData: { path1: pair.o1, path2: pair.o2 },
                explanation: `${longer.name} takes ${longer.steps} steps, while the other takes only ${pair.o1 === longer ? pair.o2.steps : pair.o1.steps} steps.`
            });
        }
        return qs;
    };

    const generateQuestions = (sid) => {
        if (sid === '1037') return generateMeasurementQS();
        if (sid === '1038') return generateEstimationQS();
        if (sid === '1039') return generateComparisonQS();

        const pool = [
            ...generateMeasurementQS().slice(0, 4),
            ...generateEstimationQS().slice(0, 3),
            ...generateComparisonQS().slice(0, 3)
        ].sort(() => 0.5 - Math.random());
        return pool.slice(0, totalQuestions);
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
        if (!showResults && sessionQuestions.length > 0) interval = setInterval(() => setTimer(v => v + 1), 1000);
        return () => clearInterval(interval);
    }, [showResults, sessionQuestions]);

    useEffect(() => {
        if (answers[qIndex]) { setSelectedOption(answers[qIndex].selectedOption); setIsAnswered(true); } else { setSelectedOption(null); setIsAnswered(false); }
    }, [qIndex, answers]);

    const handleExit = async () => {
        try { if (sessionId) await api.finishSession(sessionId); } catch (e) { console.error(e); }
        navigate('/junior/grade/2');
    };

    const handleOptionSelect = (option) => { if (!isAnswered) setSelectedOption(option); };

    const handleSubmit = () => {
        if (isAnswered || selectedOption === null) return;
        setIsAnswered(true);
        const isCorrect = selectedOption === sessionQuestions[qIndex].correct;
        if (isCorrect) setScore(s => s + 1);
        setAnswers(prev => ({ ...prev, [qIndex]: { selectedOption, isCorrect, type: sessionQuestions[qIndex].type, visualData: sessionQuestions[qIndex].visualData, questionText: sessionQuestions[qIndex].text, correctAnswer: sessionQuestions[qIndex].correct, explanation: sessionQuestions[qIndex].explanation } }));
        if (!isTest && !isCorrect) setShowExplanationModal(true);
        else { setIsAutoAdvancing(true); setTimeout(() => { handleNext(); setIsAutoAdvancing(false); }, 800); }
    };

    const handleNext = async () => {
        if (qIndex < totalQuestions - 1) setQIndex(v => v + 1);
        else {
            setShowResults(true);
            try {
                if (sessionId) {
                    await api.finishSession(sessionId);
                    await api.createReport({ uid: user?.id || 'unknown', category: 'Practice', reportData: { skill_id: skillId, skill_name: skillName, score: Math.round((score / totalQuestions) * 100), total_questions: totalQuestions, correct_answers: score, time_spent: timer, timestamp: new Date().toISOString(), answers: Object.values(answers) } });
                }
            } catch (e) { console.error(e); }
        }
    };

    const formatTime = (s) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`;

    if (sessionQuestions.length === 0) return <div className="grade1-practice-page"><div className="g1-loading-blob" /></div>;

    if (showResults) {
        const percentage = Math.round((score / totalQuestions) * 100);
        return (
            <div className="grade1-practice-page results-view overflow-y-auto">
                <Navbar />
                <header className="results-header">
                    <h1 className="results-title">Adventure Report</h1>
                    <div className="exit-container"><StickerExit onClick={handleExit} /></div>
                </header>
                <main className="results-content">
                    <div className="results-hero-section">
                        <img src={avatarImg} alt="Mascot" style={{ width: '120px', height: '120px', margin: '0 auto 20px' }} />
                        <h2 style={{ fontSize: '2.5rem', fontWeight: 400, color: '#31326F', fontFamily: 'Nunito, sans-serif' }}>Quest Mastered! 🌟</h2>
                        <div className="stars-container" style={{ margin: '20px 0' }}>
                            {[1, 2, 3].map(i => <Star key={i} size={60} fill={percentage >= (i * 33) ? "#FFD700" : "#EDF2F7"} color={percentage >= (i * 33) ? "#F6AD55" : "#CBD5E0"} />)}
                        </div>
                        <div className="results-stats-grid">
                            <div className="stat-card"><span className="stat-label">Correct</span><span className="stat-value-large">{score}/{totalQuestions}</span></div>
                            <div className="stat-card"><span className="stat-label">Time</span><span className="stat-value-large">{formatTime(timer)}</span></div>
                            <div className="stat-card"><span className="stat-label">Accuracy</span><span className="stat-value-large">{percentage}%</span></div>
                            <div className="stat-card"><span className="stat-label">Score</span><span className="stat-value-large">{score * 10}</span></div>
                        </div>
                    </div>
                    {isTest && (
                        <div className="detailed-breakdown">
                            <h3 className="breakdown-title">Measurement Log 📜</h3>
                            <div className="quest-log-list">
                                {sessionQuestions.map((q, idx) => {
                                    const ans = answers[idx];
                                    if (!ans) return null;
                                    return (
                                        <div key={idx} className="quest-log-item">
                                            <div className={`log-number ${!ans.isCorrect ? 'wrong' : ''}`}>{idx + 1}</div>
                                            <div className="log-content">
                                                <div className="log-question"><LatexText text={ans.questionText} /><div style={{ marginTop: '10px', display: 'flex', justifyContent: 'center' }}><DynamicVisual type={ans.type} data={ans.visualData} /></div></div>
                                                <div className="log-answers">
                                                    <div className={`log-answer-box ${ans.isCorrect ? 'correct-box' : 'wrong-box'}`}><span className="log-label">Your Guess</span><span className="log-value">{ans.selectedOption}</span></div>
                                                    {!ans.isCorrect && <div className="log-answer-box correct-box"><span className="log-label">True Measure</span><span className="log-value">{ans.correctAnswer}</span></div>}
                                                </div>
                                                <div className="log-explanation"><span className="log-label" style={{ color: '#4C51BF' }}>Wait, why? 💡</span><LatexText text={ans.explanation} /></div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                    <div className="results-actions">
                        <button className="action-btn-large play-again-btn" onClick={() => window.location.reload()}>
                            <RefreshCw size={24} /> Retake Test
                        </button>

                        {getNextSkill() && (
                            <button className="action-btn-large next-skill-btn" onClick={() => {
                                const next = getNextSkill();
                                navigate(`/junior/grade/2/${next.route}?skillId=${next.id}`);
                                window.location.reload();
                            }}>
                                Next Skill <ArrowRight size={24} />
                            </button>
                        )}

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
            <div className="g1-bg-blobs"><div className="blob blob-1"></div><div className="blob blob-2"></div><div className="blob blob-3"></div></div>
            <div className="g1-practice-container">
                <div className="g1-header-nav">
                    <div className="g1-timer-badge"><Timer size={18} />{formatTime(timer)}</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px', flex: 1, minWidth: 0 }}>
                        <span style={{ fontWeight: 400, color: '#666', fontSize: '1rem', background: 'white', padding: '8px 15px', borderRadius: '15px', boxShadow: '0 4px 10px rgba(0,0,0,0.05)', whiteSpace: 'nowrap' }}>Q {qIndex + 1}/{totalQuestions}</span>
                        <span style={{ fontWeight: 400, color: '#2D3436', fontSize: '1rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}><LatexText text={skillName} /></span>
                    </div>
                    <div className="exit-practice-sticker" style={{ marginLeft: 'auto' }}><StickerExit onClick={handleExit} /></div>
                </div>
                <div className="g1-progress-container" style={{ margin: '0 0 10px 0' }}><div className="g1-progress-fill" style={{ width: `${((qIndex + 1) / totalQuestions) * 100}%` }}></div></div>
                <div className="g1-topic-header-compact" style={{ textAlign: 'center', margin: '5px 0', fontSize: '0.8rem', color: '#64748B', textTransform: 'uppercase', letterSpacing: '2px', fontWeight: 400 }}>{topicName}</div>
                <motion.div key={qIndex} initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="g1-question-card">
                    <h2 className="g1-question-text"><LatexText text={currentQ.text} /></h2>
                    <div className="g1-content-split">
                        <div className="g1-visual-area"><DynamicVisual type={currentQ.type} data={currentQ.visualData} /></div>
                        <div className="g1-quiz-side">
                            <div className="g1-options-grid">
                                {currentQ.options.map((opt, i) => (
                                    <button key={i} className={`g1-option-btn ${selectedOption === opt ? (isTest ? 'selected-test' : (isAnswered ? (opt === currentQ.correct ? 'selected-correct' : 'selected-wrong') : 'selected-test')) : ''} ${!isTest && isAnswered && opt === currentQ.correct ? 'revealed-correct' : ''}`} onClick={() => handleOptionSelect(opt)} disabled={isAnswered}><LatexText text={opt} /></button>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="g1-navigation-footer">
                        <button className="g1-nav-btn prev-btn" onClick={() => { if (qIndex > 0) setQIndex(qIndex - 1); }} disabled={qIndex === 0}><ChevronLeft size={24} /> Prev</button>
                        <div>
                            {isAnswered && !isTest && !answers[qIndex]?.isCorrect && <button className="g1-nav-btn steps-btn" onClick={() => setShowExplanationModal(true)}><Eye size={24} /> Steps</button>}
                            {!isAnswered ? <button className="g1-nav-btn submit-btn" onClick={handleSubmit} disabled={selectedOption === null}>Check Answer <ChevronRight size={24} /></button> : <button className="g1-nav-btn next-btn" onClick={handleNext} disabled={isAutoAdvancing}>{qIndex === totalQuestions - 1 ? (isTest ? 'Finish Test' : 'Finish') : 'Next Question'} <ChevronRight size={24} /></button>}
                        </div>
                    </div>
                </motion.div>
            </div>
            <ExplanationModal isOpen={showExplanationModal} isCorrect={answers[qIndex]?.isCorrect} correctAnswer={currentQ.correct} explanation={currentQ.explanation} onClose={() => setShowExplanationModal(false)} onNext={() => setShowExplanationModal(false)} />
        </div>
    );
};

const Grade2TheLongestStepWithBoundary = () => <ErrorBoundary><Grade2TheLongestStep /></ErrorBoundary>;
export default Grade2TheLongestStepWithBoundary;

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
const TensOnesVisual = ({ num, isAnswered }) => {
    const hundreds = Math.floor(num / 100);
    const tens = Math.floor((num % 100) / 10);
    const ones = num % 10;
    
    return (
        <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="g2-place-value-table-container" style={{ width: '100%', maxWidth: '500px', margin: '0 auto' }}>
            <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(3, 1fr)', 
                gap: '2px', 
                background: '#CBD5E1', 
                border: '3px solid #CBD5E1', 
                borderRadius: '24px',
                overflow: 'hidden',
                boxShadow: '0 12px 30px rgba(0,0,0,0.1)'
            }}>
                {/* Header Row */}
                <div style={{ background: '#F1F5F9', padding: '14px', textAlign: 'center', borderBottom: '2px solid #CBD5E1' }}>
                    <div style={{ fontSize: '0.9rem', fontWeight: 900, color: '#64748B', textTransform: 'uppercase', letterSpacing: '1.2px' }}>Hundreds</div>
                </div>
                <div style={{ background: '#F1F5F9', padding: '14px', textAlign: 'center', borderBottom: '2px solid #CBD5E1', borderLeft: '2px solid #CBD5E1', borderRight: '2px solid #CBD5E1' }}>
                    <div style={{ fontSize: '0.9rem', fontWeight: 900, color: '#0891B2', textTransform: 'uppercase', letterSpacing: '1.2px' }}>Tens</div>
                </div>
                <div style={{ background: '#F1F5F9', padding: '14px', textAlign: 'center', borderBottom: '2px solid #CBD5E1' }}>
                    <div style={{ fontSize: '0.9rem', fontWeight: 900, color: '#EC4899', textTransform: 'uppercase', letterSpacing: '1.2px' }}>Ones</div>
                </div>

                {/* Content Row */}
                <div style={{ background: 'white', padding: '25px 12px', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '140px' }}>
                    {hundreds > 0 ? (
                        <div style={{ fontSize: '2.8rem', fontWeight: 900, color: '#CBD5E1' }}>{hundreds}</div>
                    ) : (
                        <div style={{ width: '50px', height: '50px', borderRadius: '50%', border: '2.5px dashed #E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#E2E8F0', fontWeight: 900 }}>0</div>
                    )}
                </div>
                <div style={{ background: 'white', padding: '25px 12px', display: 'flex', flexWrap: 'wrap', gap: '5px', justifyContent: 'center', alignItems: 'flex-end', minHeight: '140px', borderLeft: '2px solid #F1F5F9', borderRight: '2px solid #F1F5F9' }}>
                    {tens > 0 ? Array.from({ length: tens }).map((_, i) => (
                        <motion.div
                            key={i}
                            initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: i * 0.05 }}
                            style={{ display: 'flex', flexDirection: 'column-reverse', gap: '1.5px', padding: '3px', border: '2px solid #0891B2', borderRadius: '6px', background: '#ECFEFF' }}
                        >
                            {Array.from({ length: 10 }).map((_, j) => (
                                <div key={j} style={{ width: '12px', height: '10px', backgroundColor: '#0891B2', borderRadius: '1.5px' }}></div>
                            ))}
                        </motion.div>
                    )) : (
                        <div style={{ width: '50px', height: '50px', borderRadius: '50%', border: '2.5px dashed #E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#E2E8F0', fontWeight: 900 }}>0</div>
                    )}
                </div>
                <div style={{ background: 'white', padding: '25px 12px', display: 'flex', flexWrap: 'wrap', gap: '4px', justifyContent: 'center', alignItems: 'center', minHeight: '140px' }}>
                    {ones > 0 ? (
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 16px)', gap: '6px' }}>
                            {Array.from({ length: ones }).map((_, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: (tens * 0.05) + (i * 0.05) }}
                                    style={{ width: '16px', height: '16px', backgroundColor: '#EC4899', borderRadius: '4px', border: '1.5px solid #BE185D' }}
                                />
                            ))}
                        </div>
                    ) : (
                        <div style={{ width: '50px', height: '50px', borderRadius: '50%', border: '2.5px dashed #E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#E2E8F0', fontWeight: 900 }}>0</div>
                    )}
                </div>
            </div>
            
            <AnimatePresence>
                {isAnswered && (
                    <motion.div 
                        initial={{ y: 10, opacity: 0 }} 
                        animate={{ y: 0, opacity: 1 }}
                        style={{ marginTop: '24px', textAlign: 'center' }}
                    >
                        <div style={{ display: 'inline-flex', gap: '15px', padding: '12px 30px', background: 'white', borderRadius: '100px', boxShadow: '0 6px 20px rgba(0,0,0,0.06)', border: '1px solid #F1F5F9', alignItems: 'center' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <span style={{ fontSize: '1.6rem', fontWeight: 900, color: '#0891B2' }}>{tens}</span>
                                <span style={{ fontSize: '1rem', fontWeight: 800, color: '#64748B' }}>Tens</span>
                            </div>
                            <div style={{ width: '2px', height: '24px', background: '#F1F5F9' }}></div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <span style={{ fontSize: '1.6rem', fontWeight: 900, color: '#EC4899' }}>{ones}</span>
                                <span style={{ fontSize: '1rem', fontWeight: 800, color: '#64748B' }}>Ones</span>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

const DynamicVisual = ({ type, data, isAnswered }) => {
    if (type === 'tens-ones') return <TensOnesVisual num={data.num} isAnswered={isAnswered} />;
    if (type === 'expanded-form') {
        return (
            <div style={{ fontSize: '3.5rem', fontWeight: 900, color: '#2D3436', padding: '40px', background: 'white', borderRadius: '30px', border: '3px solid #EDF2F7', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', width: '100%', textAlign: 'center' }}>
                <LatexText text={data.text} />
            </div>
        );
    }
    return null;
};

class ErrorBoundary extends React.Component {
    constructor(props) { super(props); this.state = { hasError: false }; }
    static getDerivedStateFromError(error) { return { hasError: true }; }
    render() {
        if (this.state.hasError) return <div style={{ padding: '20px', textAlign: 'center' }}><h2>Something went wrong.</h2><button onClick={() => window.location.reload()}>Reload</button></div>;
        return this.props.children;
    }
}

const Grade2TensAndOnes = () => {
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
        return { topicName: 'Tens and Ones', skillName: 'Practice' };
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

    const generateTensOnesQuestions = () => {
        const qs = [];
        for (let i = 0; i < totalQuestions; i++) {
            const num = Math.floor(Math.random() * 90) + 10;
            const t = Math.floor(num / 10), o = num % 10;
            qs.push({ 
                text: `Look at the table. How many Tens and Ones are there in total? 🧐`, 
                options: [`${t} Tens, ${o} Ones`, `${o} Tens, ${t} Tens`, `${t} Tens, 0 Ones`, `10 Tens, ${num} Ones`].sort(() => 0.5 - Math.random()), 
                correct: `${t} Tens, ${o} Ones`, 
                type: 'tens-ones', 
                visualData: { num }, 
                explanation: `${num} is made of ${t} groups of ten and ${o} single ones.` 
            });
        }
        return qs;
    };

    const generateExpandedFormQuestions = () => {
        const qs = [];
        for (let i = 0; i < totalQuestions; i++) {
            const num = Math.floor(Math.random() * 90) + 10;
            const t = Math.floor(num / 10) * 10, o = num % 10;
            qs.push({ 
                text: `Look at the blocks. Can you write this number in expanded form? 📝`, 
                options: [`${t} + ${o}`, `${num} + 10`, `${t}0 + ${o}`, `${t} + ${o}0`].sort(() => 0.5 - Math.random()), 
                correct: `${t} + ${o}`, 
                type: 'tens-ones', 
                visualData: { num }, 
                explanation: `${num} = ${t} + ${o}.` 
            });
        }
        return qs;
    };

    const generateComparisonQuestions = () => {
        const qs = [];
        for (let i = 0; i < totalQuestions; i++) {
            const n1 = Math.floor(Math.random() * 90) + 10;
            let n2 = Math.floor(Math.random() * 90) + 10;
            while (n1 === n2) n2 = Math.floor(Math.random() * 90) + 10;
            const bigger = Math.max(n1, n2);
            qs.push({ text: `Which number is GREATER?`, options: [String(n1), String(n2)].sort(() => 0.5 - Math.random()), correct: String(bigger), type: 'expanded-form', visualData: { text: `${n1} VS ${n2}` }, explanation: `${bigger} is greater than ${Math.min(n1, n2)}.` });
        }
        return qs;
    };

    const generateQuestions = (selectedSkill) => {
        if (selectedSkill === '1022') return generateTensOnesQuestions();
        if (selectedSkill === '1023') return generateExpandedFormQuestions();
        if (selectedSkill === '1024') return generateComparisonQuestions();
        const pool = [...generateTensOnesQuestions().slice(0, 4), ...generateExpandedFormQuestions().slice(0, 3), ...generateComparisonQuestions().slice(0, 3)].sort(() => 0.5 - Math.random());
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
                        <h2 style={{ fontSize: '2.5rem', fontWeight: 400, color: '#31326F', fontFamily: 'Nunito, sans-serif' }}>Adventure Complete! 🎉</h2>
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
                            <h3 className="breakdown-title">Quest Log 📜</h3>
                            <div className="quest-log-list">
                                {sessionQuestions.map((q, idx) => {
                                    const ans = answers[idx];
                                    if (!ans) return null;
                                    return (
                                        <div key={idx} className="quest-log-item">
                                            <div className={`log-number ${!ans.isCorrect ? 'wrong' : ''}`}>{idx + 1}</div>
                                            <div className="log-content">
                                                <div className="log-question"><LatexText text={ans.questionText} /><div style={{ marginTop: '10px', display: 'flex', justifyContent: 'center' }}><DynamicVisual type={ans.type} data={ans.visualData} isAnswered={true} /></div></div>
                                                <div className="log-answers">
                                                    <div className={`log-answer-box ${ans.isCorrect ? 'correct-box' : 'wrong-box'}`}><span className="log-label">Your Answer</span><span className="log-value">{ans.selectedOption}</span></div>
                                                    {!ans.isCorrect && <div className="log-answer-box correct-box"><span className="log-label">Correct Answer</span><span className="log-value">{ans.correctAnswer}</span></div>}
                                                </div>
                                                <div className="log-explanation"><span className="log-label" style={{ color: '#4C51BF' }}>Explain? 💡</span><LatexText text={ans.explanation} /></div>
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
                        <div className="g1-visual-area"><DynamicVisual type={currentQ.type} data={currentQ.visualData} isAnswered={isAnswered} /></div>
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

const Grade2TensAndOnesWithBoundary = () => <ErrorBoundary><Grade2TensAndOnes /></ErrorBoundary>;
export default Grade2TensAndOnesWithBoundary;

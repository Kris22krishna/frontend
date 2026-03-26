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

// ─── Analog Clock SVG ───
const AnalogClock = ({ hour, minute, size = 180 }) => {
    const cx = size / 2, cy = size / 2, r = size / 2 - 10;
    const hourAngle = ((hour % 12) + minute / 60) * 30 - 90;
    const minuteAngle = minute * 6 - 90;
    const hourLen = r * 0.5;
    const minLen = r * 0.72;
    const toRad = (deg) => (deg * Math.PI) / 180;
    const hourX = cx + hourLen * Math.cos(toRad(hourAngle));
    const hourY = cy + hourLen * Math.sin(toRad(hourAngle));
    const minX = cx + minLen * Math.cos(toRad(minuteAngle));
    const minY = cy + minLen * Math.sin(toRad(minuteAngle));

    return (
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
            <circle cx={cx} cy={cy} r={r} fill="#FFFBEB" stroke="#F59E0B" strokeWidth="4" />
            <circle cx={cx} cy={cy} r={r - 4} fill="none" stroke="#FEF3C7" strokeWidth="2" />
            {Array.from({ length: 12 }).map((_, i) => {
                const angle = (i * 30 - 90) * Math.PI / 180;
                const tickOuter = r - 6, tickInner = r - 16, numR = r - 26;
                return (
                    <g key={i}>
                        <line x1={cx + tickInner * Math.cos(angle)} y1={cy + tickInner * Math.sin(angle)} x2={cx + tickOuter * Math.cos(angle)} y2={cy + tickOuter * Math.sin(angle)} stroke="#92400E" strokeWidth="3" strokeLinecap="round" />
                        <text x={cx + numR * Math.cos(angle)} y={cy + numR * Math.sin(angle)} textAnchor="middle" dominantBaseline="central" fill="#78350F" fontSize={size > 150 ? "14" : "11"} fontWeight="800">{i === 0 ? 12 : i}</text>
                    </g>
                );
            })}
            <line x1={cx} y1={cy} x2={hourX} y2={hourY} stroke="#1E293B" strokeWidth="5" strokeLinecap="round" />
            <line x1={cx} y1={cy} x2={minX} y2={minY} stroke="#3B82F6" strokeWidth="3" strokeLinecap="round" />
            <circle cx={cx} cy={cy} r="5" fill="#EF4444" />
        </svg>
    );
};

const DAYS_OF_WEEK = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const MONTHS_OF_YEAR = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const DynamicVisual = ({ type, data }) => {
    if (type === 'read-clock') {
        return (
            <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px', padding: '25px', background: '#fffbeb', borderRadius: '30px', border: '3px solid #fbbf24' }}>
                <AnalogClock hour={data.hour} minute={data.minute} />
                <div style={{ padding: '10px 20px', background: 'white', borderRadius: '15px', fontWeight: 800, color: '#92400E', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>Clock Reading</div>
            </motion.div>
        );
    }
    if (type === 'calendar-card') {
        return (
            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} style={{ padding: '40px', background: data.color || '#DBEAFE', borderRadius: '30px', textAlign: 'center', minWidth: '220px', border: '4px solid white', boxShadow: '0 15px 35px rgba(0,0,0,0.1)' }}>
                <div style={{ fontSize: '1.2rem', textTransform: 'uppercase', letterSpacing: '2px', color: '#1E40AF', marginBottom: '10px', fontWeight: 700 }}>{data.label}</div>
                <div style={{ fontSize: '3.5rem', fontWeight: 900, color: '#1E3A8A' }}>{data.value}</div>
            </motion.div>
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

const Grade2MyFunday = () => {
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
        return { topicName: 'My Funday', skillName: 'Practice' };
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

    const generateDayQuestions = () => {
        const qs = [];
        for (let i = 0; i < totalQuestions; i++) {
            const di = Math.floor(Math.random() * 7);
            const day = DAYS_OF_WEEK[di];
            const type = Math.floor(Math.random() * 3);
            if (type === 0) {
                const next = DAYS_OF_WEEK[(di + 1) % 7];
                qs.push({ text: `Which day comes after ${day}?`, options: DAYS_OF_WEEK.slice().sort(() => 0.5 - Math.random()).slice(0, 4), correct: next, type: 'calendar-card', visualData: { label: 'Today', value: day, color: '#FEF3C7' }, explanation: `The day after ${day} is ${next}.` });
            } else if (type === 1) {
                const prev = DAYS_OF_WEEK[(di + 6) % 7];
                qs.push({ text: `Which day comes before ${day}?`, options: DAYS_OF_WEEK.slice().sort(() => 0.5 - Math.random()).slice(0, 4), correct: prev, type: 'calendar-card', visualData: { label: 'Today', value: day, color: '#D1FAE5' }, explanation: `The day before ${day} is ${prev}.` });
            } else {
                const targetDi = Math.floor(Math.random() * 7);
                const ordinals = ["first", "second", "third", "fourth", "fifth", "sixth", "seventh"];
                qs.push({ text: `Which day is the ${ordinals[targetDi]} day of the week?`, options: DAYS_OF_WEEK.slice().sort(() => 0.5 - Math.random()).slice(0, 4), correct: DAYS_OF_WEEK[targetDi], type: 'calendar-card', visualData: { label: 'Week Day', value: targetDi + 1, color: '#E0E7FF' }, explanation: `${DAYS_OF_WEEK[targetDi]} is the ${ordinals[targetDi]} day.` });
            }
        }
        return qs;
    };

    const generateMonthQuestions = () => {
        const qs = [];
        for (let i = 0; i < totalQuestions; i++) {
            const mi = Math.floor(Math.random() * 12);
            const month = MONTHS_OF_YEAR[mi];
            const type = Math.floor(Math.random() * 2);
            if (type === 0) {
                const next = MONTHS_OF_YEAR[(mi + 1) % 12];
                qs.push({ text: `Which month comes after ${month}?`, options: MONTHS_OF_YEAR.slice().sort(() => 0.5 - Math.random()).slice(0, 4), correct: next, type: 'calendar-card', visualData: { label: 'This Month', value: month, color: '#FCE7F3' }, explanation: `The month after ${month} is ${next}.` });
            } else {
                const ordinals = ["1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th", "9th", "10th", "11th", "12th"];
                const targetMi = Math.floor(Math.random() * 12);
                qs.push({ text: `Which month is the ${ordinals[targetMi]} month of the year?`, options: MONTHS_OF_YEAR.slice().sort(() => 0.5 - Math.random()).slice(0, 4), correct: MONTHS_OF_YEAR[targetMi], type: 'calendar-card', visualData: { label: 'Month Order', value: targetMi + 1, color: '#F3E8FF' }, explanation: `${MONTHS_OF_YEAR[targetMi]} is the ${ordinals[targetMi]} month.` });
            }
        }
        return qs;
    };

    const generateClockQuestions = () => {
        const qs = [];
        for (let i = 0; i < totalQuestions; i++) {
            const h = Math.floor(Math.random() * 12) + 1;
            const m = Math.random() > 0.5 ? 0 : 30;
            const timeStr = m === 0 ? `${h} o'clock` : `Half past ${h}`;
            qs.push({ text: "Read the time on the clock:", options: [timeStr, `${(h % 12) + 1} o'clock`, `Half past ${(h % 12) + 1}`, `${h}:15`].sort(() => 0.5 - Math.random()), correct: timeStr, type: 'read-clock', visualData: { hour: h, minute: m }, explanation: `The hour hand is at ${h} and the minute hand is at ${m === 0 ? '12' : '6'}. So it's ${timeStr}.` });
        }
        return qs;
    };

    const generateQuestions = (selectedSkill) => {
        if (selectedSkill === '1025') return generateDayQuestions();
        if (selectedSkill === '1026') return generateMonthQuestions();
        if (selectedSkill === '1027') return generateClockQuestions();

        const p1 = generateDayQuestions().slice(0, 4);
        const p2 = generateMonthQuestions().slice(0, 3);
        const p3 = generateClockQuestions().slice(0, 3);
        return [...p1, ...p2, ...p3].sort(() => 0.5 - Math.random()).slice(0, totalQuestions);
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
                                                <div className="log-question"><LatexText text={ans.questionText} /><div style={{ marginTop: '10px', display: 'flex', justifyContent: 'center' }}><DynamicVisual type={ans.type} data={ans.visualData} /></div></div>
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

const Grade2MyFundayWithBoundary = () => <ErrorBoundary><Grade2MyFunday /></ErrorBoundary>;
export default Grade2MyFundayWithBoundary;

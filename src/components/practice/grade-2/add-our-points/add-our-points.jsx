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

// ─── Vertical Addition UI ───
const VerticalAddition = ({ num1, num2, isSubtraction = false }) => {
    const s1 = String(num1).padStart(2, ' ');
    const s2 = String(num2).padStart(2, ' ');
    return (
        <div style={{
            display: 'inline-flex', flexDirection: 'column', alignItems: 'center',
            fontFamily: '"Nunito", sans-serif', fontSize: '5rem', fontWeight: 800,
            color: '#2D3436', padding: '30px 50px', background: 'white',
            borderRadius: '35px', boxShadow: '0 15px 40px rgba(0,0,0,0.06)', border: '2px solid #F1F5F9',
            minWidth: '220px'
        }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', width: '100%', textAlign: 'center' }}>
                <span style={{ opacity: 0 }}>+</span>
                <div style={{ display: 'flex', gap: '15px' }}>
                    {s1.split('').map((d, i) => <span key={i} style={{ minWidth: '0.8em' }}>{d}</span>)}
                </div>

                <span style={{ color: isSubtraction ? '#F56565' : '#429469', fontSize: '3.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {isSubtraction ? '−' : '+'}
                </span>
                <div style={{ display: 'flex', gap: '15px' }}>
                    {s2.split('').map((d, i) => <span key={i} style={{ minWidth: '0.8em' }}>{d}</span>)}
                </div>
            </div>
            <div style={{ borderBottom: '5px solid #2D3436', width: '100%', marginTop: '10px', borderRadius: '5px' }}></div>
        </div>
    );
};

// ─── DynamicVisual Component ───
const DynamicVisual = ({ type, data }) => {
    if (type === 'vertical') {
        return <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}><VerticalAddition num1={data.num1} num2={data.num2} isSubtraction={data.isSubtraction} /></div>;
    }
    if (type === 'horizontal') {
        return (
            <div style={{
                fontSize: '4rem', fontWeight: 900, color: '#2D3436', textAlign: 'center',
                padding: '40px', background: 'white', borderRadius: '30px', border: '3px solid #EDF2F7',
                boxShadow: '0 10px 30px rgba(0,0,0,0.05)', width: '100%'
            }}>
                <LatexText text={`${data.num1} ${data.isSubtraction ? '-' : '+'} ${data.num2} = ?`} />
            </div>
        );
    }
    // No visual for word problems as per user request
    if (type === 'word-problem') {
        return null;
    }
    return null;
};

// ─── Error Boundary ───
class ErrorBoundary extends React.Component {
    constructor(props) { super(props); this.state = { hasError: false }; }
    static getDerivedStateFromError(error) { return { hasError: true }; }
    render() {
        if (this.state.hasError) return <div style={{ padding: '20px', textAlign: 'center' }}><h2>Something went wrong.</h2><button onClick={() => window.location.reload()}>Reload</button></div>;
        return this.props.children;
    }
}

// ─── Main Component ───
const Grade2AddOurPoints = () => {
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
        return { topicName: 'Add Our Points', skillName: 'Practice' };
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

    // ─── Question Generators ───

    const generateAdditionNoCarry = () => {
        const qs = [];
        for (let i = 0; i < totalQuestions; i++) {
            let n1, n2;
            do {
                n1 = Math.floor(Math.random() * 80) + 10;
                n2 = Math.floor(Math.random() * 80) + 10;
            } while ((n1 % 10 + n2 % 10 > 9) || (Math.floor(n1 / 10) + Math.floor(n2 / 10) > 9));

            const ans = n1 + n2;
            const options = [...new Set([ans, ans + 10, ans - 1, ans + 1])].sort(() => 0.5 - Math.random());
            qs.push({
                text: "Find the sum:",
                options: options.slice(0, 4).map(String),
                correct: String(ans),
                type: 'vertical',
                visualData: { num1: n1, num2: n2, isSubtraction: false },
                explanation: `${n1} + ${n2} = ${ans}. Add ones: ${n1 % 10}+${n2 % 10}=${n1 % 10 + n2 % 10}. Add tens: ${Math.floor(n1 / 10)}+${Math.floor(n2 / 10)}=${Math.floor(n1 / 10) + Math.floor(n2 / 10)}.`
            });
        }
        return qs;
    };

    const generateAdditionCarry = () => {
        const qs = [];
        for (let i = 0; i < totalQuestions; i++) {
            let n1, n2;
            do {
                n1 = Math.floor(Math.random() * 40) + 15;
                n2 = Math.floor(Math.random() * 40) + 15;
            } while (n1 % 10 + n2 % 10 <= 9);

            const ans = n1 + n2;
            const options = [...new Set([ans, ans - 10, ans - 1, ans + 1])].sort(() => 0.5 - Math.random());
            qs.push({
                text: "Calculate the total:",
                options: options.slice(0, 4).map(String),
                correct: String(ans),
                type: 'vertical',
                visualData: { num1: n1, num2: n2, isSubtraction: false },
                explanation: `Add ${n1} and ${n2}. Ones: ${n1 % 10}+${n2 % 10}=${n1 % 10 + n2 % 10} (Write ${(n1 + n2) % 10} and carry 1). Tens: ${Math.floor(n1 / 10)}+${Math.floor(n2 / 10)}+1 (carry) = ${Math.floor(ans / 10)}.`
            });
        }
        return qs;
    };

    const generateWordProblems = () => {
        const scenarios = [
            { item: "marbles", action: "collected", icon: "🔴" },
            { item: "stickers", action: "bought", icon: "⭐" },
            { item: "points", action: "scored", icon: "🎯" },
            { item: "beads", action: "found", icon: "🧿" }
        ];
        const qs = [];
        for (let i = 0; i < totalQuestions; i++) {
            const sc = scenarios[i % scenarios.length];
            const n1 = Math.floor(Math.random() * 30) + 10;
            const n2 = Math.floor(Math.random() * 30) + 10;
            const ans = n1 + n2;
            const names = ["Rohan", "Sana", "Ali", "Meera", "Arjun", "Zoya"];
            const p1 = names[Math.floor(Math.random() * names.length)];
            const p2 = names[(Math.floor(Math.random() * names.length) + 1) % names.length];

            qs.push({
                text: `${p1} ${sc.action} ${n1} ${sc.item}. ${p2} ${sc.action} ${n2} ${sc.item}. How many ${sc.item} do they have in total?`,
                options: [...new Set([ans, ans + 5, ans - 5, ans + 1])].sort(() => 0.5 - Math.random()).map(String),
                correct: String(ans),
                type: 'word-problem',
                visualData: { num1: n1, num2: n2, displayType: Math.random() > 0.5 ? 'vertical' : 'horizontal', icon: sc.icon },
                explanation: `Total = ${n1} + ${n2} = ${ans} ${sc.item}.`
            });
        }
        return qs;
    };

    const generateQuestions = (selectedSkill) => {
        if (selectedSkill === '1028') return generateAdditionNoCarry();
        if (selectedSkill === '1029') return generateAdditionCarry();
        if (selectedSkill === '1030') return generateWordProblems();

        // Mixed Test (1130 or 1030-TEST)
        const pool = [
            ...generateAdditionNoCarry().slice(0, 4),
            ...generateAdditionCarry().slice(0, 3),
            ...generateWordProblems().slice(0, 3)
        ].sort(() => 0.5 - Math.random());
        return pool.slice(0, totalQuestions);
    };

    // ─── Template Logic ───
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

    useEffect(() => { setShowExplanationModal(false); }, [qIndex]);

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
        try { if (sessionId) await api.finishSession(sessionId); } catch (e) { console.error(e); }
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

        try {
            const uid = user?.user_id || user?.id || sessionStorage.getItem('userId') || localStorage.getItem('userId');
            const qData = sessionQuestions[qIndex] || {};
            const skId = typeof skillId !== 'undefined' ? skillId : '0';
            if (uid && sessionId) {
                api.recordAttempt({
                    user_id: parseInt(uid, 10), session_id: sessionId,
                    skill_id: parseInt(skId, 10) || 0, template_id: null,
                    difficulty_level: 'Medium',
                    question_text: String(qData.text || ''),
                    correct_answer: String(qData.correct || ''),
                    student_answer: String(option),
                    is_correct: isCorrect,
                    solution_text: String(qData.explanation || ''),
                    time_spent_seconds: timer
                }).catch(err => console.error("Auto-log failed:", err));
            }
        } catch (err) { console.error("Auto-log error:", err); }

        if (isCorrect) setScore(s => s + 1);

        setAnswers(prev => ({
            ...prev,
            [qIndex]: {
                selectedOption: option, isCorrect,
                type: sessionQuestions[qIndex].type,
                visualData: sessionQuestions[qIndex].visualData,
                questionText: sessionQuestions[qIndex].text,
                correctAnswer: sessionQuestions[qIndex].correct,
                explanation: sessionQuestions[qIndex].explanation || "The correct answer is " + sessionQuestions[qIndex].correct
            }
        }));

        if (!isTest && !isCorrect) {
            setShowExplanationModal(true);
        } else {
            setIsAutoAdvancing(true);
            setTimeout(() => { handleNext(); setIsAutoAdvancing(false); }, 800);
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
                        uid: user?.id || 'unknown', category: 'Practice',
                        reportData: {
                            skill_id: skillId, skill_name: skillName,
                            score: Math.round((score / totalQuestions) * 100),
                            total_questions: totalQuestions, correct_answers: score,
                            time_spent: timer, timestamp: new Date().toISOString(),
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

    const handleSkip = () => {
        if (isAnswered) return;
        setAnswers(prev => ({
            ...prev,
            [qIndex]: {
                selectedOption: 'Skipped', isCorrect: false,
                type: sessionQuestions[qIndex].type,
                visualData: sessionQuestions[qIndex].visualData,
                questionText: sessionQuestions[qIndex].text,
                correctAnswer: sessionQuestions[qIndex].correct,
                explanation: "This question was skipped."
            }
        }));
        handleNext();
    };

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
                            {[1, 2, 3].map(i => (
                                <Star key={i} size={60} fill={percentage >= (i * 33) ? "#FFD700" : "#EDF2F7"} color={percentage >= (i * 33) ? "#F6AD55" : "#CBD5E0"} />
                            ))}
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
                                                <div className="log-question">
                                                    <LatexText text={ans.questionText} />
                                                    <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'center' }}><DynamicVisual type={ans.type} data={ans.visualData} /></div>
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
            <div className="g1-bg-blobs">
                <div className="blob blob-1"></div>
                <div className="blob blob-2"></div>
                <div className="blob blob-3"></div>
            </div>

            <div className="g1-practice-container">
                <div className="g1-header-nav">
                    <div className="g1-timer-badge"><Timer size={18} />{formatTime(timer)}</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px', flex: 1, minWidth: 0 }}>
                        <span style={{ fontWeight: 400, color: '#666', fontSize: '1rem', background: 'white', padding: '8px 15px', borderRadius: '15px', boxShadow: '0 4px 10px rgba(0,0,0,0.05)', whiteSpace: 'nowrap' }}>
                            Q {qIndex + 1}/{totalQuestions}
                        </span>
                        <span style={{ fontWeight: 400, color: '#2D3436', fontSize: '1rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            <LatexText text={skillName} />
                        </span>
                    </div>
                    {isTest && !isAnswered && (
                        <button className="g1-skip-btn" onClick={handleSkip} style={{ marginLeft: '15px' }}>Skip Quest ⏭️</button>
                    )}
                    <div className="exit-practice-sticker" style={{ marginLeft: 'auto' }}><StickerExit onClick={handleExit} /></div>
                </div>

                <div className="g1-progress-container" style={{ margin: '0 0 10px 0' }}>
                    <div className="g1-progress-fill" style={{ width: `${((qIndex + 1) / totalQuestions) * 100}%` }}></div>
                </div>
                <div className="g1-topic-header-compact" style={{ textAlign: 'center', margin: '5px 0', fontSize: '0.8rem', color: '#64748B', textTransform: 'uppercase', letterSpacing: '2px', fontWeight: 400 }}>{topicName}</div>

                <motion.div key={qIndex} initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="g1-question-card">
                    <h2 className="g1-question-text"><LatexText text={currentQ.text} /></h2>

                    <div className={`g1-content-split ${currentQ.type === 'word-problem' ? 'centered-layout' : ''}`}>
                        {currentQ.type !== 'word-problem' && (
                            <div className="g1-visual-area">
                                <DynamicVisual type={currentQ.type} data={currentQ.visualData} />
                            </div>
                        )}
                        <div className="g1-quiz-side" style={currentQ.type === 'word-problem' ? { margin: '0 auto', maxWidth: '600px', width: '100%' } : {}}>
                            <div className="g1-options-grid">
                                {currentQ.options.map((opt, i) => (
                                    <button key={i}
                                        className={`g1-option-btn
                                            ${selectedOption === opt ? (isTest ? 'selected-test' : (isAnswered ? (opt === currentQ.correct ? 'selected-correct' : 'selected-wrong') : 'selected-test')) : ''}
                                            ${!isTest && isAnswered && opt === currentQ.correct ? 'revealed-correct' : ''}
                                        `}
                                        onClick={() => handleOptionSelect(opt)}
                                        disabled={isAnswered}
                                    >
                                        <LatexText text={opt} />
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
                                    Check Answer <ChevronRight size={24} />
                                </button>
                            ) : (
                                <button className="g1-nav-btn next-btn" onClick={handleNext} disabled={isAutoAdvancing}>
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

const Grade2AddOurPointsWithBoundary = () => (
    <ErrorBoundary><Grade2AddOurPoints /></ErrorBoundary>
);

export default Grade2AddOurPointsWithBoundary;

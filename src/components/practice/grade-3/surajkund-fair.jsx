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
import avatarImg from '../../../assets/avatar.png';
import './Grade3Practice.css';

const CoinDisplay = ({ value, color }) => (
    <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
        <svg width="80" height="80" viewBox="0 0 80 80">
            <circle cx="40" cy="40" r="36" fill={color || '#FFD700'} stroke="#B8860B" strokeWidth="3" />
            <circle cx="40" cy="40" r="30" fill="none" stroke="#B8860B" strokeWidth="1.5" strokeDasharray="4,3" />
            <text x="40" y="46" textAnchor="middle" fontSize="18" fontWeight="700" fill="#5D4200" fontFamily="Nunito, sans-serif">₹{value}</text>
        </svg>
    </motion.div>
);

const MoneyEquation = ({ amounts, total }) => (
    <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} style={{ display: 'flex', alignItems: 'center', gap: '10px', justifyContent: 'center', flexWrap: 'wrap', background: 'white', borderRadius: '16px', padding: '16px 20px', boxShadow: '0 4px 15px rgba(0,0,0,0.06)' }}>
        {amounts.map((amt, i) => (
            <React.Fragment key={i}>
                <div style={{ fontSize: '1.8rem', fontWeight: 700, color: '#31326F', background: 'rgba(255,215,0,0.15)', borderRadius: '12px', padding: '8px 14px', border: '2px solid #FFD700' }}>₹{amt}</div>
                {i < amounts.length - 1 && <div style={{ fontSize: '1.5rem', color: '#CBD5E0', fontWeight: 700 }}>+</div>}
            </React.Fragment>
        ))}
        <div style={{ fontSize: '1.5rem', color: '#CBD5E0', fontWeight: 700 }}>=</div>
        <div style={{ fontSize: '1.8rem', fontWeight: 700, color: '#7C6AF7', background: 'rgba(124,106,247,0.1)', borderRadius: '12px', padding: '8px 14px', border: '2px dashed #7C6AF7' }}>{total ? `₹${total}` : '?'}</div>
    </motion.div>
);

const TextDisplay = ({ text }) => (
    <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} style={{ fontSize: '1.2rem', color: '#31326F', background: 'rgba(255,215,0,0.1)', borderRadius: '16px', padding: '20px 24px', fontFamily: 'Nunito, sans-serif', lineHeight: 1.7, maxWidth: '320px', margin: '0 auto', textAlign: 'center', fontWeight: 600, border: '2px solid rgba(255,215,0,0.3)' }}>
        {text}
    </motion.div>
);

const DynamicVisual = ({ type, data }) => {
    if (type === 'coin') return <CoinDisplay value={data.value} color={data.color} />;
    if (type === 'money-eq') return <MoneyEquation amounts={data.amounts} total={data.total} />;
    if (type === 'text-display') return <TextDisplay text={data.text} />;
    if (type === 'text') return null;
    return null;
};

const SurajkundFair = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const skillId = queryParams.get('skillId');
    const isTest = skillId === 'SKF-TEST';
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
        for (const gradeKey of Object.keys(TOPIC_CONFIGS)) {
            const gradeConfig = TOPIC_CONFIGS[gradeKey];
            for (const [topicName, skills] of Object.entries(gradeConfig)) {
                const skill = skills.find(s => s.id === skillId);
                if (skill) return { topicName, skillName: skill.name, grade: gradeKey };
            }
        }
        return { topicName: 'The Surajkund Fair', skillName: 'Mathematics', grade: '3' };
    };

    const getNextSkill = () => {
        const { grade } = getTopicInfo();
        const gradeConfig = TOPIC_CONFIGS[grade];
        const topics = Object.keys(gradeConfig);
        let currentTopicIdx = -1, currentSkillIdx = -1;
        for (let i = 0; i < topics.length; i++) {
            const skills = gradeConfig[topics[i]];
            const idx = skills.findIndex(s => s.id === skillId);
            if (idx !== -1) { currentTopicIdx = i; currentSkillIdx = idx; break; }
        }
        if (currentTopicIdx === -1) return null;
        const currentTopicSkills = gradeConfig[topics[currentTopicIdx]];
        if (currentSkillIdx < currentTopicSkills.length - 1) return { ...currentTopicSkills[currentSkillIdx + 1], topicName: topics[currentTopicIdx] };
        if (currentTopicIdx < topics.length - 1) {
            const nextTopicName = topics[currentTopicIdx + 1];
            const nextTopicSkills = gradeConfig[nextTopicName];
            if (nextTopicSkills.length > 0) return { ...nextTopicSkills[0], topicName: nextTopicName };
        }
        return null;
    };

    const { topicName, skillName } = getTopicInfo();

    const generateQuestions = (selectedSkill) => {
        const questions = [];
        const skillCycle = isTest ? ['SKF-01','SKF-02','SKF-03','SKF-04','SKF-05','SKF-06','SKF-07','SKF-01','SKF-02','SKF-03'] : Array(5).fill(selectedSkill);
        const names = ['Riya', 'Ayan', 'Meera', 'Rohan', 'Priya'];
        const coinColors = { 1: '#C0C0C0', 2: '#FFD700', 5: '#B8860B', 10: '#CD7F32' };

        for (let i = 0; i < totalQuestions; i++) {
            const sk = skillCycle[i] || selectedSkill;
            let q;

            if (sk === 'SKF-01') {
                const vals = [1, 2, 5, 10];
                const val = vals[i % vals.length];
                const wrong1 = vals[(i + 1) % vals.length]; const wrong2 = vals[(i + 2) % vals.length];
                const options = [`₹${val} coin`, `₹${wrong1} coin`, `₹${wrong2} coin`].sort(() => 0.5 - Math.random());
                q = { text: 'What is this coin?', options, correct: `₹${val} coin`, type: 'coin', visualData: { value: val, color: coinColors[val] }, explanation: `This is a ₹${val} coin.`, solution: `Read the number on the coin: ₹${val}.` };
            } else if (sk === 'SKF-02') {
                const coins = [5, 2, 1].slice(0, Math.floor(Math.random() * 2) + 2);
                const total = coins.reduce((a, b) => a + b, 0);
                const options = [total, total + 1, total - 1].sort(() => 0.5 - Math.random());
                q = { text: 'What is the total amount?', options, correct: total, type: 'money-eq', visualData: { amounts: coins }, explanation: `${coins.join(' + ')} = ₹${total}.`, solution: `Add all coins together.` };
            } else if (sk === 'SKF-03') {
                const total = [15, 20, 25, 30][i % 4];
                const given = [10, 10, 20, 20][i % 4];
                const missing = total - given;
                const options = [missing, missing + 1, missing - 1].sort(() => 0.5 - Math.random());
                q = { text: `Make ₹${total} using ₹${given} + ₹___?`, options, correct: missing, type: 'text-display', visualData: { text: `₹${given} + ₹? = ₹${total}` }, explanation: `₹${total} - ₹${given} = ₹${missing}.`, solution: `Subtract to find the missing amount.` };
            } else if (sk === 'SKF-04') {
                const n1 = names[i % names.length]; const n2 = names[(i + 1) % names.length];
                const amt1 = Math.floor(Math.random() * 40) + 20; const amt2 = Math.floor(Math.random() * 40) + 20;
                const more = amt1 > amt2 ? n1 : amt2 > amt1 ? n2 : 'Same amount';
                const options = [n1, n2, 'Same amount'].sort(() => 0.5 - Math.random());
                q = { text: `${n1} has ₹${amt1}. ${n2} has ₹${amt2}. Who has MORE?`, options, correct: more, type: 'text-display', visualData: { text: `${n1}: ₹${amt1}\n${n2}: ₹${amt2}` }, explanation: `₹${amt1 > amt2 ? amt1 : amt2} > ₹${amt1 > amt2 ? amt2 : amt1}, so ${more} has more.`, solution: `Compare the amounts.` };
            } else if (sk === 'SKF-05') {
                const cost = Math.floor(Math.random() * 30) + 15; const paid = cost + (Math.floor(Math.random() * 3) + 1) * 5 + 5;
                const change = paid - cost;
                const options = [change, change + 5, change - 5].sort(() => 0.5 - Math.random());
                q = { text: `Toy costs ₹${cost}. You pay ₹${paid}. Change = ₹?`, options, correct: change, type: 'text-display', visualData: { text: `Cost: ₹${cost}\nPaid: ₹${paid}\nChange: ?` }, explanation: `₹${paid} - ₹${cost} = ₹${change}.`, solution: `Subtract cost from amount paid.` };
            } else if (sk === 'SKF-06') {
                const paid = [10, 20, 50][i % 3]; const cost = paid - (Math.floor(Math.random() * 4) + 2) * 2;
                const change = paid - cost;
                const options = [change, change + 2, change - 2].sort(() => 0.5 - Math.random());
                q = { text: `Paid ₹${paid} for an item costing ₹${cost}. Change = ₹?`, options, correct: change, type: 'money-eq', visualData: { amounts: [paid], total: null }, explanation: `₹${paid} - ₹${cost} = ₹${change}.`, solution: `Change = amount paid - cost.` };
            } else {
                const item = ['bangles', 'balloons', 'stickers', 'candies'][i % 4];
                const count = Math.floor(Math.random() * 4) + 2; const price = Math.floor(Math.random() * 8) + 3;
                const total = count * price;
                const options = [total, total + price, total - price].sort(() => 0.5 - Math.random());
                q = { text: `${count} ${item} at ₹${price} each. Total = ₹?`, options, correct: total, type: 'text-display', visualData: { text: `${count} × ₹${price} = ₹?` }, explanation: `${count} × ₹${price} = ₹${total}.`, solution: `Multiply: ${count} × ${price} = ${total}.` };
            }
            questions.push(q);
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
                const session = await api.createPracticeSession(userId, 0);
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
        if (answers[qIndex]) { setSelectedOption(answers[qIndex].selectedOption); setIsAnswered(true); }
        else { setSelectedOption(null); setIsAnswered(false); }
    }, [qIndex, answers]);

    const handleExit = async () => {
        try { if (sessionId) await api.finishSession(sessionId); } catch (e) {}
        navigate('/junior/grade/3');
    };

    const handleOptionSelect = (option) => { if (isAnswered) return; setSelectedOption(option); };

    const handleSubmit = () => {
        if (isAnswered || selectedOption === null) return;
        const option = selectedOption;
        setIsAnswered(true);
        const isCorrect = option === sessionQuestions[qIndex].correct;
        if (isCorrect) setScore(s => s + 1);
        setAnswers(prev => ({
            ...prev,
            [qIndex]: { selectedOption: option, isCorrect, type: sessionQuestions[qIndex].type, visualData: sessionQuestions[qIndex].visualData, questionText: sessionQuestions[qIndex].text, correctAnswer: sessionQuestions[qIndex].correct, explanation: sessionQuestions[qIndex].explanation || '' }
        }));
        if (!isTest) setShowExplanationModal(true);
        else setTimeout(() => handleNext(), 800);
    };

    const handleSkip = () => {
        if (isAnswered) return;
        setAnswers(prev => ({ ...prev, [qIndex]: { selectedOption: 'Skipped', isCorrect: false, type: sessionQuestions[qIndex].type, visualData: sessionQuestions[qIndex].visualData, questionText: sessionQuestions[qIndex].text, correctAnswer: sessionQuestions[qIndex].correct, explanation: sessionQuestions[qIndex].explanation } }));
        handleNext();
    };

    const handleNext = async () => {
        if (qIndex < totalQuestions - 1) { setQIndex(v => v + 1); }
        else {
            setShowResults(true);
            try {
                if (sessionId) {
                    await api.finishSession(sessionId);
                    await api.createReport({ uid: user?.id || 'unknown', category: 'Practice', reportData: { skill_id: skillId, skill_name: skillName, score: Math.round((score / totalQuestions) * 100), total_questions: totalQuestions, correct_answers: score, time_spent: timer, timestamp: new Date().toISOString(), answers: Object.values(answers).filter(a => a !== undefined) } });
                }
            } catch (e) { console.error(e); }
        }
    };

    const formatTime = (s) => { const mins = Math.floor(s / 60); const secs = s % 60; return `${mins}:${secs.toString().padStart(2, '0')}`; };

    if (sessionQuestions.length === 0) return <div className="grade3-practice-page"><div className="g3-loading-blob" /></div>;

    if (showResults) {
        const percentage = Math.round((score / totalQuestions) * 100);
        return (
            <div className="grade3-practice-page results-view overflow-y-auto">
                <Navbar />
                <header className="results-header">
                    <h1 className="results-title">Adventure Report</h1>
                    <div className="exit-container"><StickerExit onClick={handleExit} /></div>
                </header>
                <main className="results-content">
                    <div className="results-hero-section">
                        <img src={avatarImg} alt="Mascot" style={{ width: '120px', height: '120px', margin: '0 auto 20px' }} />
                        <h2 style={{ fontSize: '2.5rem', fontWeight: 400, color: '#31326F', fontFamily: 'Nunito, sans-serif' }}>Adventure Complete! 🎉</h2>
                        <div className="stars-container">
                            {[1, 2, 3].map(i => (
                                <motion.div key={i} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: i * 0.2 }} className="star-wrapper">
                                    <Star size={60} fill={percentage >= (i * 33) ? "#FFD700" : "#EDF2F7"} color={percentage >= (i * 33) ? "#F6AD55" : "#CBD5E0"} />
                                </motion.div>
                            ))}
                        </div>
                        <div className="results-stats-grid">
                            <div className="stat-card"><span className="stat-label">Correct</span><span className="stat-value-large">{score}/{totalQuestions}</span></div>
                            <div className="stat-card"><span className="stat-label">Time</span><span className="stat-value-large">{formatTime(timer)}</span></div>
                            <div className="stat-card"><span className="stat-label">Accuracy</span><span className="stat-value-large">{percentage}%</span></div>
                            <div className="stat-card"><span className="stat-label">Score</span><span className="stat-value-large">{score * 10}</span></div>
                        </div>
                    </div>
                    <div className="practice-summary" style={{ textAlign: 'center', padding: '20px 0' }}>
                        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '20px' }}>
                            {Object.values(answers).map((ans, idx) => (
                                <motion.div key={idx} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: idx * 0.1 }}
                                    style={{ width: '50px', height: '50px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', background: ans.isCorrect ? '#C6F6D5' : '#FED7D7', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                                    {ans.isCorrect ? '✅' : '❌'}
                                </motion.div>
                            ))}
                        </div>
                        <p style={{ fontSize: '1.3rem', fontWeight: 400, color: '#4A5568', marginBottom: '10px' }}>
                            {percentage >= 80 ? '🌟 Amazing work! Keep it up!' : percentage >= 60 ? '💪 Good effort! Keep practicing!' : '🌱 Nice try! Practice makes perfect!'}
                        </p>
                    </div>
                    <div className="results-actions">
                        <button className="action-btn-large retake-skill-btn" onClick={() => window.location.reload()}><RefreshCw size={24} /> Retake Skill</button>
                        {getNextSkill() && (
                            <button className="action-btn-large next-skill-btn" onClick={() => { const next = getNextSkill(); navigate(`/junior/grade/3/${next.route}?skillId=${next.id}`); window.location.reload(); }}>
                                Next Skill <ArrowRight size={24} />
                            </button>
                        )}
                        <button className="action-btn-large back-topics-btn" onClick={() => navigate('/junior/grade/3')}><FileText size={24} /> Back to Topics</button>
                    </div>
                </main>
            </div>
        );
    }

    const currentQ = sessionQuestions[qIndex];
    return (
        <div className="grade3-practice-page">
            <div className="g3-bg-blobs"><div className="blob blob-1"></div><div className="blob blob-2"></div><div className="blob blob-3"></div></div>
            <div className="g3-practice-container">
                <div className="g3-header-nav">
                    <div className="g3-timer-badge"><Timer size={18} />{formatTime(timer)}</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px', flex: 1, minWidth: 0 }}>
                        <span style={{ fontWeight: 400, color: '#666', fontSize: '1rem', background: 'white', padding: '8px 15px', borderRadius: '15px', boxShadow: '0 4px 10px rgba(0,0,0,0.05)', whiteSpace: 'nowrap' }}>Q {qIndex + 1}/{totalQuestions}</span>
                        <span style={{ fontWeight: 400, color: '#2D3436', fontSize: '1rem' }}><LatexText text={skillName} /></span>
                    </div>
                    {isTest && (<button className="g3-skip-btn" onClick={handleSkip} disabled={isAnswered}>Skip Quest ⏭️</button>)}
                    <div style={{ marginLeft: 'auto' }}><StickerExit onClick={handleExit} /></div>
                </div>
                <div className="g3-progress-container" style={{ margin: '0 0 10px 0' }}>
                    <div className="g3-progress-fill" style={{ width: `${((qIndex + 1) / totalQuestions) * 100}%` }}></div>
                </div>
                <div style={{ textAlign: 'center', margin: '5px 0', fontSize: '0.8rem', color: '#64748B', textTransform: 'uppercase', letterSpacing: '2px', fontWeight: 400 }}>{topicName}</div>
                <motion.div key={qIndex} initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="g3-question-card">
                    <h2 className="g3-question-text"><LatexText text={currentQ.text} /></h2>
                    <div className="g3-content-split">
                        <div className="g3-visual-area"><DynamicVisual type={currentQ.type} data={currentQ.visualData} /></div>
                        <div className="g3-quiz-side">
                            <div className="g3-options-grid">
                                {currentQ.options.map((opt, i) => (
                                    <button key={i}
                                        className={`g3-option-btn ${selectedOption === opt ? (isTest ? 'selected-test' : (isAnswered ? (opt === currentQ.correct ? 'selected-correct' : 'selected-wrong') : 'selected-test')) : ''} ${!isTest && isAnswered && opt === currentQ.correct ? 'revealed-correct' : ''}`}
                                        onClick={() => handleOptionSelect(opt)} disabled={isAnswered}>
                                        <LatexText text={String(opt)} />
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="g3-navigation-footer">
                        <button className="g3-nav-btn prev-btn" onClick={() => { if (qIndex > 0) setQIndex(qIndex - 1); }} disabled={qIndex === 0}><ChevronLeft size={24} /> Prev</button>
                        <div>
                            {isAnswered && !isTest && !answers[qIndex]?.isCorrect && (<button className="g3-nav-btn steps-btn" onClick={() => setShowExplanationModal(true)}><Eye size={24} /> Steps</button>)}
                            {!isAnswered ? (<button className="g3-nav-btn submit-btn" onClick={handleSubmit} disabled={selectedOption === null}>Check Answer <ChevronRight size={24} /></button>)
                                : (<button className="g3-nav-btn next-btn" onClick={handleNext}>{qIndex === totalQuestions - 1 ? (isTest ? 'Finish Test' : 'Finish') : 'Next Question'} <ChevronRight size={24} /></button>)}
                        </div>
                    </div>
                </motion.div>
            </div>
            <ExplanationModal isOpen={showExplanationModal} isCorrect={answers[qIndex]?.isCorrect} correctAnswer={currentQ.correct} explanation={currentQ.explanation} solution={currentQ.solution} onClose={() => setShowExplanationModal(false)} onNext={() => { setShowExplanationModal(false); handleNext(); }} />
        </div>
    );
};

export default SurajkundFair;

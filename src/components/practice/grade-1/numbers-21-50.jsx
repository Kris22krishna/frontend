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


const DynamicVisual = ({ type, data, isAnswered }) => {
    const { num, color } = data;
    const tens = Math.floor(num / 10);
    const ones = num % 10;

    if (type === 'comparison') {
        const { n1, n2, color1, color2, isGreater } = data;
        return (
            <div style={{ display: 'flex', gap: 'clamp(20px, 8vw, 40px)', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap' }}>
                <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="g1-compare-item">
                    <div style={{ fontSize: '2rem', fontWeight: 900, color: color1, marginBottom: '8px' }}>{n1}</div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 15px)', gap: '4px' }}>
                        {Array.from({ length: Math.floor(n1 / 10) }).map((_, i) => (
                            <div key={i} style={{ display: 'flex', flexDirection: 'column-reverse', gap: '2px', background: color1 + '20', padding: '2px', borderRadius: '4px' }}>
                                {Array.from({ length: 10 }).map((_, j) => (
                                    <div key={j} style={{ width: '15px', height: '6px', backgroundColor: color1, borderRadius: '1px' }}></div>
                                ))}
                            </div>
                        ))}
                    </div>
                </motion.div>
                <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#666' }}>VS</div>
                <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="g1-compare-item">
                    <div style={{ fontSize: '2rem', fontWeight: 900, color: color2, marginBottom: '8px' }}>{n2}</div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 15px)', gap: '4px' }}>
                        {Array.from({ length: Math.floor(n2 / 10) }).map((_, i) => (
                            <div key={i} style={{ display: 'flex', flexDirection: 'column-reverse', gap: '2px', background: color2 + '20', padding: '2px', borderRadius: '4px' }}>
                                {Array.from({ length: 10 }).map((_, j) => (
                                    <div key={j} style={{ width: '15px', height: '6px', backgroundColor: color2, borderRadius: '1px' }}></div>
                                ))}
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        );
    }

    return (
        <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="g1-tens-complex">
            <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-end', justifyContent: 'center', flexWrap: 'wrap' }}>
                {/* Tens Bundles */}
                <div style={{ display: 'flex', gap: '8px' }}>
                    {Array.from({ length: tens }).map((_, i) => (
                        <motion.div
                            key={i}
                            initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: i * 0.1 }}
                            style={{ display: 'flex', flexDirection: 'column-reverse', gap: '2px', padding: '4px', border: '3px solid #E2E8F0', borderRadius: '10px', background: 'white', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}
                        >
                            {Array.from({ length: 10 }).map((_, j) => (
                                <div key={j} style={{ width: '20px', height: '10px', backgroundColor: color, borderRadius: '2px' }}></div>
                            ))}
                        </motion.div>
                    ))}
                </div>
                {/* Ones */}
                {ones > 0 && (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 20px)', gap: '4px', marginBottom: '4px' }}>
                        {Array.from({ length: ones }).map((_, i) => (
                            <motion.div
                                key={i}
                                initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: (tens * 0.1) + (i * 0.1) }}
                                style={{ width: '20px', height: '10px', backgroundColor: color, borderRadius: '2px', opacity: 0.8 }}
                            />
                        ))}
                    </div>
                )}
            </div>
            {isAnswered && (
                <div style={{ marginTop: '15px', fontSize: '1.2rem', fontWeight: 800, color: '#4A5568' }}>
                    {tens} Tens and {ones} Ones
                </div>
            )}
        </motion.div>
    );
};

const MOTIVATIONS = [
    { text: "Spectacular!", sub: "You're doing amazing!" },
    { text: "You're a Star!", sub: "Keep up the great work!" },
    { text: "Brilliant!", sub: "That's exactly right!" },
    { text: "Amazing!", sub: "You're a math wizard!" },
    { text: "Fantastic!", sub: "You've got this!" },
    { text: "Great Job!", sub: "Everything looks perfect!" }
];

const Numbers21to50 = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const skillId = queryParams.get('skillId');
    const isTest = skillId === '805';
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
        return { topicName: 'Numbers 21-50', skillName: 'Mathematics' };
    };

    const { topicName, skillName } = getTopicInfo();

    const generateQuestions = (selectedSkill) => {
        const questions = [];
        const colors = ['#FF6B6B', '#4ECDC4', '#FFE66D', '#98D8C8', '#C9A9E9'];

        for (let i = 0; i < totalQuestions; i++) {
            let question = {};
            const color1 = colors[i % colors.length];
            const color2 = colors[(i + 1) % colors.length];

            let typeToGen = 'counting';
            if (isTest) {
                if (i < 4) typeToGen = 'counting';
                else if (i < 7) typeToGen = 'tens-ones';
                else typeToGen = 'comparison';
            } else if (selectedSkill === '801' || !selectedSkill) {
                typeToGen = 'counting';
            } else if (selectedSkill === '802') {
                typeToGen = 'tens-ones';
            } else if (selectedSkill === 'G1-CH8-03' || selectedSkill === '804') {
                typeToGen = 'comparison';
            } else {
                typeToGen = 'counting';
            }

            if (typeToGen === 'counting') {
                // Counting and recognition 21-50
                const num = Math.floor(Math.random() * 30) + 21;
                question = {
                    text: `What number do you see in the blocks? 🔍`,
                    options: [num, num + 1, num - (num > 30 ? 10 : 1)].filter((v, idx, s) => s.indexOf(v) === idx).sort(() => 0.5 - Math.random()),
                    correct: num,
                    type: 'counting',
                    visualData: { num, color: color1 },
                    explanation: `There are ${Math.floor(num / 10)} bundles of ten and ${num % 10} single blocks. That makes the number ${num}!`
                };
            } else if (typeToGen === 'tens-ones') {
                // Tens and Ones
                const tens = Math.floor(Math.random() * 3) + 2; // 2, 3, 4
                const ones = Math.floor(Math.random() * 10);
                const num = tens * 10 + ones;
                const options = [
                    `${tens} Tens, ${ones} Ones`,
                    `${ones} Tens, ${tens} Ones`,
                    `${tens - 1} Tens, ${ones} Ones`
                ].sort(() => 0.5 - Math.random());
                question = {
                    text: `Break it down! How many tens and ones? 🧱`,
                    options: options,
                    correct: `${tens} Tens, ${ones} Ones`,
                    type: 'tens-ones',
                    visualData: { num, color: color1 },
                    explanation: `The number ${num} is made of ${tens} Tens and ${ones} Ones.`
                };
            } else if (typeToGen === 'comparison') {
                // Comparison
                const n1 = Math.floor(Math.random() * 30) + 21;
                let n2 = Math.floor(Math.random() * 30) + 21;
                while (Math.abs(n1 - n2) < 5) n2 = Math.floor(Math.random() * 30) + 21;
                const isGreater = Math.random() > 0.5;
                const correct = isGreater ? (n1 > n2 ? n1 : n2) : (n1 < n2 ? n1 : n2);
                question = {
                    text: `Which number is ${isGreater ? 'LARGER' : 'SMALLER'}? ⚖️`,
                    options: [n1, n2],
                    correct: correct,
                    type: 'comparison',
                    visualData: { n1, n2, color1, color2, isGreater },
                    explanation: `${correct} is ${isGreater ? 'larger' : 'smaller'} than ${correct === n1 ? n2 : n1}.`
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
                const session = await api.createPracticeSession(user?.id, 'numbers-21-50');
                setSessionId(session?.session_id);
            } catch (e) { console.error(e); }
        };
        init();
    }, [user, skillId]);

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

    useEffect(() => {
        let interval;
        if (!showResults && sessionQuestions.length > 0) {
            interval = setInterval(() => setTimer(v => v + 1), 1000);
        }
        return () => clearInterval(interval);
    }, [showResults, sessionQuestions]);

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

    return (
        <div className="grade1-practice-page">
            <div className="g1-bg-blobs">
                <div className="blob blob-1"></div>
                <div className="blob blob-2"></div>
                <div className="blob blob-3"></div>
            </div>

            <div className="g1-practice-container">
                <div className="g1-header-nav">
                    <button className="g1-back-btn" onClick={() => navigate('/junior/grade/1')}>
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

                <div className="g1-topic-skill-header">
                    <span className="g1-topic-name">{topicName}</span>
                    <h1 className="g1-skill-name">{skillName}</h1>
                </div>

                <motion.div key={qIndex} initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="g1-question-card">
                    <h2 className="g1-question-text">{currentQ.text}</h2>
                    <div className="g1-content-split">
                        <div className="g1-visual-area">
                            <DynamicVisual type={currentQ.type} data={currentQ.visualData} isAnswered={isAnswered} />
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

export default Numbers21to50;

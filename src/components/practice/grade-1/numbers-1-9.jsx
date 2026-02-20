import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Home, ArrowRight, Timer, Trophy, Star, ChevronLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../../contexts/AuthContext';
import { api } from '../../../services/api';
import Navbar from '../../Navbar';
import { TOPIC_CONFIGS } from '../../../lib/topicConfig';
import { LatexText } from '../../LatexText';
import ExplanationModal from '../../ExplanationModal';
import mascotImg from '../../../assets/mascot.png';
import './Grade1Practice.css';

const TOTAL_QUESTIONS = 5;

const DynamicVisual = ({ type, data }) => {
    if (type === 'counting' || data.forceCounting) {
        const { count, objType, color } = data;
        const rows = Math.ceil(count / 3);
        return (
            <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="g1-visual-grid" style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                <svg width="100%" height="auto" style={{ maxWidth: '350px' }} viewBox={`0 0 350 ${Math.max(150, rows * 90)}`}>
                    {Array.from({ length: count }).map((_, i) => {
                        const x = (i % 3) * 100 + 75;
                        const y = Math.floor(i / 3) * 90 + 50;
                        return (
                            <motion.g
                                key={i}
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ delay: i * 0.05 }}
                            >
                                {objType === 'circle' && <circle cx={x} cy={y} r="35" fill={color} filter="drop-shadow(0 8px 12px rgba(0,0,0,0.15))" />}
                                {objType === 'star' && (
                                    <polygon
                                        points={`${x},${y - 35} ${x + 10},${y - 10} ${x + 35},${y - 10} ${x + 15},${y + 10} ${x + 22},${y + 35} ${x},${y + 18} ${x - 22},${y + 35} ${x - 15},${y + 10} ${x - 35},${y - 10} ${x - 10},${y - 10}`}
                                        fill={color}
                                    />
                                )}
                                {objType === 'square' && <rect x={x - 30} y={y - 30} width="60" height="60" rx="12" fill={color} filter="drop-shadow(0 8px 12px rgba(0,0,0,0.15))" />}
                            </motion.g>
                        );
                    })}
                </svg>
            </motion.div>
        );
    }
    if (type === 'recognition' || type === 'userinput') {
        const { num, color } = data;
        return (
            <motion.div
                initial={{ rotateY: 90 }}
                animate={{ rotateY: 0 }}
                className="g1-number-visual"
                style={{ fontSize: 'clamp(4rem, 25vw, 8rem)', color: color, fontWeight: 900, textShadow: '4px 4px 0 rgba(0,0,0,0.05)' }}
            >
                {num}
            </motion.div>
        );
    }
    if (type === 'comparison') {
        const { n1, n2 } = data;
        return (
            <div style={{ display: 'flex', gap: 'clamp(20px, 8vw, 60px)', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap' }}>
                <div style={{ textAlign: 'center' }}>
                    <div className="g1-mini-grid" style={{ background: 'rgba(78, 205, 196, 0.1)', padding: '15px', borderRadius: '20px' }}>
                        <svg width="80" height="80">
                            {Array.from({ length: n1 }).map((_, i) => (
                                <circle key={i} cx={(i % 3) * 20 + 20} cy={Math.floor(i / 3) * 20 + 20} r="8" fill="#4ECDC4" />
                            ))}
                        </svg>
                    </div>
                    <div style={{ marginTop: '10px', fontWeight: 800, color: '#4ECDC4' }}>Group A</div>
                </div>
                <div style={{ fontSize: 'clamp(1.2rem, 5vw, 2rem)', fontWeight: 900, color: '#CBD5E0' }}>VS</div>
                <div style={{ textAlign: 'center' }}>
                    <div className="g1-mini-grid" style={{ background: 'rgba(255, 107, 107, 0.1)', padding: '15px', borderRadius: '20px' }}>
                        <svg width="80" height="80">
                            {Array.from({ length: n2 }).map((_, i) => (
                                <circle key={i} cx={(i % 3) * 20 + 20} cy={Math.floor(i / 3) * 20 + 20} r="8" fill="#FF6B6B" />
                            ))}
                        </svg>
                    </div>
                    <div style={{ marginTop: '10px', fontWeight: 800, color: '#FF6B6B' }}>Group B</div>
                </div>
            </div>
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

const Numbers1to9 = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const skillId = queryParams.get('skillId');

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
    const [userInput, setUserInput] = useState('');
    const [showExplanationModal, setShowExplanationModal] = useState(false);

    const getTopicInfo = () => {
        const grade1Config = TOPIC_CONFIGS['1'];
        for (const [topicName, skills] of Object.entries(grade1Config)) {
            const skill = skills.find(s => s.id === skillId);
            if (skill) return { topicName, skillName: skill.name };
        }
        return { topicName: 'Practice', skillName: 'Mathematics' };
    };

    const { topicName, skillName } = getTopicInfo();

    const generateQuestions = (selectedSkill) => {
        const questions = [];
        const colors = ['#FF6B6B', '#4ECDC4', '#FFE66D', '#98D8C8', '#C9A9E9'];
        const objTypes = ['circle', 'star', 'square'];

        for (let i = 0; i < TOTAL_QUESTIONS; i++) {
            let question = {};

            if (selectedSkill === 'G1-CH2-01' || !selectedSkill) {
                // Counting objects
                const count = Math.floor(Math.random() * 9) + 1;
                const objType = objTypes[i % objTypes.length];
                question = {
                    text: `How many ${objType}s can you count? 🔢`,
                    options: [count, (count + 1) % 10 || 1, (count - 1) || 9].filter((v, idx, self) => self.indexOf(v) === idx).sort(() => 0.5 - Math.random()),
                    correct: count,
                    type: 'counting',
                    visualData: { count, objType, color: colors[i % colors.length] },
                    explanation: `By counting carefully, we can see there are exactly ${count} ${objType}s.`
                };
            } else if (selectedSkill === 'G1-CH2-02') {
                // Number recognition
                const names = ['One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
                const num = Math.floor(Math.random() * 9) + 1;
                question = {
                    text: `What is the name of this number?`,
                    options: [names[num - 1], names[num % 9], names[(num + 2) % 9]].sort(() => 0.5 - Math.random()),
                    correct: names[num - 1],
                    type: 'recognition',
                    visualData: { num, color: colors[i % colors.length] },
                    explanation: `The number ${num} is written as '${names[num - 1].toUpperCase()}'.`
                };
            } else if (selectedSkill === 'G1-CH2-04') {
                // Comparison
                const n1 = Math.floor(Math.random() * 5) + 1;
                const n2 = Math.floor(Math.random() * 4) + 6;
                const isMore = Math.random() > 0.5;
                const correct = isMore ? (n1 > n2 ? 'Group A' : 'Group B') : (n1 < n2 ? 'Group A' : 'Group B');
                question = {
                    text: `Which group has ${isMore ? 'more' : 'fewer'} items?`,
                    options: ['Group A', 'Group B'],
                    correct: correct,
                    type: 'comparison',
                    visualData: { n1, n2 },
                    explanation: `Group A has ${n1} and Group B has ${n2}. So ${correct} clearly has ${isMore ? 'more' : 'fewer'}.`
                };
            } else if (selectedSkill === 'G1-CH2-03') {
                // Writing numbers 1-9 (Count and Write)
                const count = Math.floor(Math.random() * 9) + 1;
                const objType = objTypes[i % objTypes.length];
                question = {
                    text: `Count the items and write the number! ✍️`,
                    options: [], // No MCQ options
                    correct: count.toString(),
                    type: 'userinput',
                    visualData: { count, objType, color: colors[i % colors.length], forceCounting: true },
                    explanation: `We count ${count} items. We write this as the number ${count}.`
                };
            } else {
                question = { text: "Count the items!", options: ["1"], correct: "1", type: "counting", visualData: { count: 1, objType: 'circle', color: '#FF6B6B' }, explanation: "Counting is fun!" };
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
                const session = await api.createPracticeSession(user?.id, 'numbers-1-9');
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
            if (currentQ?.type === 'userinput') setUserInput(answers[qIndex].selectedOption);
        } else {
            setSelectedOption(null);
            setIsAnswered(false);
            setUserInput('');
        }
    }, [qIndex, answers]);

    const handleOptionSelect = (option) => {
        if (isAnswered) return;
        setSelectedOption(option);
        setIsAnswered(true);
        const isCorrect = option.toString().toLowerCase() === sessionQuestions[qIndex].correct.toString().toLowerCase();
        if (isCorrect) {
            setScore(s => s + 1);
            setMotivation(MOTIVATIONS[Math.floor(Math.random() * MOTIVATIONS.length)]);
        } else {
            setMotivation(null);
        }

        setAnswers(prev => ({
            ...prev,
            [qIndex]: { selectedOption: option, isCorrect }
        }));
        setShowExplanationModal(true);
    };

    const handleNext = async () => {
        if (qIndex < TOTAL_QUESTIONS - 1) {
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
                        total_questions: TOTAL_QUESTIONS,
                        time_spent: timer,
                        answers: Object.values(answers)
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
        return (
            <div className="grade1-practice-page">
                <Navbar />
                <div className="g1-practice-container">
                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="g1-question-card g1-results-card">
                        <div className="g1-trophy-container">🏆</div>
                        <h2 className="g1-question-text">Quest Complete!</h2>
                        <div className="results-stats">
                            <div className="g1-stat-badge">
                                <Star color="#FFD700" fill="#FFD700" />
                                <span className="g1-stat-value">{score}/{TOTAL_QUESTIONS}</span>
                            </div>
                            <div className="g1-stat-badge">
                                <Timer color="#4ECDC4" />
                                <span className="g1-stat-value">{formatTime(timer)}</span>
                            </div>
                        </div>
                        <div className="g1-next-action">
                            <button className="g1-primary-btn" onClick={() => navigate('/junior/grade/1')}>
                                Back to Map <ArrowRight />
                            </button>
                        </div>
                    </motion.div>
                </div>
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
                    {qIndex > 0 && (
                        <button className="g1-back-btn" style={{ marginLeft: '10px' }} onClick={() => setQIndex(v => v - 1)}>
                            <ChevronLeft size={20} /> Previous
                        </button>
                    )}

                    <div className="g1-timer-badge">
                        <Timer size={18} />
                        {formatTime(timer)}
                    </div>

                    <div style={{ fontWeight: 800, color: '#666', fontSize: '1rem', background: 'white', padding: '8px 15px', borderRadius: '15px', boxShadow: '0 4px 10px rgba(0,0,0,0.05)' }}>
                        Question {qIndex + 1} of {TOTAL_QUESTIONS}
                    </div>
                </div>

                <div className="g1-progress-container" style={{ margin: '0 0 30px 0' }}>
                    <div className="g1-progress-fill" style={{ width: `${((qIndex + 1) / TOTAL_QUESTIONS) * 100}%` }}></div>
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
                                {currentQ.type === 'userinput' ? (
                                    <div className="g1-input-container">
                                        <input
                                            type="text"
                                            className="g1-number-input"
                                            placeholder="?"
                                            value={userInput}
                                            onChange={(e) => setUserInput(e.target.value)}
                                            disabled={isAnswered}
                                            onKeyPress={(e) => e.key === 'Enter' && userInput && handleOptionSelect(userInput.trim())}
                                            autoFocus
                                        />
                                        <button
                                            className="g1-submit-btn"
                                            onClick={() => handleOptionSelect(userInput.trim())}
                                            disabled={isAnswered || !userInput}
                                        >
                                            Check Answer <ArrowRight size={20} />
                                        </button>
                                    </div>
                                ) : (
                                    currentQ.options.map((opt, i) => (
                                        <button
                                            key={i}
                                            className={`g1-option-btn 
                                                ${selectedOption === opt ? (opt === currentQ.correct ? 'selected-correct' : 'selected-wrong') : ''}
                                                ${isAnswered && opt === currentQ.correct ? 'revealed-correct' : ''}
                                            `}
                                            onClick={() => handleOptionSelect(opt)}
                                            disabled={isAnswered}
                                        >
                                            <LatexText text={typeof opt === 'string' ? opt : opt.toString()} />
                                        </button>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>

                    {isAnswered && (
                        <div className="flex flex-col items-center gap-4 mt-8">
                            {motivation && (
                                <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="flex flex-col items-center">
                                    <img src={mascotImg} alt="mascot" className="w-16 h-16 object-contain mb-2" />
                                    <span className="g1-motivation-text">{motivation.text}</span>
                                    <span className="g1-motivation-sub">{motivation.sub}</span>
                                </motion.div>
                            )}
                            <button className="g1-primary-btn" style={{ padding: '20px 60px', borderRadius: '40px', fontSize: '1.4rem' }} onClick={handleNext}>
                                {qIndex === TOTAL_QUESTIONS - 1 ? 'Finish Quest 🏆' : 'Next Challenge 🚀'} <ArrowRight />
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

export default Numbers1to9;

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
    if (type === 'length' || type === 'height') {
        const { l1, l2, color1, color2, label1, label2, isVertical } = data;
        return (
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="g1-measure-visual">
                <div style={{
                    display: 'flex',
                    flexDirection: isVertical ? 'row' : 'column',
                    gap: 'clamp(15px, 5vw, 30px)',
                    alignItems: isVertical ? 'flex-end' : 'flex-start',
                    justifyContent: 'center',
                    padding: 'clamp(10px, 5vw, 20px)',
                    background: 'rgba(255,255,255,0.4)',
                    borderRadius: '30px',
                    border: '2px dashed rgba(0,0,0,0.1)',
                    width: '100%'
                }}>
                    <div style={{ display: 'flex', flexDirection: isVertical ? 'column-reverse' : 'row', alignItems: 'center', gap: '15px' }}>
                        <motion.div
                            initial={{ width: 0, height: 0 }} animate={{ width: isVertical ? 25 : l1, height: isVertical ? l1 : 25 }}
                            style={{ background: `linear-gradient(${isVertical ? '0' : '90'}deg, ${color1}, ${color1}dd)`, borderRadius: '15px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}
                        />
                        <span style={{ fontWeight: 800, color: '#555', fontSize: '0.9rem' }}>{label1}</span>
                    </div>
                    <div style={{ display: 'flex', flexDirection: isVertical ? 'column-reverse' : 'row', alignItems: 'center', gap: '15px' }}>
                        <motion.div
                            initial={{ width: 0, height: 0 }} animate={{ width: isVertical ? 25 : l2, height: isVertical ? l2 : 25 }}
                            style={{ background: `linear-gradient(${isVertical ? '0' : '90'}deg, ${color2}, ${color2}dd)`, borderRadius: '15px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}
                        />
                        <span style={{ fontWeight: 800, color: '#555', fontSize: '0.9rem' }}>{label2}</span>
                    </div>
                </div>
            </motion.div>
        );
    }
    if (type === 'weight') {
        const { w1, w2, color1, color2, label1, label2 } = data;
        const tilt = w1 > w2 ? -15 : 15;
        return (
            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="g1-weight-visual">
                <div style={{ position: 'relative', width: '100%', maxWidth: '240px', height: '150px', margin: '0 auto' }}>
                    {/* Balance Beam */}
                    <motion.div
                        animate={{ rotate: tilt }}
                        style={{ position: 'absolute', top: '60px', left: '20px', width: '200px', height: '8px', background: '#8B4513', borderRadius: '4px', transformOrigin: 'center' }}
                    >
                        {/* Left Bowl */}
                        <div style={{ position: 'absolute', left: '-10px', top: '10px', width: '60px', height: '40px', background: color1 + 'dd', borderRadius: '0 0 30px 30px', border: '2px solid #555' }}>
                            <div style={{ position: 'absolute', top: '-15px', width: '100%', textAlign: 'center', fontWeight: 'bold' }}>{label1}</div>
                        </div>
                        {/* Right Bowl */}
                        <div style={{ position: 'absolute', right: '-10px', top: '10px', width: '60px', height: '40px', background: color2 + 'dd', borderRadius: '0 0 30px 30px', border: '2px solid #555' }}>
                            <div style={{ position: 'absolute', top: '-15px', width: '100%', textAlign: 'center', fontWeight: 'bold' }}>{label2}</div>
                        </div>
                    </motion.div>
                    {/* Stand */}
                    <div style={{ position: 'absolute', top: '60px', left: '115px', width: '10px', height: '80px', background: '#555', borderRadius: '5px' }} />
                    <div style={{ position: 'absolute', top: '130px', left: '90px', width: '60px', height: '10px', background: '#555', borderRadius: '5px' }} />
                </div>
            </motion.div>
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

const Measurement = () => {
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
    const [showExplanationModal, setShowExplanationModal] = useState(false);

    const getTopicInfo = () => {
        const grade1Config = TOPIC_CONFIGS['1'];
        for (const [topicName, skills] of Object.entries(grade1Config)) {
            const skill = skills.find(s => s.id === skillId);
            if (skill) return { topicName, skillName: skill.name };
        }
        return { topicName: 'Measurement', skillName: 'Mathematics' };
    };

    const { topicName, skillName } = getTopicInfo();

    const generateQuestions = (selectedSkill) => {
        const questions = [];
        const colors = ['#FF6B6B', '#4ECDC4', '#FFE66D', '#98D8C8', '#C9A9E9'];

        for (let i = 0; i < TOTAL_QUESTIONS; i++) {
            let question = {};
            const color1 = colors[i % colors.length];
            const color2 = colors[(i + 1) % colors.length];

            // Map skillId to question type
            let type = 'length';
            if (selectedSkill === 'G1-CH7-01') type = 'length';
            else if (selectedSkill === 'G1-CH7-02') type = 'height';
            else if (selectedSkill === 'G1-CH7-03') type = 'weight';
            else {
                const randomTypes = ['length', 'height', 'weight'];
                type = randomTypes[i % 3];
            }

            if (type === 'length' || type === 'height') {
                const isLonger = Math.random() > 0.5;
                const l1 = Math.floor(Math.random() * 80) + 60;
                const l2 = l1 + (Math.random() > 0.5 ? 40 : -40);
                const label1 = type === 'length' ? "Pencil A" : "Tree A";
                const label2 = type === 'length' ? "Pencil B" : "Tree B";
                const adj = type === 'length' ? (isLonger ? 'longer' : 'shorter') : (isLonger ? 'taller' : 'shorter');
                const correct = (isLonger ? (l1 > l2 ? label1 : label2) : (l1 < l2 ? label1 : label2));

                question = {
                    text: `Look at the two objects! Which one is ${adj}? 📏`,
                    options: [label1, label2].sort(() => 0.5 - Math.random()),
                    correct: correct,
                    type,
                    visualData: { l1, l2, color1, color2, label1, label2, isVertical: type === 'height' },
                    explanation: `Comparing ${label1} and ${label2}, we can see that ${correct} is definitely ${adj}.`
                };
            } else {
                const isHeavier = Math.random() > 0.5;
                const w1 = Math.floor(Math.random() * 50) + 20;
                const w2 = w1 + (Math.random() > 0.5 ? 20 : -20);
                const label1 = "Fruit A";
                const label2 = "Fruit B";
                const adj = isHeavier ? 'heavier' : 'lighter';
                const correct = (isHeavier ? (w1 > w2 ? label1 : label2) : (w1 < w2 ? label1 : label2));

                question = {
                    text: `Check the balance scale! Which one is ${adj}? ⚖️`,
                    options: [label1, label2].sort(() => 0.5 - Math.random()),
                    correct: correct,
                    type: 'weight',
                    visualData: { w1, w2, color1, color2, label1, label2 },
                    explanation: `The balance scale tilts towards the heavier object. Here, ${correct} is the ${adj} one.`
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
                const session = await api.createPracticeSession(user?.id, 'measurement-grade1');
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
        setIsAnswered(true);
        const isCorrect = option === sessionQuestions[qIndex].correct;
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
                                {currentQ.options.map((opt, i) => (
                                    <button
                                        key={i}
                                        className={`g1-option-btn 
                                            ${selectedOption === opt ? (opt === currentQ.correct ? 'selected-correct' : 'selected-wrong') : ''}
                                            ${isAnswered && opt === currentQ.correct ? 'revealed-correct' : ''}
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

export default Measurement;

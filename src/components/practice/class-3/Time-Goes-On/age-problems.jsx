import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, ArrowRight, Timer, Trophy, Star, ChevronLeft, RefreshCw, FileText, Check, X, Eye, ChevronRight, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../../../../services/api';
import Navbar from '../../../Navbar';
import { LatexText } from '../../../LatexText';
import ExplanationModal from '../../../ExplanationModal';
import StickerExit from '../../../StickerExit';
import avatarImg from '../../../../assets/avatar.png';
import '../../../../pages/juniors/class-1/Grade1Practice.css';

const SKILL_ID = 3016;
const SKILL_NAME = 'Solving Age-Based Problems';
const TOTAL_QUESTIONS = 5;

const DynamicVisual = ({ type, data }) => {
    if (type === 'age-timeline') {
        const { persons } = data; // [{name, age, color}]
        return (
            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="g1-age-timeline-visual">
                <div style={{
                    background: 'white',
                    padding: '30px',
                    borderRadius: '40px',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.08)',
                    border: '4px solid #F0F4F8',
                    maxWidth: '400px',
                    width: '100%',
                    margin: '0 auto',
                    position: 'relative'
                }}>
                    <div style={{ height: '4px', background: '#E2E8F0', borderRadius: '2px', position: 'absolute', top: '70%', left: '30px', right: '30px' }} />
                    <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'flex-end', height: '150px' }}>
                        {persons.map((p, i) => (
                            <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 1 }}>
                                <motion.div
                                    initial={{ height: 0 }}
                                    animate={{ height: p.age * 3 }}
                                    style={{
                                        width: '40px',
                                        background: p.color || '#4C51BF',
                                        borderRadius: '10px 10px 0 0',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: 'white',
                                        fontSize: '0.8rem',
                                        fontWeight: 'bold'
                                    }}
                                >
                                    {p.age}
                                </motion.div>
                                <div style={{ marginTop: '5px', fontSize: '0.9rem', fontWeight: 'bold', color: '#1E293B' }}>{p.name}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </motion.div>
        );
    }
    return null;
};

const AgeProblems = () => {
    const navigate = useNavigate();
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

    const generateQuestions = () => {
        const qs = [];
        const names = ['Riya', 'Aryan', 'Meena', 'Raj', 'Pooja', 'Dev', 'Mira', 'Sam'];
        for (let i = 0; i < TOTAL_QUESTIONS; i++) {
            const qType = i % 3;
            if (qType === 0) {
                const age1 = Math.floor(Math.random() * 10) + 5;
                const diff = Math.floor(Math.random() * 5) + 2;
                const age2 = age1 + diff;
                const n1 = names[i % names.length];
                const n2 = names[(i + 1) % names.length];
                const correct = age2.toString();
                const wrong = [age2 - 1, age2 + 1, age2 + 2].map(String);
                qs.push({
                    text: `${n1} is ${age1} years old. ${n2} is ${diff} years older than ${n1}. How old is ${n2}? 🎂`,
                    options: [correct, ...wrong].sort(() => 0.5 - Math.random()),
                    correct,
                    type: 'age-timeline',
                    visualData: { persons: [{ name: n1, age: age1, color: '#4C51BF' }, { name: n2, age: age2, color: '#FF9800' }] },
                    explanation: `${n1}'s age (${age1}) + difference (${diff}) = ${n2}'s age (${age2}).`
                });
            } else if (qType === 1) {
                const age1 = Math.floor(Math.random() * 10) + 10;
                const diff = Math.floor(Math.random() * 5) + 2;
                const age2 = age1 - diff;
                const n1 = names[i % names.length];
                const n2 = names[(i + 1) % names.length];
                const correct = age2.toString();
                const wrong = [age2 - 1, age2 + 1, age2 + 2].map(String);
                qs.push({
                    text: `${n1} is ${age1} years old. ${n2} is ${diff} years younger than ${n1}. How old is ${n2}? 🌟`,
                    options: [correct, ...wrong].sort(() => 0.5 - Math.random()),
                    correct,
                    type: 'age-timeline',
                    visualData: { persons: [{ name: n1, age: age1, color: '#4C51BF' }, { name: n2, age: age2, color: '#48BB78' }] },
                    explanation: `${n1}'s age (${age1}) - difference (${diff}) = ${n2}'s age (${age2}).`
                });
            } else {
                const presentAge = Math.floor(Math.random() * 8) + 5;
                const yearsLater = Math.floor(Math.random() * 5) + 3;
                const futureAge = presentAge + yearsLater;
                const n1 = names[i % names.length];
                const correct = futureAge.toString();
                const wrong = [futureAge - 1, futureAge + 1, futureAge + 2].map(String);
                qs.push({
                    text: `${n1} is ${presentAge} years old now. How old will ${n1} be after ${yearsLater} years? 🚀`,
                    options: [correct, ...wrong].sort(() => 0.5 - Math.random()),
                    correct,
                    type: 'age-timeline',
                    visualData: { persons: [{ name: 'Now', age: presentAge, color: '#4C51BF' }, { name: 'Future', age: futureAge, color: '#F56565' }] },
                    explanation: `Present age (${presentAge}) + years passed (${yearsLater}) = ${futureAge} years.`
                });
            }
        }
        return qs;
    };

    useEffect(() => {
        const init = async () => {
            const userId = sessionStorage.getItem('userId') || localStorage.getItem('userId');
            const qs = generateQuestions();
            setSessionQuestions(qs);
            if (userId) {
                try {
                    const session = await api.createPracticeSession(userId, SKILL_ID);
                    setSessionId(session?.session_id);
                } catch (e) { console.error(e); }
            }
        };
        init();
    }, []);

    useEffect(() => {
        let interval;
        if (!showResults && sessionQuestions.length > 0) {
            interval = setInterval(() => setTimer(v => v + 1), 1000);
        }
        return () => clearInterval(interval);
    }, [showResults, sessionQuestions]);

    const handleOptionSelect = (option) => {
        if (isAnswered) return;
        setSelectedOption(option);
    };

    const handleSubmit = () => {
        if (isAnswered || selectedOption === null) return;
        const isCorrect = selectedOption === sessionQuestions[qIndex].correct;
        setIsAnswered(true);
        if (isCorrect) setScore(s => s + 1);

        setAnswers(prev => ({
            ...prev,
            [qIndex]: {
                selectedOption,
                isCorrect,
                questionText: sessionQuestions[qIndex].text,
                correctAnswer: sessionQuestions[qIndex].correct,
                explanation: sessionQuestions[qIndex].explanation,
                type: sessionQuestions[qIndex].type,
                visualData: sessionQuestions[qIndex].visualData
            }
        }));

        const userId = sessionStorage.getItem('userId') || localStorage.getItem('userId');
        if (userId && sessionId) {
            api.recordAttempt({
                user_id: parseInt(userId, 10),
                session_id: sessionId,
                skill_id: SKILL_ID,
                difficulty_level: 'Medium',
                question_text: sessionQuestions[qIndex].text,
                correct_answer: sessionQuestions[qIndex].correct,
                student_answer: selectedOption,
                is_correct: isCorrect,
                solution_text: sessionQuestions[qIndex].explanation,
                time_spent_seconds: timer
            }).catch(console.error);
        }

        setShowExplanationModal(true);
    };

    const handleNext = () => {
        if (qIndex < TOTAL_QUESTIONS - 1) {
            setQIndex(v => v + 1);
            setIsAnswered(false);
            setSelectedOption(null);
            setShowExplanationModal(false);
        } else {
            setShowResults(true);
            finishSession();
        }
    };

    const finishSession = async () => {
        if (sessionId) await api.finishSession(sessionId).catch(console.error);
        const userId = sessionStorage.getItem('userId') || localStorage.getItem('userId');
        if (userId) {
            await api.createReport({
                uid: userId,
                category: 'Practice',
                reportData: {
                    skill_id: SKILL_ID,
                    skill_name: SKILL_NAME,
                    score: Math.round((score / TOTAL_QUESTIONS) * 100),
                    total_questions: TOTAL_QUESTIONS,
                    correct_answers: score,
                    time_spent: timer,
                    timestamp: new Date().toISOString(),
                    answers: Object.values(answers)
                }
            }).catch(console.error);
        }
    };

    const formatTime = (s) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`;

    if (sessionQuestions.length === 0) return <div className="grade1-practice-page"><div className="g1-loading-blob" /></div>;

    if (showResults) {
        const percentage = Math.round((score / TOTAL_QUESTIONS) * 100);
        return (
            <div className="grade1-practice-page results-view overflow-y-auto">
                <Navbar />
                <header className="results-header">
                    <h1 className="results-title">Adventure Report</h1>
                    <div className="exit-container">
                        <StickerExit onClick={() => navigate('/junior/grade/3')} />
                    </div>
                </header>
                <main className="results-content">
                    <div className="results-hero-section">
                        <img src={avatarImg} alt="Mascot" style={{ width: '120px', height: '120px', margin: '0 auto 20px' }} />
                        <h2 style={{ fontSize: '2.5rem', color: '#31326F' }}>Quest Complete! 🎉</h2>
                        <div className="stars-container">
                            {[1, 2, 3].map(i => (
                                <Star key={i} size={60} fill={percentage >= (i * 33) ? "#FFD700" : "#EDF2F7"} color={percentage >= (i * 33) ? "#F6AD55" : "#CBD5E0"} />
                            ))}
                        </div>
                        <div className="results-stats-grid">
                            <div className="stat-card"><span className="stat-label">Correct</span><span className="stat-value-large">{score}/{TOTAL_QUESTIONS}</span></div>
                            <div className="stat-card"><span className="stat-label">Time</span><span className="stat-value-large">{formatTime(timer)}</span></div>
                            <div className="stat-card"><span className="stat-label">Accuracy</span><span className="stat-value-large">{percentage}%</span></div>
                        </div>
                    </div>
                    <div className="results-actions">
                        <button className="action-btn-large retake-skill-btn" onClick={() => window.location.reload()}><RefreshCw size={24} /> Retake</button>
                        <button className="action-btn-large back-topics-btn" onClick={() => navigate('/junior/grade/3')}><FileText size={24} /> Back to Syllabus</button>
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
                    <div className="g1-timer-badge"><Timer size={18} /> {formatTime(timer)}</div>
                    <div className="g1-progress-container">
                        <div className="g1-progress-fill" style={{ width: `${((qIndex + 1) / TOTAL_QUESTIONS) * 100}%` }}></div>
                    </div>
                    <div className="exit-practice-sticker"><StickerExit onClick={() => navigate('/junior/grade/3')} /></div>
                </div>

                <div className="g1-topic-header-compact" style={{ textAlign: 'center', margin: '10px 0', fontSize: '0.9rem', color: '#64748B', textTransform: 'uppercase', letterSpacing: '2px' }}>{SKILL_NAME}</div>

                <motion.div key={qIndex} initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="g1-question-card">
                    <h2 className="g1-question-text">{currentQ.text}</h2>
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
                                            ${selectedOption === opt ? (isAnswered ? (opt === currentQ.correct ? 'selected-correct' : 'selected-wrong') : 'selected-test') : ''}
                                            ${isAnswered && opt === currentQ.correct ? 'revealed-correct' : ''}
                                        `}
                                        onClick={() => handleOptionSelect(opt)}
                                        disabled={isAnswered}
                                    >
                                        {opt}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="g1-navigation-footer" style={{ marginTop: '30px', display: 'flex', justifyContent: 'space-between' }}>
                        <button className="g1-nav-btn prev-btn" onClick={() => qIndex > 0 && setQIndex(qIndex - 1)} disabled={qIndex === 0 || isAnswered}>
                            <ChevronLeft size={24} /> Prev
                        </button>
                        <div>
                            {!isAnswered ? (
                                <button className="g1-nav-btn submit-btn" onClick={handleSubmit} disabled={selectedOption === null}>
                                    Submit <Check size={24} />
                                </button>
                            ) : (
                                <button className="g1-nav-btn next-btn" onClick={handleNext}>
                                    {qIndex === TOTAL_QUESTIONS - 1 ? 'Finish' : 'Next'} <ChevronRight size={24} />
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
                onNext={handleNext}
            />
        </div>
    );
};

export default AgeProblems;

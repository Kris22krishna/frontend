import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, ArrowRight, Timer, Trophy, Star, ChevronLeft, RefreshCw, FileText, Check, X, Eye, ChevronRight, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../../../../services/api';
import Navbar from '../../../Navbar';
import { LatexText } from '../../../LatexText';
import ExplanationModal from '../../../ExplanationModal';
import StickerExit from '../../../StickerExit';
import avatarImg from '../../../../assets/avatar.png';
import '../../../../pages/juniors/class-1/Grade1Practice.css';

const SKILL_ID = 3015;
const SKILL_NAME = 'Comparing Calendars & Identifying Patterns';
const TOTAL_QUESTIONS = 5;

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const DynamicVisual = ({ type, data }) => {
    if (type === 'calendar-pattern') {
        const { startDay1, startDay2, label1, label2, highlightDate } = data;
        const renderMiniCal = (startDay, label) => {
            const cells = [];
            for (let i = 0; i < startDay; i++) cells.push(null);
            for (let i = 1; i <= 28; i++) cells.push(i);
            return (
                <div style={{
                    background: 'white',
                    padding: '10px',
                    borderRadius: '20px',
                    boxShadow: '0 5px 15px rgba(0,0,0,0.05)',
                    border: '2px solid #E2E8F0',
                    width: '160px'
                }}>
                    <div style={{ fontSize: '0.8rem', fontWeight: 'bold', textAlign: 'center', marginBottom: '8px', color: '#4C51BF' }}>{label}</div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '2px', textAlign: 'center' }}>
                        {DAYS.map(d => <div key={d} style={{ fontSize: '0.5rem', color: '#94A3B8' }}>{d}</div>)}
                        {cells.map((day, i) => (
                            <div key={i} style={{
                                height: '18px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '0.6rem',
                                color: day === highlightDate ? 'white' : '#334155',
                                background: day === highlightDate ? '#FF9800' : 'transparent',
                                borderRadius: '4px'
                            }}>
                                {day}
                            </div>
                        ))}
                    </div>
                </div>
            );
        };

        return (
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="g1-pattern-visual">
                <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', alignItems: 'center', padding: '20px' }}>
                    {renderMiniCal(startDay1, label1)}
                    <motion.div animate={{ x: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 1 }}>VS</motion.div>
                    {renderMiniCal(startDay2, label2)}
                </div>
                <div style={{ textAlign: 'center', color: '#64748B', fontSize: '0.8rem', fontStyle: 'italic', marginTop: '10px' }}>
                    Spot the similarities and differences!
                </div>
            </motion.div>
        );
    }
    if (type === 'week-repeater') {
        return (
            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} style={{ padding: '20px', textAlign: 'center' }}>
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                    background: 'white',
                    padding: '20px',
                    borderRadius: '30px',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
                    maxWidth: '300px',
                    margin: '0 auto'
                }}>
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d, i) => (
                        <motion.div
                            key={d}
                            animate={{ x: [0, 5, 0] }}
                            transition={{ delay: i * 0.1, repeat: Infinity, duration: 2 }}
                            style={{
                                background: i === 0 || i === 6 ? '#FFF1F2' : '#F0F9FF',
                                padding: '8px',
                                borderRadius: '10px',
                                fontSize: '0.9rem',
                                fontWeight: 'bold',
                                color: i === 0 || i === 6 ? '#F43F5E' : '#0EA5E9',
                                border: '1px solid currentColor'
                            }}
                        >
                            {d}
                        </motion.div>
                    ))}
                    <div style={{ fontSize: '1.5rem', marginTop: '10px' }}>♻️ REPEATS</div>
                </div>
            </motion.div>
        );
    }
    return null;
};

const ComparingCalendars = () => {
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
        for (let i = 0; i < TOTAL_QUESTIONS; i++) {
            const qType = i % 4;
            if (qType === 0) {
                const correct = 'The months and their number of days';
                const wrong = ['The year number', 'The names of the days', 'The total number of weeks'];
                qs.push({
                    text: 'What always stays the SAME in every year\'s calendar? 🗓️',
                    options: [correct, ...wrong].sort(() => 0.5 - Math.random()),
                    correct,
                    type: 'calendar-pattern',
                    visualData: { startDay1: 1, startDay2: 3, label1: 'Year 2024', label2: 'Year 2025', highlightDate: null },
                    explanation: 'Every year has the same 12 months with the same number of days (like Jan-31, Feb-28/29). Only the day of the week changes.'
                });
            } else if (qType === 1) {
                const correct = 'The day of the week each date falls on';
                const wrong = ['The number of months', 'The names of the months', 'The order of months'];
                qs.push({
                    text: 'What CHANGES from year to year in a calendar? 🔄',
                    options: [correct, ...wrong].sort(() => 0.5 - Math.random()),
                    correct,
                    type: 'calendar-pattern',
                    visualData: { startDay1: 2, startDay2: 4, label1: 'Last Year', label2: 'This Year', highlightDate: 1 },
                    explanation: 'The 1st of January might be a Monday one year and a Wednesday the next year. The days shift!'
                });
            } else if (qType === 2) {
                const correct = '7';
                const wrong = ['5', '6', '12'];
                qs.push({
                    text: 'Every week has the same repeating pattern. How many days are in each week? 🌟',
                    options: [correct, ...wrong].sort(() => 0.5 - Math.random()),
                    correct,
                    type: 'week-repeater',
                    visualData: {},
                    explanation: 'A week always has exactly 7 days, from Sunday to Saturday.'
                });
            } else {
                const startDay = Math.floor(Math.random() * 7);
                const dayName = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][startDay];
                const correct = dayName;
                const wrong = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].filter(d => d !== dayName).sort(() => 0.5 - Math.random()).slice(0, 3);
                qs.push({
                    text: `If the 1st of a month is a ${dayName}, what day of the week will the 8th of the same month be? 🔍`,
                    options: [correct, ...wrong].sort(() => 0.5 - Math.random()),
                    correct,
                    type: 'calendar-pattern',
                    visualData: { startDay1: startDay, startDay2: startDay, label1: 'Week 1', label2: 'Week 2', highlightDate: 1 },
                    explanation: `8 - 1 = 7 days. 7 days is exactly one week, so the day of the week repeats! It will still be a ${dayName}.`
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

export default ComparingCalendars;

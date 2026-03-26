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

const SKILL_ID = 3014;
const SKILL_NAME = 'Understanding Months, Days, and Year Structure';
const TOTAL_QUESTIONS = 5;

const MONTHS = [
    { name: 'January', days: 31, season: 'Winter' },
    { name: 'February', days: 28, season: 'Winter' },
    { name: 'March', days: 31, season: 'Spring' },
    { name: 'April', days: 30, season: 'Spring' },
    { name: 'May', days: 31, season: 'Summer' },
    { name: 'June', days: 30, season: 'Summer' },
    { name: 'July', days: 31, season: 'Summer' },
    { name: 'August', days: 31, season: 'Monsoon' },
    { name: 'September', days: 30, season: 'Monsoon' },
    { name: 'October', days: 31, season: 'Autumn' },
    { name: 'November', days: 30, season: 'Autumn' },
    { name: 'December', days: 31, season: 'Winter' }
];

const DynamicVisual = ({ type, data }) => {
    if (type === 'month-grid') {
        return (
            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="g1-month-grid-visual">
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: '10px',
                    background: 'white',
                    padding: '20px',
                    borderRadius: '30px',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
                    border: '4px solid #F0F4F8',
                    maxWidth: '400px',
                    margin: '0 auto'
                }}>
                    {MONTHS.map((m, i) => (
                        <div key={m.name} style={{
                            padding: '8px',
                            borderRadius: '12px',
                            background: data?.highlight === m.name ? '#FF9800' : '#F8FAFC',
                            color: data?.highlight === m.name ? 'white' : '#334155',
                            fontSize: '0.7rem',
                            textAlign: 'center',
                            fontWeight: 'bold',
                            border: data?.highlight === m.name ? 'none' : '1px solid #E2E8F0'
                        }}>
                            {m.name.substring(0, 3)}
                        </div>
                    ))}
                </div>
            </motion.div>
        );
    }
    if (type === 'year-summary') {
        return (
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="g1-year-summary-visual">
                <div style={{
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    color: 'white',
                    padding: '30px',
                    borderRadius: '40px',
                    textAlign: 'center',
                    boxShadow: '0 20px 40px rgba(118, 75, 162, 0.3)',
                    maxWidth: '350px',
                    margin: '0 auto'
                }}>
                    <div style={{ fontSize: '1.2rem', marginBottom: '10px', opacity: 0.9 }}>1 Whole Year has...</div>
                    <div style={{ fontSize: '3rem', fontWeight: 900, marginBottom: '5px' }}>12</div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>MONTHS</div>
                    <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center', gap: '15px' }}>
                        <div style={{ background: 'rgba(255,255,255,0.2)', padding: '10px', borderRadius: '15px' }}>
                            <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>365</div>
                            <div style={{ fontSize: '0.6rem' }}>DAYS</div>
                        </div>
                        <div style={{ background: 'rgba(255,255,255,0.2)', padding: '10px', borderRadius: '15px' }}>
                            <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>52</div>
                            <div style={{ fontSize: '0.6rem' }}>WEEKS</div>
                        </div>
                    </div>
                </div>
            </motion.div>
        );
    }
    return null;
};

const MonthsDaysYear = () => {
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
                const month = MONTHS[Math.floor(Math.random() * 12)];
                const correct = month.days.toString();
                const wrong = [30, 31, 28, 29].filter(d => d !== month.days).map(String).slice(0, 3);
                qs.push({
                    text: `How many days does the month of ${month.name} have? 📅`,
                    options: [correct, ...wrong].sort(() => 0.5 - Math.random()),
                    correct,
                    type: 'month-grid',
                    visualData: { highlight: month.name },
                    explanation: `${month.name} is one of the months that has ${correct} days.`
                });
            } else if (qType === 1) {
                const startIdx = Math.floor(Math.random() * 10);
                const nextMonth = MONTHS[startIdx + 1].name;
                const correct = nextMonth;
                const wrong = MONTHS.map(m => m.name).filter(n => n !== correct && n !== MONTHS[startIdx].name).sort(() => 0.5 - Math.random()).slice(0, 3);
                qs.push({
                    text: `Which month comes immediately after ${MONTHS[startIdx].name}? ➡️`,
                    options: [correct, ...wrong].sort(() => 0.5 - Math.random()),
                    correct,
                    type: 'month-grid',
                    visualData: { highlight: MONTHS[startIdx].name },
                    explanation: `After ${MONTHS[startIdx].name}, the next month in the calendar is ${correct}.`
                });
            } else if (qType === 2) {
                const correct = '12';
                const wrong = ['10', '7', '365'];
                qs.push({
                    text: `How many months are there in one year? 🌟`,
                    options: [correct, ...wrong].sort(() => 0.5 - Math.random()),
                    correct,
                    type: 'year-summary',
                    visualData: {},
                    explanation: `There are always 12 months in a year, from January to December.`
                });
            } else {
                const monthIdx = Math.floor(Math.random() * 12);
                const correct = (monthIdx + 1).toString();
                const wrong = [monthIdx, monthIdx + 2, monthIdx + 3].filter(v => v > 0 && v <= 12 && v !== monthIdx + 1).map(String);
                qs.push({
                    text: `${MONTHS[monthIdx].name} is the _______ month of the year. 🏅`,
                    options: [correct + 'th', (monthIdx).toString() + 'th', (monthIdx + 2).toString() + 'th'].sort(() => 0.5 - Math.random()),
                    correct: correct + 'th',
                    type: 'month-grid',
                    visualData: { highlight: MONTHS[monthIdx].name },
                    explanation: `If you count from January (1st), ${MONTHS[monthIdx].name} is the ${correct}th month.`
                });
                // Fix the "th" for 1, 2, 3
                const ord = (n) => {
                    if (n === '1') return '1st';
                    if (n === '2') return '2nd';
                    if (n === '3') return '3rd';
                    return n + 'th';
                };
                qs[qs.length - 1].correct = ord(correct);
                qs[qs.length - 1].options = [ord(correct), ord(String(monthIdx)), ord(String(monthIdx + 2))].sort(() => 0.5 - Math.random());
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
                difficulty_level: 'Easy',
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

export default MonthsDaysYear;

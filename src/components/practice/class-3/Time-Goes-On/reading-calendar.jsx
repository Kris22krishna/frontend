import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, ArrowRight, Timer, Trophy, Star, ChevronLeft, RefreshCw, FileText, Check, X, Eye, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../../../../services/api';
import Navbar from '../../../Navbar';
import { LatexText } from '../../../LatexText';
import ExplanationModal from '../../../ExplanationModal';
import StickerExit from '../../../StickerExit';
import mascotImg from '../../../../assets/mascot.png';
import avatarImg from '../../../../assets/avatar.png';
import '../../../../pages/juniors/class-1/Grade1Practice.css';

const SKILL_ID = 3011;
const SKILL_NAME = 'Reading Days & Dates from a Calendar';
const TOTAL_QUESTIONS = 5;

const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const DynamicVisual = ({ type, data }) => {
    if (type === 'calendar') {
        const { startDay, numDays, highlightDate, month } = data;
        const cellW = 36, cellH = 30;
        const shortDays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

        return (
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="g1-calendar-visual">
                <div style={{
                    background: 'white',
                    padding: '20px',
                    borderRadius: '30px',
                    boxShadow: '0 15px 35px rgba(0,0,0,0.1)',
                    border: '4px solid #FFEDD5',
                    maxWidth: '320px',
                    width: '100%'
                }}>
                    <div style={{
                        background: '#FF9800',
                        color: 'white',
                        padding: '10px',
                        borderRadius: '15px 15px 5px 5px',
                        textAlign: 'center',
                        fontWeight: '800',
                        fontSize: '1.2rem',
                        marginBottom: '10px',
                        textTransform: 'uppercase'
                    }}>
                        {month}
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '2px' }}>
                        {shortDays.map(d => (
                            <div key={d} style={{ textAlign: 'center', fontSize: '0.7rem', fontWeight: 'bold', color: '#E65100', paddingBottom: '5px' }}>{d}</div>
                        ))}
                        {Array.from({ length: 42 }).map((_, i) => {
                            const dayNum = i - startDay + 1;
                            const isVoid = dayNum < 1 || dayNum > numDays;
                            const isSunday = i % 7 === 0;
                            const isHighlight = dayNum === highlightDate;

                            return (
                                <div key={i} style={{
                                    height: '35px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderRadius: '8px',
                                    fontSize: '0.9rem',
                                    background: isHighlight ? '#FF9800' : 'transparent',
                                    color: isHighlight ? 'white' : (isSunday ? '#EF5350' : '#37474F'),
                                    fontWeight: isHighlight ? 'bold' : 'normal',
                                    border: isHighlight ? 'none' : (isVoid ? 'none' : '1px solid #FFF3E0')
                                }}>
                                    {!isVoid && dayNum}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </motion.div>
        );
    }
    return null;
};

const ReadingCalendar = () => {
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
            const startDay = Math.floor(Math.random() * 7);
            const numDays = 30 + (i % 2); // 30 or 31
            const highlightDate = Math.floor(Math.random() * numDays) + 1;
            const month = MONTHS[Math.floor(Math.random() * 12)];
            const dayOfWeek = DAYS[(startDay + highlightDate - 1) % 7];

            const qType = i % 3;
            if (qType === 0) {
                const wrongDays = DAYS.filter(d => d !== dayOfWeek).sort(() => 0.5 - Math.random()).slice(0, 3);
                qs.push({
                    text: `Look at the calendar for ${month}. What day of the week is the ${highlightDate}th? 📅`,
                    options: [dayOfWeek, ...wrongDays].sort(() => 0.5 - Math.random()),
                    correct: dayOfWeek,
                    type: 'calendar',
                    visualData: { startDay, numDays, highlightDate, month },
                    explanation: `On the calendar, find the number ${highlightDate}. Look up to see the day column. It's a ${dayOfWeek}!`
                });
            } else if (qType === 1) {
                const targetDay = DAYS[Math.floor(Math.random() * 7)];
                let firstDate = -1;
                for (let d = 1; d <= 7; d++) {
                    if (DAYS[(startDay + d - 1) % 7] === targetDay) { firstDate = d; break; }
                }
                const wrongDates = [firstDate + 7, firstDate + 1, firstDate + 14].filter(d => d <= numDays && d !== firstDate).slice(0, 3);
                qs.push({
                    text: `In this month of ${month}, on which date does the first ${targetDay} fall? 🎯`,
                    options: [firstDate.toString(), ...wrongDates.map(String)].sort(() => 0.5 - Math.random()),
                    correct: firstDate.toString(),
                    type: 'calendar',
                    visualData: { startDay, numDays, highlightDate: null, month },
                    explanation: `Find the column for ${targetDay}. The very first number in that column is ${firstDate}.`
                });
            } else {
                const sundays = [];
                for (let d = 1; d <= numDays; d++) {
                    if (DAYS[(startDay + d - 1) % 7] === 'Sunday') sundays.push(d);
                }
                const correctCount = sundays.length.toString();
                const wrongCounts = [correctCount === '4' ? '5' : '4', '3', '6'].filter(c => c !== correctCount).slice(0, 3);
                qs.push({
                    text: `How many Sundays are there in this month of ${month}? 🏠`,
                    options: [correctCount, ...wrongCounts].sort(() => 0.5 - Math.random()),
                    correct: correctCount,
                    type: 'calendar',
                    visualData: { startDay, numDays, highlightDate: null, month },
                    explanation: `Count all the numbers in the first column (Su). There are ${correctCount} Sundays!`
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

export default ReadingCalendar;

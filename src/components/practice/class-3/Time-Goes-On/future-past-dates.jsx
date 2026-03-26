import React, { useState, useEffect, useRef } from 'react';
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

const SKILL_ID = 3012;
const SKILL_NAME = 'Calculating Future & Past Dates';
const TOTAL_QUESTIONS = 5;

const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const DynamicVisual = ({ type, data }) => {
    if (type === 'timeline') {
        const { startValue, offset, unit, label, isFuture } = data;
        return (
            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="g1-timeline-visual">
                <div style={{
                    background: 'white',
                    padding: '30px',
                    borderRadius: '40px',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.08)',
                    border: '4px solid #F0F4F8',
                    maxWidth: '400px',
                    width: '100%',
                    position: 'relative',
                    margin: '0 auto'
                }}>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '20px', marginBottom: '30px' }}>
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: '0.8rem', color: '#64748B', marginBottom: '5px' }}>START</div>
                            <div style={{ background: '#EEF2FF', padding: '15px 20px', borderRadius: '20px', border: '3px solid #C3DAFE', color: '#31326F', fontWeight: 'bold' }}>
                                {startValue}
                            </div>
                        </div>
                        <motion.div animate={{ x: isFuture ? [0, 10, 0] : [0, -10, 0] }} transition={{ repeat: Infinity, duration: 1.5 }} style={{ fontSize: '2rem' }}>
                            {isFuture ? '➡️' : '⬅️'}
                        </motion.div>
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: '0.8rem', color: '#64748B', marginBottom: '5px' }}>{isFuture ? 'AFTER' : 'BEFORE'}</div>
                            <div style={{ background: '#FFF5F5', padding: '15px 20px', borderRadius: '20px', border: '3px solid #FED7D7', color: '#E53E3E', fontWeight: 'bold' }}>
                                {offset} {unit}{offset > 1 ? 's' : ''}
                            </div>
                        </div>
                    </div>
                    <div style={{ height: '8px', background: '#E2E8F0', borderRadius: '4px', position: 'relative', margin: '0 20px' }}>
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: '100%' }}
                            transition={{ duration: 1 }}
                            style={{ position: 'absolute', height: '100%', background: '#4C51BF', borderRadius: '4px', left: 0 }}
                        />
                        <div style={{ position: 'absolute', left: '-5px', top: '-6px', width: '20px', height: '20px', background: '#4C51BF', borderRadius: '50%', border: '4px solid white' }} />
                        <motion.div
                            animate={{ left: '95%' }}
                            transition={{ duration: 1 }}
                            style={{ position: 'absolute', top: '-6px', width: '20px', height: '20px', background: isFuture ? '#48BB78' : '#F56565', borderRadius: '50%', border: '4px solid white', left: '95%' }}
                        />
                    </div>
                    <div style={{ textAlign: 'center', marginTop: '20px', color: '#4A5568', fontStyle: 'italic' }}>
                        {label}
                    </div>
                </div>
            </motion.div>
        );
    }
    return null;
};

const FuturePastDates = () => {
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
                const startDate = Math.floor(Math.random() * 20) + 1;
                const offset = Math.floor(Math.random() * 8) + 2;
                const month = MONTHS[Math.floor(Math.random() * 12)];
                const correct = (startDate + offset).toString();
                const wrong = [startDate + offset + 1, startDate + offset - 1, startDate + offset + 2].map(String);
                qs.push({
                    text: `Today is the ${startDate}th of ${month}. What will be the date after ${offset} days? 📅`,
                    options: [correct, ...wrong].sort(() => 0.5 - Math.random()),
                    correct,
                    type: 'timeline',
                    visualData: { startValue: `${startDate} ${month.substring(0, 3)}`, offset, unit: 'day', label: 'Going forward in time!', isFuture: true },
                    explanation: `${startDate} + ${offset} = ${startDate + offset}. So the date will be the ${correct}th.`
                });
            } else if (qType === 1) {
                const startDate = Math.floor(Math.random() * 15) + 10;
                const offset = Math.floor(Math.random() * 7) + 2;
                const month = MONTHS[Math.floor(Math.random() * 12)];
                const correct = (startDate - offset).toString();
                const wrong = [startDate - offset + 1, startDate - offset - 1, startDate - offset + 2].map(String);
                qs.push({
                    text: `Today is the ${startDate}th of ${month}. What was the date ${offset} days ago? ⬅️`,
                    options: [correct, ...wrong].sort(() => 0.5 - Math.random()),
                    correct,
                    type: 'timeline',
                    visualData: { startValue: `${startDate} ${month.substring(0, 3)}`, offset, unit: 'day', label: 'Going back in time!', isFuture: false },
                    explanation: `${startDate} - ${offset} = ${startDate - offset}. So the date was the ${correct}th.`
                });
            } else if (qType === 2) {
                const startDayIdx = Math.floor(Math.random() * 7);
                const offset = Math.floor(Math.random() * 5) + 2;
                const correct = DAYS[(startDayIdx + offset) % 7];
                const wrong = DAYS.filter(d => d !== correct).sort(() => 0.5 - Math.random()).slice(0, 3);
                qs.push({
                    text: `Today is ${DAYS[startDayIdx]}. What day of the week will it be after ${offset} days? 🌟`,
                    options: [correct, ...wrong].sort(() => 0.5 - Math.random()),
                    correct,
                    type: 'timeline',
                    visualData: { startValue: DAYS[startDayIdx], offset, unit: 'day', label: `Counting ${offset} days ahead!`, isFuture: true },
                    explanation: `Starting from ${DAYS[startDayIdx]}, count ${offset} days: ${Array.from({ length: offset }, (_, i) => DAYS[(startDayIdx + i + 1) % 7]).join(' → ')}. It's ${correct}!`
                });
            } else {
                const startDay = Math.floor(Math.random() * 15) + 1;
                const weeks = Math.floor(Math.random() * 2) + 1;
                const offset = weeks * 7;
                const month = MONTHS[Math.floor(Math.random() * 12)];
                const correct = (startDay + offset).toString();
                const wrong = [startDay + weeks, startDay + offset + 1, startDay + offset - 1].map(String);
                qs.push({
                    text: `Your birthday is exactly ${weeks} week${weeks > 1 ? 's' : ''} from now. If today is the ${startDay}th of ${month}, on what date is your birthday? 🎂`,
                    options: [correct, ...wrong].sort(() => 0.5 - Math.random()),
                    correct,
                    type: 'timeline',
                    visualData: { startValue: `${startDay} ${month.substring(0, 3)}`, offset: weeks, unit: 'week', label: `${weeks} weeks = ${weeks * 7} days!`, isFuture: true },
                    explanation: `${weeks} weeks is ${weeks * 7} days. ${startDay} + ${weeks * 7} = ${startDay + offset}. The date is the ${correct}th.`
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

export default FuturePastDates;

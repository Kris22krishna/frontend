import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, ArrowRight, Timer, Trophy, Star, ChevronLeft, RefreshCw, FileText, Check, X, Eye, ChevronRight, History } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../../../../services/api';
import Navbar from '../../../Navbar';
import { LatexText } from '../../../LatexText';
import ExplanationModal from '../../../ExplanationModal';
import StickerExit from '../../../StickerExit';
import avatarImg from '../../../../assets/avatar.png';
import '../../../../pages/juniors/class-1/Grade1Practice.css';

const SKILL_ID = 3018;
const SKILL_NAME = 'Calculating Age & Duration Between Dates';
const TOTAL_QUESTIONS = 5;

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const DynamicVisual = ({ type, data }) => {
    if (type === 'duration-timeline') {
        const { startLabel, endLabel, durationText } = data;
        return (
            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="g1-duration-visual">
                <div style={{
                    background: 'white',
                    padding: '40px 30px',
                    borderRadius: '40px',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.05)',
                    border: '4px solid #F0F4F8',
                    maxWidth: '400px',
                    width: '100%',
                    margin: '0 auto',
                    textAlign: 'center'
                }}>
                    <div style={{ position: 'relative', height: '60px', marginBottom: '20px' }}>
                        <div style={{ position: 'absolute', top: '50%', left: '0', right: '0', height: '6px', background: '#E2E8F0', borderRadius: '3px' }} />
                        <div style={{ position: 'absolute', top: '20%', bottom: '20%', left: '20%', right: '20%', background: 'rgba(76, 81, 191, 0.1)', border: '2px dashed #4C51BF', borderRadius: '10px' }} />

                        <div style={{ position: 'absolute', left: '15%', top: '50%', transform: 'translateY(-50%)' }}>
                            <div style={{ width: '20px', height: '20px', background: '#4C51BF', borderRadius: '50%', border: '4px solid white', boxShadow: '0 0 10px rgba(76, 81, 191, 0.5)' }} />
                            <div style={{ marginTop: '10px', fontSize: '0.9rem', fontWeight: 'bold' }}>{startLabel}</div>
                        </div>

                        <div style={{ position: 'absolute', right: '15%', top: '50%', transform: 'translateY(-50%)' }}>
                            <div style={{ width: '20px', height: '20px', background: '#FF9800', borderRadius: '50%', border: '4px solid white', boxShadow: '0 0 10px rgba(255, 152, 0, 0.5)' }} />
                            <div style={{ marginTop: '10px', fontSize: '0.9rem', fontWeight: 'bold' }}>{endLabel}</div>
                        </div>

                        <div style={{ position: 'absolute', left: '50%', top: '0', transform: 'translateX(-50%)' }}>
                            <motion.div
                                animate={{ y: [0, -5, 0] }}
                                transition={{ repeat: Infinity, duration: 1.5 }}
                                style={{ background: '#4C51BF', color: 'white', padding: '4px 12px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 'bold' }}
                            >
                                {durationText || '?'}
                            </motion.div>
                        </div>
                    </div>
                </div>
            </motion.div>
        );
    }
    return null;
};

const AgeDuration = () => {
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
        const names = ['Aryan', 'Riya', 'Sam', 'Mona', 'Dev'];
        for (let i = 0; i < TOTAL_QUESTIONS; i++) {
            const qType = i % 3;
            if (qType === 0) {
                const startYear = Math.floor(Math.random() * 5) + 2015;
                const endYear = startYear + Math.floor(Math.random() * 5) + 2;
                const diff = endYear - startYear;
                const name = names[i % names.length];
                const correct = diff.toString() + ' years';
                const wrong = [diff - 1, diff + 1, diff + 2].map(v => v + ' years');
                qs.push({
                    text: `${name} joined school in ${startYear}. If it is now ${endYear}, how many years has ${name} been in school? 🏫`,
                    options: [correct, ...wrong].sort(() => 0.5 - Math.random()),
                    correct,
                    type: 'duration-timeline',
                    visualData: { startLabel: startYear, endLabel: endYear, durationText: null },
                    explanation: `${endYear} - ${startYear} = ${diff} years.`
                });
            } else if (qType === 1) {
                const m1 = Math.floor(Math.random() * 6);
                const diff = Math.floor(Math.random() * 4) + 2;
                const m2 = m1 + diff;
                const correct = diff.toString() + ' months';
                const wrong = [diff - 1, diff + 1, diff + 2].map(v => v + ' months');
                qs.push({
                    text: `A summer project started in ${MONTHS[m1]} and finished in ${MONTHS[m2]}. How many months did it take? 🌻`,
                    options: [correct, ...wrong].sort(() => 0.5 - Math.random()),
                    correct,
                    type: 'duration-timeline',
                    visualData: { startLabel: MONTHS[m1].substring(0, 3), endLabel: MONTHS[m2].substring(0, 3), durationText: null },
                    explanation: `From ${MONTHS[m1]} to ${MONTHS[m2]} is ${diff} months.`
                });
            } else {
                const years = Math.floor(Math.random() * 4) + 1;
                const correct = (years * 12).toString() + ' months';
                const wrong = [years * 10, (years + 1) * 12, years * 12 + 6].map(v => v + ' months');
                qs.push({
                    text: `If a baby is ${years} year(s) old, how many months old are they? 👶`,
                    options: [correct, ...wrong].sort(() => 0.5 - Math.random()),
                    correct,
                    type: 'duration-timeline',
                    visualData: { startLabel: 'Birth', endLabel: years + ' Year(s)', durationText: null },
                    explanation: `1 year = 12 months. So, ${years} year(s) = ${years} × 12 = ${years * 12} months.`
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

export default AgeDuration;

import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowRight, Timer, Trophy, Star, ChevronLeft, RefreshCw, FileText, Check, X, Eye, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../../../contexts/AuthContext';
import { api } from '../../../../services/api';
import Navbar from '../../../Navbar';
import { TOPIC_CONFIGS } from '../../../../lib/topicConfig';
import { LatexText } from '../../../LatexText';
import ExplanationModal from '../../../ExplanationModal';
import StickerExit from '../../../StickerExit';
import mascotImg from '../../../../assets/mascot.png';
import '@/pages/juniors/class-1/Grade1Practice.css';

const DynamicVisual = ({ data }) => {
    const { seq, missingIdx, type } = data;
    return (
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="g1-pattern-visual">
            <div className="g1-pattern-belt">
                {seq.map((item, i) => (
                    <motion.div
                        key={i}
                        initial={{ x: 20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: i * 0.1 }}
                        className="g1-pattern-slot"
                    >
                        {i === missingIdx ? (
                            <div className="g1-pattern-target">?</div>
                        ) : (
                            <motion.div
                                whileHover={{ scale: 1.15 }}
                                className="g1-pattern-item"
                                style={type === 'shape' ? { fontSize: '2rem' } : {}}
                            >
                                {item}
                            </motion.div>
                        )}
                        {i < seq.length - 1 && <div className="g1-pattern-arrow">→</div>}
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
};

const Grade2Patterns = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const skillId = queryParams.get('skillId') || '1014';
    const totalQuestions = 5;

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

    useEffect(() => {
        if (answers[qIndex]) {
            setSelectedOption(answers[qIndex].selectedOption);
            setIsAnswered(true);
        } else {
            setSelectedOption(null);
            setIsAnswered(false);
            setShowExplanationModal(false);
        }
    }, [qIndex, answers]);

    const getTopicInfo = () => {
        const grade2Config = TOPIC_CONFIGS['2'];
        for (const [topicName, skills] of Object.entries(grade2Config)) {
            const skill = skills.find(s => s.id === skillId);
            if (skill) return { topicName, skillName: skill.name };
        }
        return { topicName: 'Patterns', skillName: 'Mathematics' };
    };

    const { topicName, skillName } = getTopicInfo();

    const generateQuestions = (selectedSkill) => {
        const questions = [];
        const shapes = ['🔴', '🟦', '🔺', '⭐', '🌙', '🍀'];

        for (let i = 0; i < totalQuestions; i++) {
            let seq = [];
            let missingIdx;
            let options = [];
            let correct;
            let type = 'number';

            if (selectedSkill === '1014') { // Number patterns
                const start = Math.floor(Math.random() * 10) + 1;
                const step = Math.floor(Math.random() * 5) + 2;
                seq = [start, start + step, start + 2 * step, start + 3 * step];
                missingIdx = Math.floor(Math.random() * 4);
                correct = seq[missingIdx];
                options = [correct, correct + step, correct - step].sort(() => 0.5 - Math.random());
                type = 'number';
            } else if (selectedSkill === '1015') { // Shape patterns
                const pItems = [shapes[i % shapes.length], shapes[(i + 1) % shapes.length]];
                seq = [pItems[0], pItems[1], pItems[0], pItems[1]];
                missingIdx = Math.floor(Math.random() * 4);
                correct = seq[missingIdx];
                options = [...pItems].sort(() => 0.5 - Math.random());
                type = 'shape';
            } else { // 1016 = Identifying and completing
                const mixed = Math.random() > 0.5;
                if (mixed) {
                    const start = Math.floor(Math.random() * 50);
                    seq = [start, start + 10, start + 20, start + 30];
                } else {
                    const pItems = [shapes[0], shapes[1], shapes[2]];
                    seq = [pItems[0], pItems[1], pItems[2], pItems[0]];
                }
                missingIdx = 3; // "Completing" focus
                correct = seq[missingIdx];
                if (typeof correct === 'number') {
                    options = [correct, correct + 10, correct - 10].sort(() => 0.5 - Math.random());
                } else {
                    options = [shapes[0], shapes[1], shapes[2]].sort(() => 0.5 - Math.random());
                    type = 'shape';
                }
            }

            let displaySeq = [...seq];
            displaySeq[missingIdx] = null;

            questions.push({
                text: selectedSkill === '1016' ? "What comes next in the pattern? 🏁" : "Find the missing piece! 🧩",
                options: options.map(String),
                correct: String(correct),
                type: type,
                visualData: { seq: displaySeq, missingIdx, type },
                explanation: `The pattern follows a repeat or step logic. The missing item is ${correct}.`
            });
        }
        return questions;
    };

    useEffect(() => {
        const init = async () => {
            const userId = user?.id || user?.user_id;
            if (!userId) return;
            const qs = generateQuestions(skillId);
            setSessionQuestions(qs);
            try {
                const session = await api.createPracticeSession(userId, skillId);
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

    const handleOptionSelect = (option) => {
        if (isAnswered) return;
        setSelectedOption(option);
    };

    const handleSubmit = () => {
        if (isAnswered || selectedOption === null) return;
        const option = selectedOption;
        setIsAnswered(true);
        const isCorrect = option === sessionQuestions[qIndex].correct;

        if (isCorrect) setScore(s => s + 1);

        setAnswers(prev => ({
            ...prev,
            [qIndex]: {
                selectedOption: option,
                isCorrect,
                explanation: sessionQuestions[qIndex].explanation
            }
        }));

        if (!isCorrect) {
            setShowExplanationModal(true);
        } else {
            setTimeout(() => handleNext(), 800);
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

    const formatTime = (s) => {
        const mins = Math.floor(s / 60);
        const secs = s % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    if (sessionQuestions.length === 0) return <div className="grade1-practice-page"><div className="g1-loading-blob" /></div>;

    if (showResults) {
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
                        <StickerExit onClick={() => navigate('/junior/grade/2')} />
                    </div>
                </header>

                <main className="results-content">
                    <div className="results-hero-section">
                        <img src={mascotImg} alt="Mascot" style={{ width: '120px', height: '120px', margin: '0 auto 20px' }} />
                        <h2 style={{ fontSize: '2.5rem', fontWeight: 900, color: '#31326F', fontFamily: 'Fredoka, cursive' }}>Quest Complete! 🎉</h2>
                        <div className="results-stats-grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
                            <div className="stat-card">
                                <span className="stat-label">Correct</span>
                                <span className="stat-value-large">{score}/{totalQuestions}</span>
                            </div>
                            <div className="stat-card">
                                <span className="stat-label">Accuracy</span>
                                <span className="stat-value-large">{Math.round((score / totalQuestions) * 100)}%</span>
                            </div>
                        </div>
                    </div>

                    <div className="results-actions">
                        <button className="action-btn-large play-again-btn" onClick={() => window.location.reload()}>
                            <RefreshCw size={24} /> New Quest
                        </button>
                        <button className="action-btn-large back-topics-btn" onClick={() => navigate('/junior/grade/2')}>
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
                    <button className="g1-back-btn" onClick={() => navigate(-1)}>
                        <ChevronLeft size={20} /> Back
                    </button>
                    <div className="g1-timer-badge">
                        <Timer size={18} />
                        {formatTime(timer)}
                    </div>
                    <div style={{ fontWeight: 800, color: '#666', fontSize: '1rem', background: 'white', padding: '8px 15px', borderRadius: '15px', boxShadow: '0 4px 10px rgba(0,0,0,0.05)' }}>
                        Q {qIndex + 1} of {totalQuestions}
                    </div>
                    <div className="exit-practice-sticker" style={{ marginLeft: 'auto' }}>
                        <StickerExit onClick={() => navigate('/junior/grade/2')} />
                    </div>
                </div>

                <div className="g1-progress-container" style={{ margin: '10px 0 30px 0' }}>
                    <div className="g1-progress-fill" style={{ width: `${((qIndex + 1) / totalQuestions) * 100}%` }}></div>
                </div>

                <div className="g1-topic-skill-header">
                    <span className="g1-topic-name">{topicName}</span>
                    <h1 className="g1-skill-name"><LatexText text={skillName} /></h1>
                </div>

                <motion.div key={qIndex} initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="g1-question-card">
                    <h2 className="g1-question-text"><LatexText text={currentQ.text} /></h2>

                    <div className="g1-content-split">
                        <div className="g1-visual-area">
                            <DynamicVisual data={currentQ.visualData} />
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
                                        <span style={{ fontSize: '1.5rem' }}>{opt}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="g1-navigation-footer">
                        <button className="g1-nav-btn prev-btn" onClick={() => qIndex > 0 && setQIndex(qIndex - 1)} disabled={qIndex === 0}>
                            <ChevronLeft size={24} /> Prev
                        </button>
                        {!isAnswered ? (
                            <button className="g1-nav-btn submit-btn" onClick={handleSubmit} disabled={selectedOption === null}>
                                Submit <ChevronRight size={24} />
                            </button>
                        ) : (
                            <button className="g1-nav-btn next-btn" onClick={handleNext}>
                                {qIndex === totalQuestions - 1 ? 'Finish' : 'Next Question'} <ChevronRight size={24} />
                            </button>
                        )}
                    </div>
                </motion.div>
            </div>

            <ExplanationModal
                isOpen={showExplanationModal}
                onClose={() => setShowExplanationModal(false)}
                onNext={handleNext}
                explanation={answers[qIndex]?.explanation}
                isCorrect={answers[qIndex]?.isCorrect}
            />
        </div>
    );
};

export default Grade2Patterns;

import { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Check, X, RefreshCw, Zap, Award, Star, Cloud, ArrowRight } from 'lucide-react';
import Whiteboard from '../../components/Whiteboard';
import { api } from '../../services/api';
import ModelRenderer from '../../models/ModelRenderer';
import './MiddlePracticeSession.css';

const MiddlePracticeSession = () => {
    const { skillId } = useParams();
    const [questions, setQuestions] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const [userAnswer, setUserAnswer] = useState('');
    const [feedback, setFeedback] = useState(null);
    const [stats, setStats] = useState({ correct: 0, wrong: 0, skipped: 0, total: 0, streak: 0 });
    const [completed, setCompleted] = useState(false);
    const [skillName, setSkillName] = useState('Math Practice');
    const [history, setHistory] = useState([]);
    const [currentDifficulty, setCurrentDifficulty] = useState('Easy');
    const [fetchingNext, setFetchingNext] = useState(false);
    const [correctCountAtLevel, setCorrectCountAtLevel] = useState(0);

    // Time Tracking
    const startTimeRef = useRef(Date.now());
    const [timeTaken, setTimeTaken] = useState(0);

    // Format time helper
    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}m ${secs}s`;
    };

    useEffect(() => {
        fetchQuestions();
        startTimeRef.current = Date.now();
    }, [skillId]);

    const fetchQuestions = async (diff = 'Easy', isInitial = true) => {
        if (isInitial) setLoading(true);
        else setFetchingNext(true);

        try {
            const response = await api.getPracticeQuestionsBySkill(skillId, 1, null, diff);

            let rawQuestions = [];
            if (response && response.questions) rawQuestions = response.questions;
            else if (Array.isArray(response)) rawQuestions = response;
            else if (response && response.preview_samples) rawQuestions = response.preview_samples;
            else if (response) rawQuestions = [response];

            if (!Array.isArray(rawQuestions)) rawQuestions = [];

            const normalized = rawQuestions.map((q, idx) => ({
                id: q.id || q.question_id || (isInitial ? idx : questions.length),
                text: q.question_text || q.question || q.question_html || "Question Text Missing",
                options: q.options || [],
                correctAnswer: q.correct_answer || q.answer || q.answer_value,
                solution: q.solution || q.solution_html || q.explanation || "No detailed explanation available.",
                type: q.type || q.question_type || 'MCQ',
                difficulty: diff,
                model: q.model || 'Default'
            }));

            if (isInitial) {
                setQuestions(normalized);
                if (response.skill_name) setSkillName(response.skill_name);
                else if (response.template_metadata?.skill_name) setSkillName(response.template_metadata.skill_name);
            } else {
                setQuestions(prev => [...prev, ...normalized]);
            }

        } catch (error) {
            console.error("Error fetching middle practice:", error);
        } finally {
            setLoading(false);
            setFetchingNext(false);
        }
    };

    const handleCheck = () => {
        const currentQ = questions[currentIndex];
        if (!currentQ) return;

        const isCorrect = userAnswer.toString().trim().toLowerCase() === currentQ.correctAnswer.toString().trim().toLowerCase();

        setFeedback(isCorrect ? 'correct' : 'incorrect');

        // Record history
        const attempt = {
            question: currentQ,
            userVal: userAnswer,
            status: isCorrect ? 'correct' : 'wrong',
            solution: currentQ.solution
        };

        if (!history.find(h => h.question.id === currentQ.id)) {
            setHistory(prev => [...prev, attempt]);
        }

        if (isCorrect) {
            setStats(prev => ({
                ...prev,
                correct: prev.correct + 1,
                total: prev.total + 1,
                streak: prev.streak + 1
            }));
        } else {
            setStats(prev => ({
                ...prev,
                wrong: prev.wrong + 1,
                total: prev.total + 1,
                streak: 0
            }));
        }
    };

    const handleSkip = () => {
        const currentQ = questions[currentIndex];

        // Record skip
        const attempt = {
            question: currentQ,
            userVal: 'Skipped',
            status: 'skipped',
            solution: currentQ.solution
        };

        setHistory(prev => [...prev, attempt]);
        setStats(prev => ({
            ...prev,
            skipped: prev.skipped + 1,
            total: prev.total + 1,
            streak: 0
        }));

        handleNextStep();
    };

    const handleNextStep = async () => {
        const currentQ = questions[currentIndex];
        const lastAttempt = history[history.length - 1];
        const isCorrect = lastAttempt && lastAttempt.status === 'correct';

        let nextDiff = currentDifficulty;
        let nextLevelCount = isCorrect ? correctCountAtLevel + 1 : correctCountAtLevel;

        if (nextLevelCount >= 3) {
            if (currentDifficulty === 'Easy') {
                nextDiff = 'Medium';
                nextLevelCount = 0;
            } else if (currentDifficulty === 'Medium') {
                nextDiff = 'Hard';
                nextLevelCount = 0;
            }
        }

        setCurrentDifficulty(nextDiff);
        setCorrectCountAtLevel(nextLevelCount);

        if (currentIndex < questions.length - 1) {
            // This shouldn't really happen with 1-by-1 fetching but for safety
            setCurrentIndex(prev => prev + 1);
            setUserAnswer('');
            setFeedback(null);
        } else {
            // Fetch next question
            await fetchQuestions(nextDiff, false);
            setCurrentIndex(prev => prev + 1);
            setUserAnswer('');
            setFeedback(null);
        }
    };

    const finishSession = () => {
        const endTime = Date.now();
        const durationSeconds = Math.floor((endTime - startTimeRef.current) / 1000);
        setTimeTaken(durationSeconds);
        setCompleted(true);
    };

    // Live Timer
    const [elapsedTime, setElapsedTime] = useState(0);

    useEffect(() => {
        let timer;
        if (!loading && !completed) {
            timer = setInterval(() => {
                const seconds = Math.floor((Date.now() - startTimeRef.current) / 1000);
                setElapsedTime(seconds);
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [loading, completed]);

    const getQuestionStatus = (idx) => {
        if (idx === currentIndex) return 'current';
        const historyItem = history.find(h => h.question.id === questions[idx]?.id);
        if (historyItem) return historyItem.status; // 'correct', 'wrong', 'skipped'
        return 'pending';
    };

    if (loading) return <div className="middle-loading">Generating problems...</div>;

    if (completed) {
        // ... (Completion view remains same, but maybe use TimeTaken from ref/state)
        const accuracy = Math.round((stats.correct / stats.total) * 100) || 0;

        return (
            <div className="middle-practice-page">
                <div className="middle-practice-container completed-view-full">
                    <div className="report-card">
                        <div className="report-header">
                            <div className="report-title">
                                <h1>Session Report</h1>
                                <p>{skillName}</p>
                            </div>
                            <div className="report-score">
                                <div className="score-circle">
                                    <span className="score-number">{accuracy}%</span>
                                    <span className="score-sub">Accuracy</span>
                                </div>
                            </div>
                        </div>

                        {/* Stats Grid */}
                        <div className="stats-grid">
                            <div className="stat-box">
                                <span className="stat-label">Time Taken</span>
                                <span className="stat-val">{formatTime(timeTaken || elapsedTime)}</span>
                            </div>
                            <div className="stat-box correct">
                                <span className="stat-label">Correct</span>
                                <span className="stat-val">{stats.correct}</span>
                            </div>
                            <div className="stat-box wrong">
                                <span className="stat-label">Wrong</span>
                                <span className="stat-val">{stats.wrong}</span>
                            </div>
                            <div className="stat-box skipped">
                                <span className="stat-label">Skipped</span>
                                <span className="stat-val">{stats.skipped}</span>
                            </div>
                        </div>

                        <div className="question-analysis">
                            <h3>Detailed Analysis</h3>
                            {history.map((item, idx) => (
                                <div key={idx} className={`analysis-item ${item.status}`}>
                                    <div className="analysis-header">
                                        <div className={`status-badge ${item.status}`}>
                                            {item.status === 'correct' && <Check size={16} />}
                                            {item.status === 'wrong' && <X size={16} />}
                                            {item.status === 'skipped' && <RefreshCw size={16} />}
                                            <span>{item.status.toUpperCase()}</span>
                                        </div>
                                        <span className="q-number">Question {idx + 1}</span>
                                    </div>

                                    <div className="analysis-content">
                                        <div className="q-text" dangerouslySetInnerHTML={{ __html: item.question.text }} />

                                        <div className="ans-comparison">
                                            <div className="ans-block user">
                                                <span className="label">Your Answer:</span>
                                                <span className="val">{item.userVal}</span>
                                            </div>
                                            <div className="ans-block correct">
                                                <span className="label">Correct Answer:</span>
                                                <span className="val">{item.question.correctAnswer}</span>
                                            </div>
                                        </div>

                                        <div className="explanation-block">
                                            <h4><Zap size={16} /> Explanation:</h4>
                                            <div dangerouslySetInnerHTML={{ __html: item.question.solution }} />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="report-actions">
                            <Link to="/math" className="middle-btn primary">Back to Topics</Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    const currentQ = questions[currentIndex];

    // Whiteboard placeholder
    return (
        <div className="middle-practice-page full-screen-mode">
            {/* Animated Background Elements */}
            <div className="bg-decoration circle-1"></div>
            <div className="bg-decoration circle-2"></div>
            <div className="bg-decoration circle-3"></div>

            {/* Floating Stickers */}
            <div className="sticker star-1"><Star size={40} fill="#ffd700" color="#b45309" /></div>
            <div className="sticker cloud-1"><Cloud size={60} fill="white" color="#cbd5e1" /></div>

            <div className="middle-practice-layout three-col-grid">

                {/* COL 1: Sidebar Stats & Palette */}
                <aside className="middle-sidebar glass-panel">
                    <div className="sidebar-header">
                        <h2>{skillName}</h2>
                        <div className="timer-display">
                            <RefreshCw size={16} className="spin-slow" />
                            <span>{formatTime(elapsedTime)}</span>
                        </div>
                    </div>

                    <div className="question-palette">
                        <span className="palette-label">Question Palette</span>
                        <div className="palette-grid">
                            {questions.map((_, idx) => (
                                <div
                                    key={idx}
                                    className={`palette-item ${getQuestionStatus(idx)}`}
                                >
                                    {idx + 1}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="stats-panel-compact">
                        <div className="stat-row">
                            <Zap size={18} className="stat-icon streak" />
                            <span>Streak: <strong>{stats.streak}</strong></span>
                        </div>
                        <div className="stat-row">
                            <Check size={18} className="stat-icon correct" />
                            <span>Score: <strong>{stats.correct}</strong>/<strong>{stats.total}</strong></span>
                        </div>
                    </div>

                    <Link to="/math" className="exit-btn">Exit Practice</Link>
                </aside>

                {/* COL 2: Main Question Area */}
                <main className="middle-question-area">
                    <div className="question-card glass-card pop-in">
                        <div className="flex justify-between items-center mb-4">
                            <span className="topic-tag">Problem {currentIndex + 1}</span>
                            <span className={`difficulty-badge ${currentDifficulty.toLowerCase()}`}>
                                {currentDifficulty}
                            </span>
                        </div>
                        <div className="question-text">
                            {fetchingNext ? (
                                <div className="fetching-loader">Preparing next challenge...</div>
                            ) : (
                                currentQ?.text && (
                                    <div dangerouslySetInnerHTML={{ __html: currentQ.text }} />
                                )
                            )}
                        </div>

                        {currentQ?.imageUrl && (
                            <div className="question-image">
                                <img src={currentQ.imageUrl} alt="Question visual" />
                            </div>
                        )}

                        <ModelRenderer
                            question={currentQ}
                            userAnswer={userAnswer}
                            setUserAnswer={setUserAnswer}
                            feedback={feedback}
                            disabled={!!feedback}
                            onCheck={handleCheck}
                        />

                        <div className="action-bar">
                            {feedback ? (
                                <div className="feedback-display">
                                    <span className={`feedback-msg ${feedback}`}>
                                        {feedback === 'correct' ? 'Excellent!' : 'Keep trying!'}
                                    </span>
                                    <button className="middle-btn next" onClick={handleNextStep}>
                                        Next Problem <ArrowRight size={20} />
                                    </button>
                                </div>
                            ) : (
                                <div className="flex gap-4">
                                    <button className="middle-btn secondary" onClick={() => setCompleted(true)}>
                                        Finish
                                    </button>
                                    <button className="middle-btn secondary" onClick={handleSkip}>
                                        Skip
                                    </button>
                                    <button
                                        className="middle-btn primary"
                                        onClick={handleCheck}
                                        disabled={!userAnswer}
                                    >
                                        Check Answer
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </main>

                {/* COL 3: Whiteboard */}
                <aside className="middle-whiteboard-col">
                    <Whiteboard isOpen={true} />
                </aside>

            </div>
        </div>
    );
};

export default MiddlePracticeSession;

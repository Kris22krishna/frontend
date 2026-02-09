import { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Check, X, RefreshCw, Zap, Award, ArrowRight, Target, Clock, BookOpen } from 'lucide-react';
import Whiteboard from '../../components/Whiteboard';
import { api } from '../../services/api';
import './HighPracticeSession.css';
import Navbar from '../../components/Navbar';

const HighPracticeSession = () => {
    const { skillId } = useParams();
    const [questions, setQuestions] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const [userAnswer, setUserAnswer] = useState('');
    const [feedback, setFeedback] = useState(null);
    const [stats, setStats] = useState({ correct: 0, wrong: 0, skipped: 0, total: 0, streak: 0 });
    const [completed, setCompleted] = useState(false);
    const [skillName, setSkillName] = useState('Practice Session');
    const [history, setHistory] = useState([]);
    const [error, setError] = useState(null);
    const [currentDifficulty, setCurrentDifficulty] = useState('Easy');
    const [consecutiveCorrect, setConsecutiveCorrect] = useState(0);

    // Time Tracking
    const startTimeRef = useRef(Date.now());
    const [timeTaken, setTimeTaken] = useState(0);

    // Format time helper
    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    useEffect(() => {
        fetchQuestions();
        startTimeRef.current = Date.now();
    }, [skillId]);

    const fetchQuestions = async (retryType = null, append = false, forcedDifficulty = null) => {
        if (!append) setLoading(true);
        setError(null);
        try {
            const diff = forcedDifficulty || currentDifficulty;
            console.log(`[HighPractice] Fetching questions for skillId: ${skillId}, type: ${retryType}, append: ${append}, difficulty: ${diff}`);
            const response = await api.getPracticeQuestionsBySkill(skillId, 10, retryType, diff);

            // Handle Type Selection Request
            if (response && response.selection_needed && response.available_types?.length > 0) {
                const defaultType = response.available_types[0];
                return fetchQuestions(defaultType, append);
            }

            let rawQuestions = [];
            if (response && Array.isArray(response.questions)) rawQuestions = response.questions;
            else if (response && Array.isArray(response.preview_samples)) rawQuestions = response.preview_samples;
            else if (Array.isArray(response)) rawQuestions = response;

            const normalized = rawQuestions.map((q, idx) => ({
                id: q.id || q.question_id || q.generated_question_id || (Date.now() + idx),
                text: q.question_text || q.question || q.question_html || "Question Text Missing",
                options: q.options || [],
                correctAnswer: q.correct_answer || q.answer || q.answer_value || q.answer_key,
                solution: q.solution || q.solution_html || q.explanation || "No detailed explanation available.",
                type: q.type || q.question_type || 'MCQ',
                imageUrl: q.imageUrl || q.image_url,
                difficulty: q.difficulty || (response.template_metadata?.difficulty) || diff
            }));

            if (append) {
                setQuestions(prev => [...prev, ...normalized]);
            } else {
                setQuestions(normalized);
                if (response.skill_name) setSkillName(response.skill_name);
            }
            return normalized;
        } catch (err) {
            console.error("Error fetching practice:", err);
            if (!append) setError(err.message || "Failed to load session.");
        } finally {
            if (!append) setLoading(false);
        }
    };

    const handleCheck = () => {
        const currentQ = questions[currentIndex];
        if (!currentQ) return;

        const isCorrect = userAnswer.toString().trim().toLowerCase() === currentQ.correctAnswer.toString().trim().toLowerCase();

        setFeedback(isCorrect ? 'correct' : 'incorrect');

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
            const nextConsecutive = consecutiveCorrect + 1;
            setConsecutiveCorrect(nextConsecutive);

            // Logic: 1 correct -> Medium, 2 correct -> Hard
            if (nextConsecutive === 1 && currentDifficulty === 'Easy') {
                setCurrentDifficulty('Medium');
            } else if (nextConsecutive >= 2 && currentDifficulty !== 'Hard') {
                setCurrentDifficulty('Hard');
            }

            setStats(prev => ({
                ...prev,
                correct: prev.correct + 1,
                total: prev.total + 1,
                streak: prev.streak + 1
            }));
        } else {
            setConsecutiveCorrect(0);
            setStats(prev => ({
                ...prev,
                wrong: prev.wrong + 1,
                total: prev.total + 1,
                streak: 0
            }));
        }
    };


    const handleNextStep = async () => {
        const nextIdx = currentIndex + 1;
        const nextQ = questions[nextIdx];

        // If next question exists but has wrong difficulty, we must fetch new ones and skip to them
        if (nextQ && nextQ.difficulty !== currentDifficulty) {
            const newQuestions = await fetchQuestions(null, true, currentDifficulty);
            if (newQuestions && newQuestions.length > 0) {
                // Skip to the first question of the newly fetched batch
                // We know setQuestions appended them, so the index is the PREVIOUS length
                setCurrentIndex(questions.length);
            } else {
                // Fallback to normal if fetch failed/returned nothing
                setCurrentIndex(nextIdx);
            }
        }
        // If no next question at all, fetch more
        else if (!nextQ) {
            await fetchQuestions(null, true, currentDifficulty);
            setCurrentIndex(nextIdx);
        }
        // Normal progression (next question exists and is correct difficulty)
        else {
            setCurrentIndex(nextIdx);
        }

        setUserAnswer('');
        setFeedback(null);
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
        if (historyItem) return historyItem.status;
        return 'pending';
    };

    const loadingMessages = [
        "Preparing your blackboard...",
        "Calculating variables...",
        "Fine-tuning the geometry...",
        "Polishing your scratchpad...",
        "Setting up the theorem...",
        "Almost ready for math!"
    ];
    const [msgIndex, setMsgIndex] = useState(0);

    useEffect(() => {
        let timer;
        if (loading) {
            timer = setInterval(() => {
                setMsgIndex(prev => (prev + 1) % loadingMessages.length);
            }, 2500);
        }
        return () => clearInterval(timer);
    }, [loading]);

    if (loading) return (
        <div className="high-practice-page high-loading-screen">
            <div className="high-loading-content">
                <div className="high-loading-icon">
                    <RefreshCw size={48} className="high-spin" />
                </div>
                <h3 className="high-loading-msg">{loadingMessages[msgIndex]}</h3>
                <div className="high-loading-bar">
                    <div className="high-loading-progress"></div>
                </div>
            </div>
        </div>
    );

    if (error) return (
        <div className="high-practice-page">
            <main className="high-main-content" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                <div className="question-card" style={{ textAlign: 'center', padding: '3rem' }}>
                    <div style={{ color: '#e11d48', marginBottom: '1rem' }}><Zap size={48} /></div>
                    <h2 style={{ fontFamily: 'Merriweather, serif', marginBottom: '1rem' }}>Unable to Load Session</h2>
                    <p style={{ color: '#64748b', marginBottom: '2rem' }}>{error}</p>
                    <button onClick={() => window.location.reload()} className="high-btn primary">Try Again</button>
                    <br /><br />
                    <Link to="/math" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '0.9rem' }}>Return to Dashboard</Link>
                </div>
            </main>
        </div>
    );



    // Removal of Completion/Report view block (unlimited mode)

    const currentQ = questions[currentIndex];

    return (
        <div className="high-practice-page">
            <div className="high-practice-layout">
                {/* Main Content */}
                <main className="high-main-content">
                    <div className="high-header">
                        <div className="high-title-group">
                            <h1>{skillName}</h1>
                            <div className="high-subtitle">
                                <span className="high-badge">Practice Mode</span>
                                <span className={`high-difficulty-badge ${currentDifficulty.toLowerCase()}`}>
                                    {currentDifficulty} Level
                                </span>
                            </div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <div className="high-subtitle">
                                <Clock size={16} />
                                {formatTime(elapsedTime)}
                            </div>

                            {/* Action Button moved to Header */}
                            {!feedback ? (
                                <button
                                    className="high-btn primary"
                                    onClick={handleCheck}
                                    disabled={!userAnswer}
                                    style={{ padding: '0.5rem 1.5rem', fontSize: '0.9rem' }}
                                >
                                    Submit
                                </button>
                            ) : (
                                <button
                                    className="high-btn primary"
                                    onClick={handleNextStep}
                                    style={{ padding: '0.5rem 1.5rem', fontSize: '0.9rem' }}
                                >
                                    Next Question
                                </button>
                            )}

                            <Link to="/math" className="high-btn secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}>
                                Exit
                            </Link>
                        </div>
                    </div>

                    <div className="question-card">
                        <div className="question-meta">
                            <span>Question {currentIndex + 1}</span>
                            <span className={`high-q-difficulty ${currentQ?.difficulty?.toLowerCase()}`}>
                                {currentQ?.difficulty}
                            </span>
                        </div>

                        <div className="question-content">
                            {currentQ?.text && (
                                <div className="question-text" dangerouslySetInnerHTML={{ __html: currentQ.text }} />
                            )}
                            {currentQ?.imageUrl && (
                                <img src={currentQ.imageUrl} alt="Question" style={{ maxWidth: '100%', marginBottom: '2rem', borderRadius: '4px' }} />
                            )}
                        </div>

                        <div className="high-options-grid">
                            {currentQ?.options?.map((opt, idx) => {
                                const isSelected = userAnswer === opt;
                                let btnClass = `high-option-btn ${isSelected ? 'selected' : ''}`;

                                if (feedback) {
                                    if (opt === currentQ.correctAnswer) btnClass += ' correct';
                                    else if (isSelected && feedback === 'incorrect') btnClass += ' wrong';
                                }

                                return (
                                    <button
                                        key={idx}
                                        className={btnClass}
                                        onClick={() => !feedback && setUserAnswer(opt)}
                                        disabled={!!feedback}
                                    >
                                        <span className="high-key">{String.fromCharCode(65 + idx)}.</span>
                                        <span>{opt}</span>
                                    </button>
                                );
                            })}
                        </div>

                        {(currentQ?.type === 'input' || !currentQ?.options || currentQ?.options.length === 0) && (
                            <input
                                type="text"
                                className="high-text-input"
                                value={userAnswer}
                                onChange={(e) => setUserAnswer(e.target.value)}
                                placeholder="Enter answer here..."
                                disabled={!!feedback}
                            />
                        )}

                        {feedback && (
                            <div className="high-feedback-container">
                                <div className={`high-feedback-row ${feedback}`}>
                                    <span className="high-feedback-msg">
                                        {feedback === 'correct' ? 'Correct Answer!' : 'Incorrect Answer'}
                                    </span>
                                </div>

                                {feedback && currentQ.solution && (
                                    <div className={`high-explanation-box ${feedback}`}>
                                        <h4>Explanation</h4>
                                        <div dangerouslySetInnerHTML={{ __html: currentQ.solution }} />
                                    </div>
                                )}
                            </div>
                        )}

                        <div className="high-actions">
                            {/* Skip button removed */}
                        </div>
                    </div>
                </main>

                {/* Tools Column */}
                <aside className="high-tools-col">
                    <div className="high-notebook">
                        <div className="high-notebook-header">Scratchpad</div>
                        <div style={{ flex: 1, position: 'relative' }}>
                            <Whiteboard isOpen={true} />
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
};

export default HighPracticeSession;

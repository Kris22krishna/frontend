import { useState, useEffect, useRef } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { Check, X, RefreshCw, Zap, Award, ArrowRight, Target, Clock, BookOpen, PenTool, LogOut, Eye } from 'lucide-react';
import Whiteboard from '../../components/Whiteboard';
import { FullScreenScratchpad } from '../../components/FullScreenScratchpad';
import { api } from '../../services/api';
import ModelRenderer from '../../models/ModelRenderer';
import './HighPracticeSession.css';
import LatexContent from '../../components/LatexContent';
import Navbar from '../../components/Navbar';

const HighPracticeSession = () => {
    const { skillId } = useParams();
    const location = useLocation();
    const [questions, setQuestions] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showScratchpad, setShowScratchpad] = useState(false); // Mobile state
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
    const [displayQuestionNum, setDisplayQuestionNum] = useState(1);
    const [correctCountAtLevel, setCorrectCountAtLevel] = useState(0);
    const [fetchingNext, setFetchingNext] = useState(false);
    const [gradeLevel, setGradeLevel] = useState(location.state?.grade || null);

    // Time Tracking
    const startTimeRef = useRef(Date.now());
    const [timeTaken, setTimeTaken] = useState(0);

    // Session Tracking
    const [sessionId, setSessionId] = useState(null);
    const questionStartTime = useRef(Date.now());
    const accumulatedTime = useRef(0);
    const isTabActive = useRef(true);

    // Format time helper
    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const sessionCreatedForSkill = useRef(null);

    useEffect(() => {
        fetchQuestions();

        // Create Session
        const createSession = async () => {
            const uid = localStorage.getItem('userId');
            if (uid && skillId && sessionCreatedForSkill.current !== skillId) {
                sessionCreatedForSkill.current = skillId;
                try {
                    const s = await api.createPracticeSession(uid, skillId);
                    if (s?.session_id) setSessionId(s.session_id);
                } catch (e) {
                    console.error("Session init failed", e);
                    sessionCreatedForSkill.current = null;
                }
            }
        };
        createSession();

        // Fetch skill details to get grade level for navigation
        api.getSkillById(skillId).then(skill => {
            if (skill?.grade) setGradeLevel(skill.grade);
        }).catch(err => console.error("Failed to fetch skill info", err));

        startTimeRef.current = Date.now();
        setDisplayQuestionNum(1); // Reset question number on new skill
    }, [skillId]);

    useEffect(() => {
        const handleVisibilityChange = () => {
            if (document.hidden) {
                isTabActive.current = false;
                accumulatedTime.current += Date.now() - questionStartTime.current;
            } else {
                isTabActive.current = true;
                questionStartTime.current = Date.now();
            }
        };
        document.addEventListener("visibilitychange", handleVisibilityChange);
        return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
    }, []);




    const fetchQuestions = async (retryType = null, append = false, forcedDifficulty = null) => {
        if (!append) setLoading(true);
        else setFetchingNext(true);
        setError(null);
        try {
            const diff = forcedDifficulty || currentDifficulty;
            const response = await api.getPracticeQuestionsBySkill(skillId, 1, retryType, diff);

            // Handle Type Selection Request
            if (response && response.selection_needed && response.available_types?.length > 0) {
                const defaultType = response.available_types[0];
                return fetchQuestions(defaultType, append, diff);
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
                difficulty: diff,
                model: q.model || 'Default',
                template_id: q.template_id
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
            setFetchingNext(false);
        }
    };

    const handleCheck = async (selectedVal) => {
        const currentQ = questions[currentIndex];
        if (!currentQ) return;

        const valToCheck = selectedVal !== undefined ? selectedVal : userAnswer;
        setUserAnswer(valToCheck);

        const isCorrect = valToCheck.toString().trim().toLowerCase() === currentQ.correctAnswer.toString().trim().toLowerCase();

        setFeedback(isCorrect ? 'correct' : 'incorrect');

        const attempt = {
            question: currentQ,
            userVal: valToCheck,
            status: isCorrect ? 'correct' : 'wrong',
            solution: currentQ.solution
        };

        if (!history.find(h => h.question.id === currentQ.id)) {
            setHistory(prev => [...prev, attempt]);
        }

        // Record Attempt
        const uid = localStorage.getItem('userId');
        if (uid) {
            let t = accumulatedTime.current;
            if (isTabActive.current) t += Date.now() - questionStartTime.current;
            const sec = Math.max(0, Math.round(t / 1000));

            try {
                if (sessionId) {
                    await api.recordAttempt({
                        user_id: parseInt(uid),
                        session_id: sessionId,
                        skill_id: parseInt(skillId),
                        template_id: currentQ.template_id || null,
                        difficulty_level: currentDifficulty,
                        question_text: String(currentQ.text || ''),
                        correct_answer: String(currentQ.correctAnswer || ''),
                        student_answer: String(valToCheck || ''),
                        is_correct: isCorrect,
                        solution_text: String(currentQ.solution || ''),
                        time_spent_seconds: sec
                    });
                }
            } catch (e) { console.error("Record attempt error", e); }
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


    const handleNextStep = async () => {
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
            setCurrentIndex(prev => prev + 1);
        } else {
            await fetchQuestions(null, true, nextDiff);
            setCurrentIndex(prev => prev + 1);
        }

        setUserAnswer('');
        setFeedback(null);
        setDisplayQuestionNum(prev => prev + 1);
        accumulatedTime.current = 0;
        questionStartTime.current = Date.now();
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
                    <div style={{ color: '#31326F', marginBottom: '1rem' }}><Zap size={64} /></div>
                    <h2 style={{
                        fontFamily: 'Merriweather, serif',
                        marginBottom: '1rem',
                        color: '#31326F',
                        fontSize: '2rem',
                        fontWeight: 'bold'
                    }}>
                        Oops! This content isn’t available yet!!
                    </h2>
                    <p style={{ color: '#64748b', marginBottom: '2rem', fontSize: '1.1rem' }}>
                        But don’t worry — we’re working hard to bring it to you soon! 🚀
                    </p>
                    <Link
                        to={gradeLevel ? `/senior/grade/${gradeLevel}` : '/math'}
                        className="high-btn primary"
                        style={{
                            textDecoration: 'none',
                            display: 'inline-block',
                            padding: '0.75rem 2rem',
                            fontSize: '1rem'
                        }}
                    >
                        Return to Dashboard
                    </Link>
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
                            {/* Badges Removed */}
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <div className="high-subtitle">
                                <Clock size={16} />
                                {formatTime(elapsedTime)}
                            </div>

                            {/* Action Button moved to Header */}
                            {!feedback ? (
                                <div style={{ width: '0px' }}></div> /* Placeholder to keep layout */
                            ) : (
                                <button
                                    className="high-btn primary"
                                    onClick={handleNextStep}
                                    style={{ padding: '0.5rem 1.5rem', fontSize: '0.9rem' }}
                                >
                                    Next Question
                                </button>
                            )}

                            {/* Mobile Scratchpad Toggle (Header) */}
                            <button
                                className={`high-btn secondary high-mobile-scratchpad-toggle ${showScratchpad ? 'active' : ''}`}
                                onClick={() => setShowScratchpad(!showScratchpad)}
                                title="Open Scratchpad"
                                style={{ padding: '0.5rem' }}
                            >
                                <PenTool size={18} />
                            </button>

                            <Link
                                to={gradeLevel ? `/senior/grade/${gradeLevel}` : '/math'}
                                className="high-btn secondary"
                                style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}
                                onClick={() => {
                                    if (sessionId) api.finishSession(sessionId).catch(console.error);
                                }}
                            >
                                Exit
                            </Link>
                        </div>
                    </div>

                    <div className="question-card">
                        <div className="question-meta">
                            <span>Question {displayQuestionNum}</span>
                            {/* Difficulty Badge Removed */}
                        </div>

                        <div className="question-content">
                            {currentQ?.text && (
                                <LatexContent html={currentQ.text} className="question-text" block={true} />
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
                                        onClick={() => !feedback && handleCheck(opt)}
                                        disabled={!!feedback}
                                    >
                                        <span className="high-key">{String.fromCharCode(65 + idx)}.</span>
                                        <LatexContent html={opt} />
                                    </button>
                                );
                            })}
                        </div>

                        {(currentQ?.type === 'input' || !currentQ?.options || currentQ?.options.length === 0) && (
                            <div className="high-input-group">
                                <input
                                    type="text"
                                    className="high-text-input"
                                    value={userAnswer}
                                    onChange={(e) => setUserAnswer(e.target.value)}
                                    placeholder="Enter answer here..."
                                    disabled={!!feedback}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' && !feedback && userAnswer.trim()) {
                                            handleCheck(userAnswer);
                                        }
                                    }}
                                />
                                {!feedback && (
                                    <button
                                        className="high-submit-btn"
                                        onClick={() => handleCheck(userAnswer)}
                                        disabled={!userAnswer.trim()}
                                    >
                                        Submit Answer
                                    </button>
                                )}
                            </div>
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
                                        <h4 className="explanation-header">EXPLANATION</h4>
                                        <LatexContent html={currentQ.solution} block={true} />
                                    </div>
                                )}
                            </div>
                        )}

                        <div className="high-actions">
                            {/* Skip button removed */}
                        </div>
                    </div>

                    {/* Mobile Scratchpad Overlay */}
                    {showScratchpad && (
                        <FullScreenScratchpad onClose={() => setShowScratchpad(false)} />
                    )}
                </main>

                {/* Tools Column */}
                <aside className="high-tools-col">
                    <div className="high-notebook">
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

import { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Check, X, RefreshCw, Zap, Award, ArrowRight, ArrowLeft, Target, Clock, BookOpen, PenTool, LogOut, Eye } from 'lucide-react';
import Whiteboard from '../../components/Whiteboard';
import { FullScreenScratchpad } from '../../components/FullScreenScratchpad';
import { api } from '../../services/api';
import ModelRenderer from '../../models/ModelRenderer';
import './HighPracticeSession.css';
import LatexContent from '../../components/LatexContent';
import Navbar from '../../components/Navbar';

const HighPracticeSession = () => {
    const { skillId } = useParams();
    const navigate = useNavigate();
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
    const [gradeLevel, setGradeLevel] = useState(null);

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


    const QUESTIONS_PER_SESSION = 10;

    const handleNextStep = async () => {
        if (stats.total >= QUESTIONS_PER_SESSION) {
            setCompleted(true);
            if (sessionId) api.finishSession(sessionId).catch(console.error);
            return;
        }

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

    if (completed) {
        const accuracy = Math.round((stats.correct / (stats.total || 1)) * 100);
        return (
            <div className="high-practice-page results-view overflow-y-auto bg-slate-50 min-h-screen">
                <Navbar />
                <main className="max-w-6xl mx-auto py-12 px-6">
                    <div className="bg-white rounded-[2rem] shadow-xl overflow-hidden border border-slate-200">
                        <div className="bg-slate-900 p-12 text-white text-center">
                            <div className="flex justify-between items-start mb-6">
                                <Award className="w-20 h-20 text-yellow-400" />
                                <button
                                    onClick={() => navigate(gradeLevel ? `/senior/grade/${gradeLevel}` : "/math")}
                                    className="back-topics-top px-10 py-3 bg-slate-800 text-white rounded-xl font-bold hover:bg-slate-700 transition-all flex items-center gap-3 text-lg shadow-lg border border-slate-700 relative z-[1001]"
                                >
                                    <ArrowLeft size={20} /> Back to Topics
                                </button>
                            </div>
                            <h1 className="text-4xl font-serif font-bold mb-2">Practice Session Complete</h1>
                            <p className="text-slate-400 text-lg">{skillName}</p>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12">
                                <div className="text-center">
                                    <p className="text-slate-500 dark:text-slate-400 uppercase tracking-widest text-xs font-bold mb-2">Accuracy</p>
                                    <p className="text-4xl font-bold dark:text-white">{accuracy}%</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-slate-500 dark:text-slate-400 uppercase tracking-widest text-xs font-bold mb-2">Time Taken</p>
                                    <p className="text-4xl font-bold dark:text-white">{formatTime(elapsedTime)}</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-slate-500 dark:text-slate-400 uppercase tracking-widest text-xs font-bold mb-2">Correct</p>
                                    <p className="text-4xl font-bold text-emerald-400">{stats.correct}</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-slate-500 dark:text-slate-400 uppercase tracking-widest text-xs font-bold mb-2">Mastery</p>
                                    <p className="text-4xl font-bold text-blue-400">{currentDifficulty}</p>
                                </div>
                            </div>
                        </div>

                        <div className="p-12">
                            <h2 className="text-2xl font-serif font-bold text-slate-900 mb-8 flex items-center gap-3">
                                <Target className="text-slate-400" />
                                Detailed Performance Breakdown
                            </h2>

                            <div className="space-y-8">
                                {history.map((item, idx) => (
                                    <div key={idx} className={`p-8 rounded-2xl border-l-4 transition-all ${item.status === 'correct' ? 'border-emerald-500 bg-emerald-50/20' : 'border-rose-500 bg-rose-50/20'}`}>
                                        <div className="flex items-start justify-between gap-6 mb-6">
                                            <div className="flex items-center gap-4">
                                                <span className={`w-8 h-8 rounded shrink-0 flex items-center justify-center font-bold font-serif ${item.status === 'correct' ? 'bg-emerald-500 text-white' : 'bg-rose-500 text-white'}`}>
                                                    {idx + 1}
                                                </span>
                                                <div className="text-lg font-serif text-slate-800 leading-relaxed">
                                                    <LatexContent html={item.question.text} />
                                                </div>
                                            </div>
                                            {item.status === 'correct' ? (
                                                <div className="flex items-center gap-2 text-emerald-600 font-bold bg-emerald-100 px-3 py-1 rounded-full text-sm">
                                                    <Check size={16} /> CORRECT
                                                </div>
                                            ) : (
                                                <div className="flex items-center gap-2 text-rose-600 font-bold bg-rose-100 px-3 py-1 rounded-full text-sm">
                                                    <X size={16} /> INCORRECT
                                                </div>
                                            )}
                                        </div>

                                        <div className="grid md:grid-cols-2 gap-8 mb-6 ml-12">
                                            <div className="space-y-2">
                                                <p className="text-slate-400 uppercase tracking-widest text-[10px] font-bold">Your Response</p>
                                                <div className={`p-4 rounded-xl font-medium ${item.status === 'correct' ? 'bg-emerald-100/50 text-emerald-900' : 'bg-rose-100/50 text-rose-900'}`}>
                                                    <LatexContent html={item.userVal} />
                                                </div>
                                            </div>
                                            {!item.status === 'correct' && (
                                                <div className="space-y-2">
                                                    <p className="text-slate-500 uppercase tracking-widest text-[10px] font-bold">Key Solution</p>
                                                    <div className="p-4 rounded-xl bg-slate-100 text-slate-900 font-medium">
                                                        <LatexContent html={item.question.correctAnswer} />
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        <div className="ml-12 p-6 bg-white rounded-xl border border-slate-100 shadow-sm">
                                            <p className="text-slate-500 uppercase tracking-widest text-[10px] font-bold mb-3 flex items-center gap-2">
                                                <BookOpen size={12} /> Step-by-Step Explanation
                                            </p>
                                            <div className="text-slate-600 font-serif leading-relaxed">
                                                <LatexContent html={item.question.solution} />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="flex items-center justify-center gap-6 mt-16 pt-12 border-t border-slate-100">
                                <button onClick={() => window.location.reload()} className="px-12 py-4 border-2 border-slate-200 text-slate-600 rounded-xl font-bold hover:bg-slate-50 transition-all flex items-center gap-2">
                                    <RefreshCw size={20} /> Reset Session
                                </button>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        );
    }

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
                                to="/math"
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
                                        <h4 className="high-explanation-header">EXPLANATION</h4>
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

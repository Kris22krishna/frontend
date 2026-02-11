import { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { api } from '../../services/api';
import ModelRenderer from '../../models/ModelRenderer';
import './MiddlePracticeSession.css';

// Components
import { QuestionCard } from '../../components/QuestionCard';
import { BottomBar } from '../../components/BottomBar';
import { SunTimer } from '../../components/SunTimer';
import { InlineScratchpad } from '../../components/InlineScratchpad';
import { LatexText } from '../../components/LatexText';
import { AnimatePresence, motion } from 'framer-motion';
import { X, CheckCircle2, ChevronRight } from 'lucide-react';

// Assets
import mascotImg from '../../assets/mascot.png';

const MiddlePracticeSession = () => {
    const { skillId } = useParams();
    const navigate = useNavigate();
    const [questions, setQuestions] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const [userAnswers, setUserAnswers] = useState({});
    const [showExplanation, setShowExplanation] = useState(false);
    const [showScratchpad, setShowScratchpad] = useState(false);
    const [elapsedTime, setElapsedTime] = useState(0);
    const [stats, setStats] = useState({ correct: 0, wrong: 0, skipped: 0, total: 0, streak: 0 });
    const [completed, setCompleted] = useState(false);
    const [skillName, setSkillName] = useState('Math Practice');
    const [history, setHistory] = useState([]);
    const [currentDifficulty, setCurrentDifficulty] = useState('Easy');
    const [fetchingNext, setFetchingNext] = useState(false);
    const [correctCountAtLevel, setCorrectCountAtLevel] = useState(0);

    const startTimeRef = useRef(Date.now());

    useEffect(() => {
        fetchQuestions();
        startTimeRef.current = Date.now();

        const timer = setInterval(() => {
            setElapsedTime((prev) => prev + 1);
        }, 1000);
        return () => clearInterval(timer);
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

    const handleAnswer = (answer) => {
        const currentQ = questions[currentIndex];
        setUserAnswers(prev => ({ ...prev, [currentQ.id]: answer }));

        // Check if wrong immediately to pop modal
        const isCorrect = String(answer).trim().toLowerCase() === String(currentQ.correctAnswer).trim().toLowerCase();

        // Update stats
        if (!history.find(h => h.question.id === currentQ.id)) {
            setHistory(prev => [...prev, {
                question: currentQ,
                userVal: answer,
                status: isCorrect ? 'correct' : 'wrong'
            }]);

            setStats(prev => ({
                ...prev,
                correct: isCorrect ? prev.correct + 1 : prev.correct,
                wrong: !isCorrect ? prev.wrong + 1 : prev.wrong,
                total: prev.total + 1,
                streak: isCorrect ? prev.streak + 1 : 0
            }));
        }

        if (!isCorrect) {
            setShowExplanation(true);
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
        } else {
            // Fetch next question
            await fetchQuestions(nextDiff, false);
            setCurrentIndex(prev => prev + 1);
            setUserAnswer('');
            setFeedback(null);
        }
    };

    const handlePrev = () => {
        if (currentIndex > 0) {
            setCurrentIndex(prev => prev - 1);
            setShowExplanation(false);
        }
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}m ${secs}s`;
    };

    if (loading) return <div className="middle-loading">Generating problems...</div>;

    if (completed) {
        const accuracy = Math.round((stats.correct / (stats.total || 1)) * 100);
        return (
            <div className="middle-practice-page overflow-y-auto">
                <div className="report-container p-6 max-w-4xl mx-auto">
                    <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
                        <div className="bg-[#31326F] p-8 text-white text-center">
                            <h1 className="text-3xl font-bold mb-2">Practice Complete!</h1>
                            <p className="opacity-80">{skillName}</p>
                            <div className="mt-6 flex justify-center gap-8">
                                <div>
                                    <p className="text-sm opacity-60 uppercase font-bold tracking-wider">Accuracy</p>
                                    <p className="text-3xl font-bold">{accuracy}%</p>
                                </div>
                                <div>
                                    <p className="text-sm opacity-60 uppercase font-bold tracking-wider">Time</p>
                                    <p className="text-3xl font-bold">{formatTime(elapsedTime)}</p>
                                </div>
                            </div>
                        </div>

                        <div className="p-8">
                            <div className="grid grid-cols-4 gap-4 mb-8">
                                <div className="bg-green-50 p-4 rounded-xl text-center">
                                    <p className="text-xs text-green-600 font-bold uppercase mb-1">Correct</p>
                                    <p className="text-2xl font-bold text-green-700">{stats.correct}</p>
                                </div>
                                <div className="bg-red-50 p-4 rounded-xl text-center">
                                    <p className="text-xs text-red-600 font-bold uppercase mb-1">Wrong</p>
                                    <p className="text-2xl font-bold text-red-700">{stats.wrong}</p>
                                </div>
                                <div className="bg-yellow-50 p-4 rounded-xl text-center">
                                    <p className="text-xs text-yellow-600 font-bold uppercase mb-1">Skipped</p>
                                    <p className="text-2xl font-bold text-yellow-700">{stats.skipped}</p>
                                </div>
                                <div className="bg-blue-50 p-4 rounded-xl text-center">
                                    <p className="text-xs text-blue-600 font-bold uppercase mb-1">Total</p>
                                    <p className="text-2xl font-bold text-blue-700">{stats.total}</p>
                                </div>
                            </div>

                            <div className="flex justify-center gap-4">
                                <Link to="/math" className="px-8 py-3 bg-[#31326F] text-white rounded-xl font-bold hover:bg-[#25265E] transition-all">Back to Topics</Link>
                                <button onClick={() => window.location.reload()} className="px-8 py-3 border-2 border-[#31326F] text-[#31326F] rounded-xl font-bold hover:bg-gray-50 transition-all">Try Again</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    const currentQ = questions[currentIndex];
    const userAnswer = userAnswers[currentQ?.id];
    // Check if the user's answer matches the correct answer (case-insensitive)
    const isAnswerCorrect = userAnswer && String(userAnswer).trim().toLowerCase() === String(currentQ?.correctAnswer).trim().toLowerCase();

    return (
        <div className="h-screen w-full bg-gradient-to-br from-[#E0FBEF] to-[#E6FFFA] flex flex-col overflow-hidden font-sans text-[#31326F]">
            {/* Header Section: Contains SunTimer and Mascot */}
            {/* Header Section: Contains SunTimer and Mascot */}
            {/* Responsive height: h-24 on mobile, h-32 on desktop */}
            <header className="flex items-center justify-between px-4 lg:px-8 py-2 lg:py-4 shrink-0 z-20 h-24 lg:h-32">
                <div className="flex items-center">
                    {/* Enlarged SunTimer for better visibility */}
                    <SunTimer timeLeft={elapsedTime} />
                </div>
                <div className="flex items-center">
                    {/* Enlarged Mascot Image aligned with timer (smaller on mobile) */}
                    <img src={mascotImg} alt="Mascot" className="w-16 h-16 lg:w-24 lg:h-24 object-contain drop-shadow-lg" />
                </div>
            </header>

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

                {/* Right Column: Inline Scratchpad (Hidden on mobile to save space) */}
                <aside className="hidden lg:block flex-[2] h-full min-h-0">
                    <InlineScratchpad />
                </aside>
            </div>

            {/* Bottom Navigation (desktop only — mobile buttons are inside QuestionCard) */}
            <div className="shrink-0 hidden lg:block px-4 lg:px-6 pb-4 lg:pb-6 max-w-[1400px] mx-auto w-full">
                <BottomBar
                    mode="junior"
                    onClear={() => {
                        const currentQ = questions[currentIndex];
                        const wasAnswered = userAnswers[currentQ.id];
                        if (!wasAnswered) return;

                        // Reset answer
                        setUserAnswers(prev => {
                            const next = { ...prev };
                            delete next[currentQ.id];
                            return next;
                        });

                        // Revert stats if it was in history
                        const historyEntry = history.find(h => h.question.id === currentQ.id);
                        if (historyEntry) {
                            setHistory(prev => prev.filter(h => h.question.id !== currentQ.id));
                            setStats(prev => ({
                                ...prev,
                                total: Math.max(0, prev.total - 1),
                                correct: historyEntry.status === 'correct' ? Math.max(0, prev.correct - 1) : prev.correct,
                                wrong: historyEntry.status === 'wrong' ? Math.max(0, prev.wrong - 1) : prev.wrong,
                                // Note: Streak restoration is imperfect without history stack, but safe to just decrement if positive
                                streak: historyEntry.status === 'correct' ? Math.max(0, prev.streak - 1) : prev.streak
                            }));
                        }
                        setShowExplanation(false);
                    }}
                    onNext={proceedToNext}
                    onExit={() => navigate('/math')}
                    onViewExplanation={() => setShowExplanation(true)}
                    showViewExplanation={!!userAnswer}
                    canGoNext={!!userAnswer}
                    onToggleScratchpad={() => setShowScratchpad(true)}
                />
            </div>

            {/* Mobile Scratchpad - Draggable Bottom Sheet */}
            <AnimatePresence>
                {showScratchpad && (
                    <>
                        {/* Backdrop overlay */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setShowScratchpad(false)}
                            className="fixed inset-0 z-[65] bg-black/30 lg:hidden"
                        />
                        {/* Bottom Sheet - drag only on handle bar */}
                        <motion.div
                            initial={{ y: '100%' }}
                            animate={{ y: 0 }}
                            exit={{ y: '100%' }}
                            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                            className="fixed bottom-0 left-0 right-0 z-[70] bg-white rounded-t-3xl shadow-2xl flex flex-col lg:hidden"
                            style={{ height: '65vh' }}
                        >
                            {/* Drag Handle - ONLY this area is draggable to dismiss */}
                            <motion.div
                                drag="y"
                                dragConstraints={{ top: 0, bottom: 0 }}
                                dragElastic={{ top: 0, bottom: 0.6 }}
                                onDragEnd={(_, info) => {
                                    if (info.offset.y > 80 || info.velocity.y > 400) {
                                        setShowScratchpad(false);
                                    }
                                }}
                                className="flex flex-col items-center pt-3 pb-2 cursor-grab active:cursor-grabbing shrink-0"
                                style={{ touchAction: 'none' }}
                            >
                                <div className="w-10 h-1.5 bg-gray-300 rounded-full" />
                            </motion.div>

                            {/* Header */}
                            <div className="flex items-center justify-between px-4 pb-3 border-b border-gray-100 shrink-0">
                                <h3 className="text-lg font-bold text-[#31326F]">Scratchpad</h3>
                                <button
                                    onClick={() => setShowScratchpad(false)}
                                    className="p-2 bg-gray-100 rounded-full hover:bg-gray-200"
                                >
                                    <X size={20} className="text-gray-600" />
                                </button>
                            </div>

                            {/* Canvas */}
                            <div className="flex-1 relative overflow-hidden">
                                <InlineScratchpad />
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
            {/* Explanation Modal */}
            <AnimatePresence>
                {showExplanation && (
                    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-white rounded-[32px] lg:rounded-[40px] max-w-4xl w-full shadow-2xl overflow-hidden flex flex-col lg:flex-row min-h-[500px] max-h-[90vh] lg:max-h-none overflow-y-auto lg:overflow-visible"
                        >
                            {/* Left Side: Mascot Area */}
                            <div className="flex-[4] bg-[#E0FBEF] flex flex-col items-center justify-center p-6 lg:p-8 relative min-h-[200px] lg:min-h-0 shrink-0">
                                <img src={mascotImg} alt="Mascot" className="w-32 h-32 lg:w-64 lg:h-64 object-contain drop-shadow-xl" />
                                <div className="mt-4 lg:mt-8 bg-white/80 backdrop-blur-sm px-6 py-2 rounded-full border border-[#4FB7B3]/30">
                                    <span className="text-[#31326F] font-bold">Keep going!</span>
                                </div>
                            </div>

                            {/* Right Side: Explanation Content */}
                            <div className="flex-[6] p-6 lg:p-12 flex flex-col">
                                <div className="flex items-center gap-3 mb-8">
                                    {!isAnswerCorrect ? (
                                        <>
                                            <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                                                <X className="w-6 h-6 text-red-500" />
                                            </div>
                                            <h3 className="text-3xl font-black text-[#31326F]">Not quite right</h3>
                                        </>
                                    ) : (
                                        <>
                                            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                                                <CheckCircle2 className="w-6 h-6 text-green-500" />
                                            </div>
                                            <h3 className="text-3xl font-black text-[#31326F]">Excellent!</h3>
                                        </>
                                    )}
                                </div>

                                <div className="mb-8">
                                    <p className="text-[#4FB7B3] text-sm font-black uppercase tracking-widest mb-3">Correct Answer</p>
                                    <div className="bg-[#E0FBEF]/50 p-4 rounded-2xl flex items-center gap-3 border border-[#4FB7B3]/20">
                                        <div className="w-6 h-6 rounded-full border-2 border-[#4FB7B3] flex items-center justify-center shadow-sm">
                                            <div className="w-3 h-3 bg-[#4FB7B3] rounded-full" />
                                        </div>
                                        <span className="text-xl font-bold text-[#31326F]">
                                            <LatexText text={currentQ.correctAnswer} />
                                        </span>
                                    </div>
                                </div>


                                <div className="flex-1">
                                    <p className="text-blue-400 text-sm font-black uppercase tracking-widest mb-3">Why is this correct?</p>
                                    <div className="text-gray-600 text-lg leading-relaxed max-h-48 overflow-y-auto pr-4 scrollbar-thin">
                                        {/* Render explanation text with LaTeX support */}
                                        <LatexText text={currentQ.explanation} />
                                    </div>
                                </div>

                                <div className="mt-8 flex justify-end">
                                    <button
                                        onClick={() => setShowExplanation(false)}
                                        className="flex items-center gap-2 px-10 py-4 bg-[#31326F] text-white rounded-2xl font-black text-lg shadow-lg hover:shadow-xl hover:bg-[#25265E] transition-all"
                                    >
                                        Got it
                                        <ChevronRight size={24} />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default MiddlePracticeSession;

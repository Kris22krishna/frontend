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
import { FullScreenScratchpad } from '../../components/FullScreenScratchpad';

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
    const [grade, setGrade] = useState(null); // Store grade for exit navigation



    const startTimeRef = useRef(Date.now());

    useEffect(() => {
        fetchQuestions();
        startTimeRef.current = Date.now();

        const timer = setInterval(() => {
            setElapsedTime((prev) => prev + 1);
        }, 1000);
        return () => clearInterval(timer);
    }, [skillId]);

    // Rerender MathJax when question changes (Fix for options rendering)
    useEffect(() => {
        if (window.MathJax && questions.length > 0) {
            const timer = setTimeout(() => {
                window.MathJax.typesetPromise && window.MathJax.typesetPromise()
                    .catch(err => console.log('MathJax error:', err));
            }, 100);
            return () => clearTimeout(timer);
        }
    }, [questions, currentIndex, showExplanation]);

    const fetchQuestions = async (diff = 'Easy', isInitial = true) => {
        if (isInitial) setLoading(true);
        else setFetchingNext(true);

        try {
            let response = await api.getPracticeQuestionsBySkill(skillId, 10);

            // Handle selection_needed: when backend has both MCQ and User Input templates,
            // it asks the frontend to choose. Auto-pick MCQ for the practice session.
            if (response && response.selection_needed) {
                console.log('[Practice] selection_needed detected, auto-picking MCQ. Available types:', response.available_types);
                response = await api.getPracticeQuestionsBySkill(skillId, 10, 'MCQ');
            }

            let rawQuestions = [];
            if (response && response.questions) rawQuestions = response.questions;
            else if (Array.isArray(response)) rawQuestions = response;
            else if (response && response.preview_samples) rawQuestions = response.preview_samples;
            else if (response) rawQuestions = [response];

            if (!Array.isArray(rawQuestions)) rawQuestions = [];

            const normalized = rawQuestions.map((q, idx) => {
                // Debug: log raw question structure
                console.log(`[Question ${idx + 1}] Raw:`, JSON.stringify(q).slice(0, 300));

                // Normalize options - handle array, object ({A: '...', B: '...'}), or string
                let opts = q.options || [];
                if (opts && typeof opts === 'object' && !Array.isArray(opts)) {
                    // Convert {A: 'val1', B: 'val2'} to ['val1', 'val2']
                    opts = Object.values(opts);
                }
                if (typeof opts === 'string') {
                    opts = opts.split(',').map(o => o.trim()).filter(Boolean);
                }
                if (!Array.isArray(opts)) opts = [];

                return {
                    id: q.id || q.question_id || idx + 1,
                    text: q.question_text || q.question || q.question_html || q.text || q.prompt || "Question Text Missing",
                    options: opts,
                    correctAnswer: q.correct_answer || q.answer || q.answer_value || q.correct_option,
                    explanation: q.solution || q.solution_html || q.explanation || q.explanation_text || "No detailed explanation available.",
                    type: (q.type || q.question_type || (opts.length > 0 ? 'mcq' : 'input')).toLowerCase(),
                    image: q.imageUrl || q.image || q.image_url,
                    hint: q.hint
                };
            });

            setQuestions(normalized);
            // Extract skill name from template_metadata (backend nests it there)
            if (response?.template_metadata?.skill_name) {
                setSkillName(response.template_metadata.skill_name);


                // Extract grade for exit navigation
                if (response?.template_metadata?.grade) {
                    setGrade(response.template_metadata.grade);
                }
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

    const proceedToNext = () => {
        setShowExplanation(false);
        if (currentIndex < questions.length - 1) {
            // This shouldn't really happen with 1-by-1 fetching but for safety
            setCurrentIndex(prev => prev + 1);
        } else {
            setCompleted(true);
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
        <div className="h-[100dvh] w-full bg-gradient-to-br from-[#E0FBEF] to-[#E6FFFA] flex flex-col overflow-hidden font-sans text-[#31326F]">
            {/* Header Section: Contains SunTimer and Mascot */}
            {/* Header Section: Contains SunTimer and Mascot */}
            {/* Responsive height: h-24 on mobile, h-32 on desktop, smaller on landscape mobile */}
            <header className="flex items-center justify-between px-4 lg:px-8 py-2 lg:py-4 shrink-0 z-20 h-24 lg:h-32 landscape:h-16 landscape:lg:h-32">
                <div className="flex items-center">
                    {/* Enlarged SunTimer for better visibility */}
                    <SunTimer timeLeft={elapsedTime} />
                </div>
                <div className="flex items-center">
                    {/* Enlarged Mascot Image aligned with timer (smaller on mobile) */}
                    <img src={mascotImg} alt="Mascot" className="w-16 h-16 lg:w-24 lg:h-24 object-contain drop-shadow-lg" />
                </div>
            </header>

            <div className="flex-1 flex flex-col lg:flex-row gap-4 lg:gap-6 px-4 lg:px-6 pb-4 lg:pb-6 overflow-hidden max-w-[1400px] mx-auto w-full">
                {/* Left Column: Question Card */}
                <main className="flex-[3] relative h-full min-h-0">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentQ?.id}
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.98 }}
                            transition={{ duration: 0.2 }}
                            className="h-full"
                        >
                            {currentQ && (
                                <QuestionCard
                                    question={currentQ}
                                    selectedAnswer={userAnswers[currentQ.id]}
                                    onAnswer={handleAnswer}
                                    onViewExplanation={() => setShowExplanation(true)}
                                    showViewExplanation={!!userAnswer}
                                    canGoNext={!!userAnswer}
                                    onNext={proceedToNext}
                                    onExit={() => navigate(grade ? `/middle/grade/${grade}` : '/math')}
                                    onToggleScratchpad={() => setShowScratchpad(true)}
                                    onClear={() => {
                                        const currentQ = questions[currentIndex];
                                        const wasAnswered = userAnswers[currentQ.id];
                                        if (!wasAnswered) return;
                                        setUserAnswers(prev => {
                                            const next = { ...prev };
                                            delete next[currentQ.id];
                                            return next;
                                        });
                                        const historyEntry = history.find(h => h.question.id === currentQ.id);
                                        if (historyEntry) {
                                            setHistory(prev => prev.filter(h => h.question.id !== currentQ.id));
                                            setStats(prev => ({
                                                ...prev,
                                                total: Math.max(0, prev.total - 1),
                                                correct: historyEntry.status === 'correct' ? Math.max(0, prev.correct - 1) : prev.correct,
                                                wrong: historyEntry.status === 'wrong' ? Math.max(0, prev.wrong - 1) : prev.wrong,
                                                streak: historyEntry.status === 'correct' ? Math.max(0, prev.streak - 1) : prev.streak
                                            }));
                                        }
                                        setShowExplanation(false);
                                    }}
                                />
                            )}
                        </motion.div>
                    </AnimatePresence>
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
                    onExit={() => navigate(grade ? `/middle/grade/${grade}` : '/math')}
                    onViewExplanation={() => setShowExplanation(true)}
                    showViewExplanation={!!userAnswer}
                    canGoNext={!!userAnswer}
                    onToggleScratchpad={() => setShowScratchpad(true)}
                />
            </div>

            {/* Mobile Scratchpad - Full Screen Overlay */}
            <AnimatePresence>
                {showScratchpad && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] lg:hidden"
                    >
                        <FullScreenScratchpad onClose={() => setShowScratchpad(false)} />
                    </motion.div>
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

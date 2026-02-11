import { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { ChevronRight, ChevronLeft, Flag, Home, RefreshCw, Star, FileText, Pencil, RotateCcw, X, Check, Eye, PenTool, Minus } from 'lucide-react';
import { motion, AnimatePresence, useDragControls } from 'framer-motion';
import StickerExit from '../../components/StickerExit';
import avatarImg from '../../assets/avatar.png';
import { api } from '../../services/api';
import Navbar from '../../components/Navbar';
import Whiteboard from '../../components/Whiteboard';
import ExplanationModal from '../../components/ExplanationModal';
import LatexContent from '../../components/LatexContent';
import './JuniorPracticeSession.css';


const JuniorPracticeSession = () => {
    const { grade } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const searchParams = new URLSearchParams(location.search);
    const skillId = searchParams.get('skillId');
    const skillName = searchParams.get('skillName');

    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [answers, setAnswers] = useState({}); // {questionIndex: {selected: ..., correct: boolean }}
    const [timeElapsed, setTimeElapsed] = useState(0); // Count up logic
    const [showResults, setShowResults] = useState(false);
    const [showMagicPad, setShowMagicPad] = useState(false);
    const [showExplanationModal, setShowExplanationModal] = useState(false);
    const dragControls = useDragControls();

    const [currentDifficulty, setCurrentDifficulty] = useState('Easy');
    const [correctCountAtLevel, setCorrectCountAtLevel] = useState(0);
    const [fetchingNext, setFetchingNext] = useState(false);

    // Fetch questions
    const fetchQuestions = async (diff = 'Easy', isInitial = true) => {
        if (!skillId) {
            setLoading(false);
            return;
        }
        try {
            if (isInitial) setLoading(true);
            else setFetchingNext(true);

            // Fetch 10 questions for the skill
            const response = await api.getPracticeQuestionsBySkill(skillId, 10);

            // Handle different response structures
            let rawQuestions = [];
            if (response && response.questions) {
                rawQuestions = response.questions; // Standard APIResponse format
            } else if (response && response.preview_samples) {
                rawQuestions = response.preview_samples; // v2 Template Preview format
            } else if (response && response.selection_needed) {
                const defaultType = response.available_types[0];
                const retryResponse = await api.getPracticeQuestionsBySkill(skillId, 10, defaultType);
                rawQuestions = retryResponse.questions || retryResponse.preview_samples || [];
            } else if (Array.isArray(response)) {
                rawQuestions = response; // Direct array
            }

            // Ensure questions are valid
            const validQuestions = rawQuestions.map(q => ({
                id: q.id || q.question_id || Math.random(),
                text: q.text || q.question_text || q.question || q.question_html,
                options: q.options || [],
                correctAnswer: q.correctAnswer || q.correct_answer || q.answer || q.answer_value,
                type: q.type || q.question_type || 'MCQ',
                solution: q.solution || q.solution_html || q.explanation || "Great effort! Keep practicing to master this.",
                difficulty: diff,
                model: q.model || 'Default'
            }));

            if (isInitial) {
                setQuestions(validQuestions);
            } else {
                setQuestions(prev => [...prev, ...validQuestions]);
            }
        } catch (error) {
            console.error('Error fetching questions:', error);
        } finally {
            setLoading(false);
            setFetchingNext(false);
        }
    };

    useEffect(() => {
        fetchQuestions('Easy', true);
    }, [skillId]);

    // Reset modal and other per-question states ONLY when question changes
    useEffect(() => {
        setShowExplanationModal(false);
    }, [currentIndex]);

    // Sync selectedOption with previous answers when navigating or when answers update
    useEffect(() => {
        if (answers[currentIndex]) {
            setSelectedOption(answers[currentIndex].selected);
        } else {
            setSelectedOption(null);
        }
    }, [currentIndex, answers]);

    // Timer logic (Count UP)
    useEffect(() => {
        if (showResults) return;
        const timer = setInterval(() => {
            setTimeElapsed(prev => prev + 1);
        }, 1000);
        return () => clearInterval(timer);
    }, [showResults]);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const handleOptionSelect = (option) => {
        if (answers[currentIndex]) return; // Disable changing answer after submit

        setSelectedOption(option);

        // Immediate Validation
        const currentQuestion = questions[currentIndex];

        // Loose comparison for numbers/strings
        // eslint-disable-next-line eqeqeq
        // Ensure both are strings for comparison to avoid type mishaps
        const val1 = String(option).trim();
        const val2 = String(currentQuestion.correctAnswer).trim();
        const isCorrect = val1 === val2;

        setAnswers(prev => ({
            ...prev,
            [currentIndex]: {
                selected: option,
                isCorrect
            }
        }));

        if (!isCorrect) {
            // Wrong Answer: Show Modal Immediately
            setShowExplanationModal(true);
        }
        // Correct Answer: UI updates automatically via isCorrect check in render
    };

    // Kept for User Input type questions where they type and hit enter/submit
    const handleSubmitAnswer = () => {
        if (!selectedOption) return;

        const currentQuestion = questions[currentIndex];

        // Robust comparison matching handleOptionSelect
        const val1 = String(selectedOption).trim();
        const val2 = String(currentQuestion.correctAnswer).trim();
        const isCorrect = val1 === val2;

        setAnswers(prev => ({
            ...prev,
            [currentIndex]: {
                selected: selectedOption,
                isCorrect
            }
        }));

        if (!isCorrect) {
            setShowExplanationModal(true);
        }
    };

    const handleNext = async () => {
        const currentAns = answers[currentIndex];
        const isCorrect = currentAns && currentAns.isCorrect;

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
            await fetchQuestions(nextDiff, false);
            setCurrentIndex(prev => prev + 1);
        }
    };

    const handlePrev = () => {
        if (currentIndex > 0) {
            setCurrentIndex(prev => prev - 1);
        }
    };

    // Compute stats from answers
    const stats = (() => {
        let correct = 0;
        const total = Object.keys(answers).length;
        Object.values(answers).forEach(ans => {
            if (ans.isCorrect) correct++;
        });
        return { correct, total: total || questions.length };
    })();

    const handleSubmitSession = async () => {

        // Submit report
        try {
            const reportData = {
                title: skillName || 'Junior Math Practice',
                type: 'practice',
                score: (stats.correct / stats.total) * 100,
                parameters: {
                    skill_id: skillId,
                    skill_name: skillName,
                    total_questions: stats.total,
                    correct_answers: stats.correct,
                    timestamp: new Date().toISOString(),
                    time_taken_seconds: timeElapsed
                },
                user_id: 1 // Should be fetched from context/auth
            };

            await api.createReport(reportData);
            setShowResults(true);
        } catch (error) {
            console.error('Error submitting report:', error);
            setShowResults(true); // Show results anyway
        }
    };

    if (loading) return <div className="loading-junior">Loading your adventure...</div>;

    if (!questions || questions.length === 0) {
        return (
            <div className="junior-practice-page">
                <header className="junior-practice-header">
                    <div className="sun-timer-container">
                        <div className="sun-timer">
                            <div className="sun-rays"></div>
                            <span className="timer-text">0:00</span>
                        </div>
                    </div>
                    <h1>Oops!</h1>
                </header>
                <main className="practice-content">
                    <div className="mascot-container">
                        <img src={avatarImg} alt="Confused Mascot" className="mascot-image" />
                    </div>
                    <div className="question-board error-board">
                        <h2>No questions found for this topic yet!</h2>
                        <p>Ask a grown-up to check back later.</p>
                        <button className="retry-btn-large" onClick={() => navigate(-1)} style={{ marginTop: '2rem' }}>
                            <Home /> Go Back
                        </button>
                    </div>
                </main>
            </div>
        );
    }

    if (showResults) {
        const score = stats.correct;
        const total = stats.total;
        const percentage = Math.round((score / total) * 100);

        return (
            <div className="junior-practice-page results-view">
                <Navbar />
                <header className="junior-practice-header results-header">
                    <div className="sun-timer-container">
                        <div className="sun-timer">
                            <div className="sun-rays"></div>
                            <span className="timer-text">Done!</span>
                        </div>
                    </div>
                    <div className="title-area">
                        <h1 className="results-title">Adventure Report</h1>
                    </div>
                </header>

                <main className="practice-content results-content">
                    <div className="mascot-container results-mascot">
                        <img src={avatarImg} alt="Happy Mascot" className="mascot-image" />
                    </div>

                    <div className="question-board results-board">
                        <h2 className="congrats-text">Adventure Complete! 🎉</h2>

                        <div className="stars-container">
                            {[1, 2, 3].map(i => (
                                <div key={i} className={`star-wrapper ${percentage >= (i * 33) ? 'active' : ''}`}>
                                    <Star
                                        size={80}
                                        fill={percentage >= (i * 33) ? "#FFD700" : "#EDF2F7"}
                                        color={percentage >= (i * 33) ? "#F6AD55" : "#CBD5E0"}
                                    />
                                </div>
                            ))}
                        </div>

                        <div className="results-stats">
                            <div className="stat-card">
                                <span className="stat-label">Correct</span>
                                <span className="stat-value highlight">{score}/{total}</span>
                            </div>
                            <div className="stat-card">
                                <span className="stat-label">Time</span>
                                <span className="stat-value">{formatTime(timeElapsed)}</span>
                            </div>
                        </div>

                        <div className="results-actions">
                            <button className="magic-pad-btn play-again" onClick={() => window.location.reload()}>
                                <RefreshCw size={24} /> Play Again
                            </button>
                            <button className="start-over-btn back-topics" onClick={() => navigate(-1)}>
                                <Home size={20} /> Back to Topics
                            </button>
                        </div>
                    </div>
                </main>
            </div>
        );
    }

    const currentQuestion = questions[currentIndex];
    const isSubmitted = !!answers[currentIndex];
    const isCorrect = isSubmitted && answers[currentIndex].isCorrect;

    // Helper to sanitize question text specifically for Junior view where options are buttons
    const cleanQuestionText = (html) => {
        if (!html) return '';
        // Remove patterns like "A. ...", "(A) ...", "a) ..." that appear at the end of the string
        let cleaned = html.replace(/(?:<br\s*\/?>|\n|\r)+\s*[A-Da-d1-4][\.\)]\s+.*?(?=(?:<br\s*\/?>|\n|\r)|$)/gi, '');
        return cleaned.trim();
    };

    return (
        <div className={`junior-practice-page ${showMagicPad ? 'magic-pad-active-mobile' : ''}`}>

            {/* Explanation Modal */}
            <ExplanationModal
                isOpen={showExplanationModal}
                isCorrect={isCorrect}
                correctAnswer={currentQuestion?.correctAnswer}
                explanation={currentQuestion?.solution}
                onClose={() => setShowExplanationModal(false)}
                onNext={() => {
                    setShowExplanationModal(false);
                    // If wrong, they might want to just close and see board, if correct they click next.
                    // The user requested: "if answer is wrong explanation pop up with got it button. a next button should be on question page"
                    // So this button just closes modal.
                }}
            />

            <header className="junior-practice-header">
                <div className="sun-timer-container">
                    <div className="sun-timer">
                        <div className="sun-rays"></div>
                        <span className="timer-text">{formatTime(timeElapsed)}</span>
                    </div>
                </div>

                <div className="exit-practice-container">
                    <StickerExit onClick={() => navigate(-1)} />
                </div>
            </header>

            {/* Main Content Area */}
            <main className="practice-content-wrapper">

                {/* Board Container - now a grid */}
                <div className="practice-board-container">

                    {/* Mascot */}
                    <div className="mascot-overlap">
                        <img src={avatarImg} alt="Mascot" className="mascot-img-large" />
                    </div>

                    {/* Left Column: Question */}
                    <div className="practice-left-col">
                        <div className="question-card-modern">
                            {/* Question Header */}
                            <div className="question-header-modern">
                                <h2 className="question-text-modern">
                                    <span className="question-number-modern">{currentIndex + 1}.</span>
                                    <LatexContent html={cleanQuestionText(currentQuestion?.text)} />
                                </h2>
                            </div>

                            {/* Interaction Area */}
                            <div className="interaction-area-modern">
                                {currentQuestion?.type === 'User Input' || currentQuestion?.type === 'user_input' ? (
                                    <div className="user-input-modern">
                                        <input
                                            type="text"
                                            className="modern-input-field"
                                            placeholder="Type here..."
                                            value={selectedOption || ''}
                                            onChange={(e) => setSelectedOption(e.target.value)}
                                            disabled={isSubmitted}
                                            onKeyDown={(e) => e.key === 'Enter' && !isSubmitted && handleSubmitAnswer()}
                                        />
                                    </div>
                                ) : (
                                    <div className="options-grid-modern">
                                        {currentQuestion?.options.map((option, idx) => {
                                            const areOptionsEqual = (a, b) => String(a).trim() === String(b).trim();
                                            return (
                                                <button
                                                    key={idx}
                                                    className={`option-btn-modern ${areOptionsEqual(selectedOption, option) ? 'selected' : ''} ${isSubmitted && areOptionsEqual(option, currentQuestion.correctAnswer) ? 'correct' : ''
                                                        } ${isSubmitted && areOptionsEqual(selectedOption, option) && !isCorrect ? 'wrong' : ''
                                                        }`}
                                                    onClick={() => handleOptionSelect(option)}
                                                    disabled={isSubmitted}
                                                >
                                                    <LatexContent html={option} />
                                                </button>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Magic Pad (Desktop: Side Panel, Mobile: Bottom Sheet) */}
                    <div className="practice-right-col">
                        {/* Desktop View: Static Panel */}
                        <div className="magic-pad-wrapper desktop-only">
                            <Whiteboard isOpen={true} onClose={() => setShowMagicPad(false)} />
                        </div>

                        {/* Mobile View: Bottom Sheet */}
                        <AnimatePresence>
                            {showMagicPad && (
                                <>
                                    {/* Backdrop */}
                                    <motion.div
                                        className="bottom-sheet-backdrop"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        onClick={() => setShowMagicPad(false)}
                                    />

                                    {/* Bottom Sheet */}
                                    <motion.div
                                        className="bottom-sheet-container"
                                        initial={{ y: "100%" }}
                                        animate={{ y: 0 }}
                                        exit={{ y: "100%" }}
                                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                                        drag="y"
                                        dragControls={dragControls}
                                        dragListener={false}
                                        dragConstraints={{ top: 0 }}
                                        dragElastic={0.2}
                                        onDragEnd={(e, { offset, velocity }) => {
                                            // Swipe down to close
                                            if (offset.y > 150 || velocity.y > 200) {
                                                setShowMagicPad(false);
                                            }
                                        }}
                                    >
                                        {/* Drag Handle Bar */}
                                        <div
                                            className="sheet-handle-bar"
                                            onPointerDown={(e) => dragControls.start(e)}
                                            style={{ touchAction: 'none' }}
                                        >
                                            <div className="sheet-handle"></div>
                                        </div>

                                        {/* Header with Close */}
                                        <div className="sheet-header-mobile">
                                            <div className="sheet-title">
                                                <Pencil size={18} /> Scratchpad
                                            </div>
                                            <div className="sheet-exit-wrapper">
                                                <StickerExit onClick={() => setShowMagicPad(false)} />
                                            </div>
                                        </div>

                                        {/* Content Area */}
                                        <div
                                            className="sheet-content"
                                            onPointerDown={(e) => e.stopPropagation()}
                                        >
                                            <Whiteboard isOpen={true} onClose={() => setShowMagicPad(false)} />
                                        </div>
                                    </motion.div>
                                </>
                            )}
                        </AnimatePresence>
                    </div>

                </div>
            </main>

            {/* Bottom Action Bar */}
            <footer className="junior-bottom-bar">

                {/* --- DESKTOP FOOTER (Original) --- */}
                <div className="desktop-footer-controls">
                    {/* Magic Pad Button (Left) */}
                    <div className="bottom-left">
                        {/* Hidden on desktop via CSS previously, but kept for structure if needed or tablet */}
                        {/* Actually, previous code hid it on desktop. Let's keep it consistent. */}
                        <button
                            className="magic-pad-btn"
                            onClick={() => setShowMagicPad(true)}
                        >
                            <Pencil size={20} className="pencil-icon" />
                            Magic Pad
                        </button>
                    </div>

                    {/* Center Controls (Clear/Explain) */}
                    <div className="bottom-center">
                        {isSubmitted && (
                            <button
                                className="view-explanation-btn"
                                onClick={() => setShowExplanationModal(true)}
                            >
                                <Eye size={20} /> View Explanation
                            </button>
                        )}
                    </div>

                    {/* Right Controls (Navigation) */}
                    <div className="bottom-right">
                        <button className="start-over-link" onClick={() => window.location.reload()}>
                            <RefreshCw size={16} /> Start Over
                        </button>

                        <div className="nav-buttons-group">
                            <button
                                className="nav-circle-btn prev"
                                onClick={handlePrev}
                                disabled={currentIndex === 0}
                            >
                                <ChevronLeft size={24} />
                            </button>

                            {isSubmitted ? (
                                <button
                                    className="nav-pill-next-btn"
                                    onClick={handleNext}
                                >
                                    Next <ChevronRight size={28} strokeWidth={3} />
                                </button>
                            ) : (
                                (currentQuestion?.type === 'User Input' || currentQuestion?.type === 'user_input') && (
                                    <button
                                        className="nav-pill-submit-btn"
                                        onClick={handleSubmitAnswer}
                                        disabled={!selectedOption}
                                    >
                                        Submit <Check size={28} strokeWidth={3} />
                                    </button>
                                )
                            )}
                        </div>
                    </div>
                </div>

                {/* --- MOBILE FOOTER (Reference Style) --- */}
                <div className="mobile-footer-controls">
                    {/* 1. Left: Sticker Exit (Original Style) */}
                    <div className="mobile-footer-left">
                        <StickerExit onClick={() => navigate(-1)} className="mobile-sticker-exit" />
                    </div>

                    {/* 2. Right: Navigation Controls (Magic, Explain, Next) */}
                    <div className="mobile-footer-right">

                        {/* 1. Left: Magic Pad Toggle */}
                        <button
                            className={`footer-icon-btn magic-btn ${showMagicPad ? 'active' : ''}`}
                            onClick={() => setShowMagicPad(true)}
                            aria-label="Magic Pad"
                        >
                            <PenTool size={40} strokeWidth={3} />
                        </button>

                        {/* 2. Middle: Explain (Only if submitted) */}
                        {isSubmitted && (
                            <button
                                className="footer-pill-btn explain-btn"
                                onClick={() => setShowExplanationModal(true)}
                            >
                                <Eye size={18} />
                                <span>Explain</span>
                            </button>
                        )}

                        {/* 3. Right: Next / Submit */}
                        {isSubmitted ? (
                            <button
                                className="footer-pill-btn next-btn"
                                onClick={handleNext}
                            >
                                <span>Next</span>
                                <ChevronRight size={20} strokeWidth={3} />
                            </button>
                        ) : (
                            (currentQuestion?.type === 'User Input' || currentQuestion?.type === 'user_input') ? (
                                <button
                                    className="footer-pill-btn submit-btn"
                                    onClick={handleSubmitAnswer}
                                    disabled={!selectedOption}
                                >
                                    <span>Submit</span>
                                    <Check size={20} strokeWidth={3} />
                                </button>
                            ) : (
                                <button
                                    className="footer-pill-btn next-btn disabled"
                                    disabled={true}
                                >
                                    <span>Next</span>
                                    <ChevronRight size={20} strokeWidth={3} />
                                </button>
                            )
                        )}
                    </div>
                </div>
            </footer>
        </div >
    );
};

export default JuniorPracticeSession;

import { useState, useEffect, useRef } from 'react';
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
    const topic = searchParams.get('topic'); // Ensure we keep topic for navigation

    // Navigation Context State
    const [skillsList, setSkillsList] = useState(location.state?.skills || []);
    const [skillIdx, setSkillIdx] = useState(location.state?.currentIndex ?? -1);

    // Fetch skills context if missing (e.g., page reload)
    useEffect(() => {
        if (skillsList.length === 0 && topic && grade) {
            const loadSkills = async () => {
                try {
                    const gradeNum = grade.replace(/\D/g, '');
                    const response = await api.getSkills(gradeNum);

                    if (response) {
                        const subtopics = response
                            .filter(s => s.topic === topic)
                            .filter((skill, index, self) =>
                                skill.skill_name && self.findIndex(s => s.skill_id === skill.skill_id) === index
                            );

                        setSkillsList(subtopics);
                        const idx = subtopics.findIndex(s => String(s.skill_id) === String(skillId));
                        setSkillIdx(idx);

                        console.log("Restored Skills Context:", subtopics.length, "Current Index:", idx);
                    }
                } catch (err) {
                    console.error("Failed to load skills context:", err);
                }
            };
            loadSkills();
        }
    }, [skillsList.length, topic, grade, skillId]);

    // Computed navigation targets
    const prevSkill = skillIdx > 0 ? skillsList[skillIdx - 1] : null;
    const nextSkill = (skillIdx !== -1 && skillIdx < skillsList.length - 1) ? skillsList[skillIdx + 1] : null;

    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [answers, setAnswers] = useState({});
    const [timeElapsed, setTimeElapsed] = useState(0);
    const [showResults, setShowResults] = useState(false);
    const [showMagicPad, setShowMagicPad] = useState(false);
    const [showExplanationModal, setShowExplanationModal] = useState(false);

    // Suggestion Modal State
    const [suggestionModal, setSuggestionModal] = useState({ isOpen: false, type: null, skill: null });

    const dragControls = useDragControls();

    const [currentDifficulty, setCurrentDifficulty] = useState('Easy');
    const [correctStreak, setCorrectStreak] = useState(0);
    const [wrongStreak, setWrongStreak] = useState(0);
    const [fetchingNext, setFetchingNext] = useState(false);
    const hasFetched = useRef(false);

    // Fetch questions
    const fetchQuestions = async (diff = null, isInitial = true) => {
        if (!skillId) {
            setLoading(false);
            return;
        }
        try {
            if (isInitial) setLoading(true);
            else setFetchingNext(true);

            // Fetch ONE question dynamically
            const response = await api.getPracticeQuestionsBySkill(skillId, 1, null, diff);

            // Update difficulty based on what we actually got for initial load
            if (isInitial && response.template_metadata?.difficulty) {
                setCurrentDifficulty(response.template_metadata.difficulty);
            }

            // Handle different response structures
            let rawQuestions = [];
            if (response && response.questions) {
                rawQuestions = response.questions; // Standard APIResponse format
            } else if (response && response.preview_samples) {
                rawQuestions = response.preview_samples; // v2 Template Preview format
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
                difficulty: diff || (response.template_metadata?.difficulty) || 'Easy',
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
        // Prevent double-fetch in StrictMode
        if (hasFetched.current) return;
        hasFetched.current = true;

        fetchQuestions(null, true);
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
        let nextCorrectStreak = correctStreak;
        let nextWrongStreak = wrongStreak;

        if (isCorrect) {
            nextCorrectStreak += 1;
            nextWrongStreak = 0;

            // 3 Correct in a row -> Move Up
            if (nextCorrectStreak >= 3) {
                if (currentDifficulty === 'Easy') {
                    nextDiff = 'Medium';
                    nextCorrectStreak = 0; // Reset streak on level up
                } else if (currentDifficulty === 'Medium') {
                    nextDiff = 'Hard';
                    nextCorrectStreak = 0; // Reset streak on level up
                }

                // Hard -> Check for Next Skill Suggestion
                if (currentDifficulty === 'Hard') {
                    nextCorrectStreak = 0; // Reset for next set
                    if (nextSkill) {
                        setSuggestionModal({ isOpen: true, type: 'next', skill: nextSkill });
                        setCorrectStreak(nextCorrectStreak);
                        setWrongStreak(nextWrongStreak);
                        return; // Modal handles navigation or resume
                    }
                }
            }
        } else {
            nextWrongStreak += 1;
            nextCorrectStreak = 0;

            // 1 Wrong -> Drop Down immediately (if not Easy)
            if (currentDifficulty === 'Medium' || currentDifficulty === 'Hard') {
                nextDiff = currentDifficulty === 'Hard' ? 'Medium' : 'Easy';
                nextWrongStreak = 0; // Reset streak after dropping
            }

            // 2 Wrong on Easy -> Check for Prev Skill / Mentor Suggestion
            if (currentDifficulty === 'Easy' && nextWrongStreak >= 2) {
                if (prevSkill) {
                    setSuggestionModal({ isOpen: true, type: 'prev', skill: prevSkill });
                } else {
                    setSuggestionModal({ isOpen: true, type: 'mentor', skill: null });
                }
                setCorrectStreak(nextCorrectStreak);
                setWrongStreak(nextWrongStreak);
                return; // Modal handles navigation or resume
            }
        }

        // Update State
        setCurrentDifficulty(nextDiff);
        setCorrectStreak(nextCorrectStreak);
        setWrongStreak(nextWrongStreak);

        // Fetch Next Question Immediately (One at a time)
        await fetchQuestions(nextDiff, false);
        setCurrentIndex(prev => prev + 1);
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

            {/* Suggestion Modal */}
            <AnimatePresence>
                {suggestionModal.isOpen && (
                    <motion.div
                        className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.div
                            className="bg-white rounded-3xl shadow-2xl p-8 max-w-sm w-full text-center relative overflow-hidden border-4 border-white"
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                        >
                            {/* Background Decorations */}
                            <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-br from-[#E0FBEF] to-[#E6FFFA] -z-10 rounded-t-2xl" />

                            <img src={avatarImg} alt="Mascot" className="w-24 h-24 mx-auto -mt-4 mb-4 object-contain drop-shadow-md hover:scale-110 transition-transform" />

                            <h3 className="text-2xl font-black text-[#31326F] mb-2 font-display">
                                {suggestionModal.type === 'next' && "Awesome Job! 🌟"}
                                {suggestionModal.type === 'prev' && "Tricky stuff? 🤔"}
                                {suggestionModal.type === 'mentor' && "Need a hint? 💡"}
                            </h3>

                            <p className="text-gray-600 mb-6 font-medium leading-relaxed">
                                {suggestionModal.type === 'next' && `You're crushing it! Want to try "${suggestionModal.skill?.name}" next?`}
                                {suggestionModal.type === 'prev' && `This seems tough. How about we practice "${suggestionModal.skill?.name}" first?`}
                                {suggestionModal.type === 'mentor' && "It looks like you might need some help. Ask a grown-up or mentor to explain this topic!"}
                            </p>

                            <div className="flex flex-col gap-3">
                                <button
                                    onClick={() => {
                                        if (suggestionModal.type === 'mentor') {
                                            setSuggestionModal({ isOpen: false, type: null, skill: null });
                                            // Reset streak so prompt doesn't appear immediately again
                                            setWrongStreak(0);
                                            // Resume practice
                                            fetchQuestions(currentDifficulty, false);
                                            setCurrentIndex(prev => prev + 1);
                                        } else {
                                            // Navigate to new skill
                                            const newSkill = suggestionModal.skill;
                                            const newIndex = skillsList.findIndex(s => s.id === newSkill.id);

                                            setSuggestionModal({ isOpen: false, type: null, skill: null });

                                            navigate(
                                                `/junior/grade/${grade}/practice?topic=${encodeURIComponent(topic || '')}&skillId=${newSkill.id}&skillName=${encodeURIComponent(newSkill.name)}`,
                                                { state: { skills: skillsList, currentIndex: newIndex } }
                                            );
                                        }
                                    }}
                                    className="w-full py-3 bg-[#31326F] text-white rounded-xl font-bold text-lg shadow-lg hover:bg-[#25265E] hover:shadow-xl transition-all transform hover:-translate-y-0.5 active:translate-y-0"
                                >
                                    {suggestionModal.type === 'next' ? "Yes, Let's Go! 🚀" :
                                        suggestionModal.type === 'prev' ? "Try Previous Skill 🔙" :
                                            "Okay, Got it! 👍"}
                                </button>

                                <button
                                    onClick={() => {
                                        setSuggestionModal({ isOpen: false, type: null, skill: null });
                                        // Reset streaks to delay re-prompting
                                        if (suggestionModal.type === 'next') setCorrectStreak(0);
                                        if (suggestionModal.type === 'prev') setWrongStreak(0);
                                        // Fetch next question logic
                                        fetchQuestions(currentDifficulty, false);
                                        setCurrentIndex(prev => prev + 1);
                                    }}
                                    className="w-full py-3 bg-white text-gray-500 rounded-xl font-bold text-lg hover:bg-gray-50 transition-colors"
                                >
                                    {suggestionModal.type === 'next' ? "Stay Here" : "Keep Trying"}
                                </button>
                            </div>

                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

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

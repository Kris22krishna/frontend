import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { ChevronRight, ChevronLeft, Flag, Home, RefreshCw, Star, FileText, Pencil, RotateCcw, X } from 'lucide-react';
import StickerExit from '../../components/StickerExit';
import avatarImg from '../../assets/avatar.png';
import { api } from '../../services/api'; // Correct import
import Navbar from '../../components/Navbar';
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
    const [answers, setAnswers] = useState({}); // { questionIndex: { selected: ..., correct: boolean } }
    const [timeElapsed, setTimeElapsed] = useState(0); // Count up logic
    const [showResults, setShowResults] = useState(false);

    // Fetch questions
    useEffect(() => {
        const fetchQuestions = async () => {
            if (!skillId) return;
            try {
                setLoading(true);
                // Fetch 10 questions for the skill
                const response = await api.getPracticeQuestionsBySkill(skillId, 10);

                // Handle different response structures
                let rawQuestions = [];
                if (response && response.questions) {
                    rawQuestions = response.questions; // Standard APIResponse format
                } else if (response && response.preview_samples) {
                    rawQuestions = response.preview_samples; // v2 Template Preview format
                } else if (response && response.selection_needed) {
                    // Logic: If multiple types available and none selected, auto-select first one for junior grades
                    const defaultType = response.available_types[0];
                    const retryResponse = await api.getPracticeQuestionsBySkill(skillId, 10, defaultType);
                    rawQuestions = retryResponse.questions || retryResponse.preview_samples || [];
                } else if (Array.isArray(response)) {
                    rawQuestions = response; // Direct array
                }

                // Ensure questions are valid
                const validQuestions = rawQuestions.map(q => {
                    return {
                        id: q.id || q.question_id || Math.random(),
                        text: q.text || q.question_text || q.question || q.question_html,
                        options: q.options || [],
                        correctAnswer: q.correctAnswer || q.correct_answer || q.answer || q.answer_value,
                        type: q.type || q.question_type || 'MCQ',
                        solution: q.solution || q.solution_html || q.explanation || "Great effort! Keep practicing to master this."
                    };
                });

                setQuestions(validQuestions);
            } catch (error) {
                console.error('Error fetching questions:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchQuestions();
    }, [skillId]);

    // Sync selectedOption with previous answers when navigating
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
    };

    const handleSubmitAnswer = () => {
        if (!selectedOption) return;

        const currentQuestion = questions[currentIndex];
        // Loose comparison for numbers/strings
        // eslint-disable-next-line eqeqeq
        const isCorrect = selectedOption == currentQuestion.correctAnswer;

        setAnswers(prev => ({
            ...prev,
            [currentIndex]: {
                selected: selectedOption,
                isCorrect
            }
        }));
    };

    const handleNext = () => {
        if (currentIndex < questions.length - 1) {
            setCurrentIndex(prev => prev + 1);
        } else {
            handleSubmitSession();
        }
    };

    const handlePrev = () => {
        if (currentIndex > 0) {
            setCurrentIndex(prev => prev - 1);
        }
    };

    const handleSubmitSession = async () => {
        // Calculate stats
        let correctCount = 0;
        Object.values(answers).forEach(ans => {
            if (ans.isCorrect) correctCount++;
        });

        // Submit report
        try {
            const reportData = {
                title: skillName || 'Junior Math Practice',
                type: 'practice',
                score: (correctCount / questions.length) * 100,
                parameters: {
                    skill_id: skillId,
                    skill_name: skillName,
                    total_questions: questions.length,
                    correct_answers: correctCount,
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
        const score = Object.values(answers).filter(a => a.isCorrect).length;
        const percentage = Math.round((score / questions.length) * 100);

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
                                <span className="stat-value highlight">{score}/{questions.length}</span>
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

    const getStepStatus = (index) => {
        if (index === currentIndex) return 'current';
        if (!!answers[index]) return 'completed';
        return '';
    };

    return (
        <div className="junior-practice-page">
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

            <main className="practice-content">
                <div className="mascot-container">
                    <img src={avatarImg} alt="Mascot" className="mascot-image" />
                </div>

                <div className="question-board">
                    <div className="board-header">
                        <h2 className="question-text">
                            <span className="question-number">{currentIndex + 1}.</span>
                            <span dangerouslySetInnerHTML={{ __html: currentQuestion?.text }} />
                        </h2>
                    </div>

                    <div className="board-interaction-area">
                        {currentQuestion?.type === 'User Input' || currentQuestion?.type === 'user_input' ? (
                            <div className="user-input-container">
                                <input
                                    type="text"
                                    className="user-input-large"
                                    placeholder="Type here..."
                                    value={selectedOption || ''}
                                    onChange={(e) => handleOptionSelect(e.target.value)}
                                    disabled={isSubmitted} // Disable after submit
                                    onKeyDown={(e) => e.key === 'Enter' && !isSubmitted && handleSubmitAnswer()}
                                />
                            </div>
                        ) : (
                            <div className="options-grid">
                                {currentQuestion?.options.map((option, idx) => (
                                    <button
                                        key={idx}
                                        className={`option-btn ${selectedOption === option ? 'selected' : ''} ${isSubmitted && option === currentQuestion.correctAnswer ? 'correct-option' : ''
                                            } ${isSubmitted && selectedOption === option && !isCorrect ? 'wrong-option' : ''
                                            }`}
                                        onClick={() => handleOptionSelect(option)}
                                        disabled={isSubmitted}
                                        dangerouslySetInnerHTML={{ __html: option }}
                                    />
                                ))}
                            </div>
                        )}

                        {/* FEEDBACK AREA */}
                        {isSubmitted && (
                            <div className={`feedback-container ${isCorrect ? 'feedback-correct' : 'feedback-incorrect'}`}>
                                <div className="feedback-header">
                                    {isCorrect ? (
                                        <><span>🎉</span> Correct!</>
                                    ) : (
                                        <><span>❌</span> Oops!</>
                                    )}
                                </div>
                                <div className="feedback-explanation">
                                    {!isCorrect && <div className="correct-answer-text">Correct answer: {currentQuestion.correctAnswer}</div>}
                                    <div dangerouslySetInnerHTML={{ __html: currentQuestion.solution }} />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </main>

            <div className="bottom-actions-bar">
                {/* Replaced Magic Pad with Submit/Next Action */}
                <div className="action-center">
                    {!isSubmitted ? (
                        <button
                            className="submit-answer-btn"
                            onClick={handleSubmitAnswer}
                            disabled={!selectedOption}
                        >
                            Submit Answer 🚀
                        </button>
                    ) : (
                        <button className="next-question-btn" onClick={handleNext}>
                            {currentIndex < questions.length - 1 ? "Next Question ➡️" : "Finish Adventure 🏁"}
                        </button>
                    )}
                </div>

                <div className="right-controls">
                    <button className="start-over-btn" onClick={() => window.location.reload()}>
                        <RotateCcw size={18} /> Restart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default JuniorPracticeSession;

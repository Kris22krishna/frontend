import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { ChevronRight, ChevronLeft, Flag, Home, RefreshCw, Star, FileText, Pencil, RotateCcw, X } from 'lucide-react';
import StickerExit from '../../components/StickerExit';
import avatarImg from '../../assets/avatar.png';
import { api } from '../../services/api'; // Correct import
import ModelRenderer from '../../models/ModelRenderer';
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
    const [currentDifficulty, setCurrentDifficulty] = useState('Easy');
    const [fetchingNext, setFetchingNext] = useState(false);
    const [stats, setStats] = useState({ correct: 0, total: 0 });
    const [correctCountAtLevel, setCorrectCountAtLevel] = useState(0);

    // Fetch questions
    const fetchQuestions = async (diff = 'Easy', isInitial = true) => {
        if (!skillId) return;
        if (isInitial) setLoading(true);
        else setFetchingNext(true);

        try {
            // Fetch 1 question at a time with specified difficulty
            const response = await api.getPracticeQuestionsBySkill(skillId, 1, null, diff);

            let rawQuestions = [];
            if (response && response.questions) {
                rawQuestions = response.questions;
            } else if (response && response.preview_samples) {
                rawQuestions = response.preview_samples;
            } else if (response && response.selection_needed) {
                const defaultType = response.available_types[0];
                const retryResponse = await api.getPracticeQuestionsBySkill(skillId, 1, defaultType, diff);
                rawQuestions = retryResponse.questions || retryResponse.preview_samples || [];
            } else if (Array.isArray(response)) {
                rawQuestions = response;
            }

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

        setStats(prev => ({
            total: prev.total + 1,
            correct: isCorrect ? prev.correct + 1 : prev.correct
        }));
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
                        <div className="flex justify-between items-center w-full px-4 mb-2">
                            <span className="question-number">Question {currentIndex + 1}</span>
                            <span className={`difficulty-tag ${currentDifficulty.toLowerCase()}`}>
                                {currentDifficulty}
                            </span>
                        </div>
                        <h2 className="question-text">
                            {fetchingNext ? (
                                <div className="junior-loader">Finding next puzzle...</div>
                            ) : (
                                <span dangerouslySetInnerHTML={{ __html: currentQuestion?.text }} />
                            )}
                        </h2>
                    </div>

                    <div className="board-interaction-area">
                        <ModelRenderer
                            question={currentQuestion}
                            userAnswer={selectedOption}
                            setUserAnswer={handleOptionSelect}
                            feedback={isSubmitted ? (isCorrect ? 'correct' : 'incorrect') : null}
                            disabled={isSubmitted}
                            onCheck={handleSubmitAnswer}
                        />

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
                        <div className="flex gap-4">
                            <button className="magic-pad-btn" onClick={handleSubmitSession}>
                                Finish Adventure 🏁
                            </button>
                            <button className="next-question-btn" onClick={handleNext}>
                                Next Question ➡️
                            </button>
                        </div>
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

import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { ChevronRight, ChevronLeft, Flag, Home, RefreshCw, Star, FileText, Pencil, RotateCcw, X, Check, Eye, PenTool, Minus, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence, useDragControls } from 'framer-motion';
import StickerExit from '../../../components/StickerExit';
import avatarImg from '../../../assets/avatar.png';
import { api } from '../../../services/api';
import Navbar from '../../../components/Navbar';
import Whiteboard from '../../../components/Whiteboard';
import { FullScreenScratchpad } from '../../../components/FullScreenScratchpad';
import ExplanationModal from '../../../components/ExplanationModal';
import LatexContent from '../../../components/LatexContent';
import './Grade4PracticeSession.css';

const Grade4PracticeSession = () => {
    const { grade } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const searchParams = new URLSearchParams(location.search);
    const skillId = searchParams.get('skillId');
    const skillName = searchParams.get('skillName');
    const topic = searchParams.get('topic');

    // Navigation Context State
    const [skillsList, setSkillsList] = useState(location.state?.skills || []);
    const [skillIdx, setSkillIdx] = useState(location.state?.currentIndex ?? -1);

    // Fetch skills context if missing
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
                    }
                } catch (err) {
                    console.error("Failed to load skills context:", err);
                }
            };
            loadSkills();
        }
    }, [skillsList.length, topic, grade, skillId]);

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

    const [suggestionModal, setSuggestionModal] = useState({ isOpen: false, type: null, skill: null });
    const [sessionId, setSessionId] = useState(null);
    const questionStartTime = useRef(Date.now());
    const accumulatedTime = useRef(0);
    const isTabActive = useRef(true);
    const sessionCreatedForSkill = useRef(null);

    const [currentDifficulty, setCurrentDifficulty] = useState('Easy');
    const [correctStreak, setCorrectStreak] = useState(0);
    const [wrongStreak, setWrongStreak] = useState(0);
    const [fetchingNext, setFetchingNext] = useState(false);
    const hasFetched = useRef(false);

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        if (skillId && !sessionId && userId && sessionCreatedForSkill.current !== skillId) {
            sessionCreatedForSkill.current = skillId;
            api.createPracticeSession(userId, skillId).then(sess => {
                if (sess && sess.session_id) setSessionId(sess.session_id);
            }).catch(err => {
                console.error("Failed to start session", err);
                sessionCreatedForSkill.current = null;
            });
        }
    }, [skillId, sessionId]);

    useEffect(() => {
        const handleVisibilityChange = () => {
            if (document.hidden) {
                accumulatedTime.current += Date.now() - questionStartTime.current;
                isTabActive.current = false;
            } else {
                questionStartTime.current = Date.now();
                isTabActive.current = true;
            }
        };
        document.addEventListener("visibilitychange", handleVisibilityChange);
        return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
    }, []);

    const fetchQuestions = async (diff = null, isInitial = true) => {
        if (!skillId) {
            setLoading(false);
            return;
        }
        try {
            if (isInitial) setLoading(true);
            else setFetchingNext(true);

            const response = await api.getPracticeQuestionsBySkill(skillId, 1, null, diff);

            if (isInitial && response.template_metadata?.difficulty) {
                setCurrentDifficulty(response.template_metadata.difficulty);
            }

            let rawQuestions = [];
            if (response && response.questions) {
                rawQuestions = response.questions;
            } else if (response && response.preview_samples) {
                rawQuestions = response.preview_samples;
            } else if (Array.isArray(response)) {
                rawQuestions = response;
            }

            const validQuestions = rawQuestions.map(q => ({
                id: q.id || q.question_id || Math.random(),
                template_id: q.template_id,
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
        if (hasFetched.current) return;
        hasFetched.current = true;
        fetchQuestions(null, true);
    }, [skillId]);

    useEffect(() => {
        setShowExplanationModal(false);
    }, [currentIndex]);

    useEffect(() => {
        if (answers[currentIndex]) {
            setSelectedOption(answers[currentIndex].selected);
        } else {
            setSelectedOption(null);
        }
    }, [currentIndex, answers]);

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

    const recordQuestionAttempt = async (question, selected, isCorrect) => {
        const userId = localStorage.getItem('userId');
        if (!userId) return;

        let timeSpent = accumulatedTime.current;
        if (isTabActive.current) {
            timeSpent += Date.now() - questionStartTime.current;
        }
        const seconds = Math.round(timeSpent / 1000);

        try {
            await api.recordAttempt({
                user_id: parseInt(userId, 10),
                session_id: sessionId,
                skill_id: parseInt(skillId, 10),
                template_id: question.template_id || null,
                difficulty_level: currentDifficulty,
                question_text: String(question.text || ''),
                correct_answer: String(question.correctAnswer || ''),
                student_answer: String(selected || ''),
                is_correct: isCorrect,
                solution_text: String(question.solution || ''),
                time_spent_seconds: seconds >= 0 ? seconds : 0
            });
        } catch (e) {
            console.error("Failed to record attempt", e);
        }
    };

    const handleOptionSelect = (option) => {
        if (answers[currentIndex]) return;

        setSelectedOption(option);
        const currentQuestion = questions[currentIndex];
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

        setShowExplanationModal(true);
        recordQuestionAttempt(currentQuestion, option, isCorrect);
    };

    const handleSubmitAnswer = () => {
        if (!selectedOption) return;
        const currentQuestion = questions[currentIndex];
        const val1 = String(selectedOption).trim().toLowerCase();
        const val2 = String(currentQuestion.correctAnswer).trim().toLowerCase();
        const isCorrect = val1 === val2;

        setAnswers(prev => ({
            ...prev,
            [currentIndex]: {
                selected: selectedOption,
                isCorrect
            }
        }));

        setShowExplanationModal(true);
        recordQuestionAttempt(currentQuestion, selectedOption, isCorrect);
    };

    const QUESTIONS_PER_SESSION = 10;

    const handleNext = async () => {
        const currentAns = answers[currentIndex];
        const isCorrect = currentAns && currentAns.isCorrect;

        if (stats.total >= QUESTIONS_PER_SESSION) {
            handleSubmitSession();
            return;
        }

        let nextDiff = currentDifficulty;
        let nextCorrectStreak = correctStreak;
        let nextWrongStreak = wrongStreak;

        if (isCorrect) {
            nextCorrectStreak += 1;
            nextWrongStreak = 0;
            if (nextCorrectStreak >= 3) {
                if (currentDifficulty === 'Easy') {
                    nextDiff = 'Medium';
                    nextCorrectStreak = 0;
                } else if (currentDifficulty === 'Medium') {
                    nextDiff = 'Hard';
                    nextCorrectStreak = 0;
                }
                if (currentDifficulty === 'Hard') {
                    nextCorrectStreak = 0;
                    if (nextSkill) {
                        setSuggestionModal({ isOpen: true, type: 'next', skill: nextSkill });
                        return;
                    }
                }
            }
        } else {
            nextWrongStreak += 1;
            nextCorrectStreak = 0;
            if (currentDifficulty === 'Medium' || currentDifficulty === 'Hard') {
                nextDiff = currentDifficulty === 'Hard' ? 'Medium' : 'Easy';
                nextWrongStreak = 0;
            }
            if (currentDifficulty === 'Easy' && nextWrongStreak >= 2) {
                if (prevSkill) {
                    setSuggestionModal({ isOpen: true, type: 'prev', skill: prevSkill });
                } else {
                    setSuggestionModal({ isOpen: true, type: 'mentor', skill: null });
                }
                return;
            }
        }

        setCurrentDifficulty(nextDiff);
        setCorrectStreak(nextCorrectStreak);
        setWrongStreak(nextWrongStreak);

        await fetchQuestions(nextDiff, false);
        setCurrentIndex(prev => prev + 1);
        accumulatedTime.current = 0;
        questionStartTime.current = Date.now();
    };

    const handleSubmitSession = async () => {
        if (sessionId) await api.finishSession(sessionId).catch(console.error);
        try {
            const reportData = {
                title: skillName || 'Grade 4 Math Practice',
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
                user_id: 1
            };
            await api.createReport(reportData);
            setShowResults(true);
        } catch (error) {
            console.error('Error submitting report:', error);
            setShowResults(true);
        }
    };

    const stats = (() => {
        let correct = 0;
        const total = Object.keys(answers).length;
        Object.values(answers).forEach(ans => {
            if (ans.isCorrect) correct++;
        });
        return { correct, total: total || questions.length };
    })();

    if (loading) return <div className="loading-grade4">Entering the Forest of Knowledge... 🌳</div>;

    if (!questions || questions.length === 0) {
        return (
            <div className="grade4-practice-page">
                <header className="grade4-practice-header">
                    <div className="forest-timer-container">
                        <div className="forest-timer">
                            <span className="timer-text">0:00</span>
                        </div>
                    </div>
                </header>
                <main className="practice-content">
                    <div className="question-board error-board">
                        <h2>Exploration paused!</h2>
                        <p>We couldn't find questions for this area. Let's head back!</p>
                        <button className="back-btn-large" onClick={() => navigate(-1)}>
                            <Home /> Return Base
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
            <div className="grade4-practice-page results-view">
                <Navbar />
                <header className="grade4-practice-header results-header">
                    <button onClick={() => navigate(-1)} className="back-topics-btn">
                        <FileText /> Back to Adventures
                    </button>
                    <div className="results-title-area">
                        <h1>Exploration Complete! 🏆</h1>
                    </div>
                </header>

                <main className="practice-content results-content">
                    <div className="results-hero">
                        <img src={avatarImg} alt="Mascot" className="results-mascot" />
                        <h2>Adventure Report</h2>
                        <div className="stars-row">
                            {[1, 2, 3].map(i => (
                                <Star key={i} size={60} fill={percentage >= (i * 33) ? "#FFD700" : "#EDF2F7"} color={percentage >= (i * 33) ? "#F6AD55" : "#CBD5E0"} />
                            ))}
                        </div>
                        <div className="stats-grid">
                            <div className="stat-box"><span>Correct</span><strong>{score}/{total}</strong></div>
                            <div className="stat-box"><span>Time</span><strong>{formatTime(timeElapsed)}</strong></div>
                            <div className="stat-box"><span>Accuracy</span><strong>{percentage}%</strong></div>
                            <div className="stat-box"><span>Streak</span><strong>{correctStreak}</strong></div>
                        </div>
                    </div>

                    <div className="quest-log">
                        <h3>Quest Log 📜</h3>
                        {questions.slice(0, stats.total).map((q, idx) => {
                            const ans = answers[idx];
                            if (!ans) return null;
                            return (
                                <div key={idx} className={`log-item ${ans.isCorrect ? 'correct' : 'wrong'}`}>
                                    <div className="log-index">{idx + 1}</div>
                                    <div className="log-details">
                                        <div className="log-question"><LatexContent html={q.text} /></div>
                                        <div className="log-answers">
                                            <div className="ans-yours">Your: {ans.selected}</div>
                                            {!ans.isCorrect && <div className="ans-correct">Expected: {q.correctAnswer}</div>}
                                        </div>
                                    </div>
                                    <div className="log-icon">{ans.isCorrect ? <Check /> : <X />}</div>
                                </div>
                            );
                        })}
                    </div>

                    <div className="results-footer">
                        <button className="btn-primary" onClick={() => window.location.reload()}><RefreshCw /> New Quest</button>
                        <button className="btn-secondary" onClick={() => navigate(-1)}><Home /> End Adventure</button>
                    </div>
                </main>
            </div>
        );
    }

    const currentQuestion = questions[currentIndex];
    const isSubmitted = !!answers[currentIndex];
    const isCorrect = isSubmitted && answers[currentIndex].isCorrect;

    const cleanText = (html) => {
        if (!html) return '';
        let cleaned = html.replace(/(?:<br\s*\/?>|\n|\r)+\s*[A-Da-d1-4][\.\)]\s+.*?(?=(?:<br\s*\/?>|\n|\r)|$)/gi, '');
        cleaned = cleaned.replace(/_{2,}/g, ' $\\underline{\\hspace{1cm}}$ ');
        return cleaned.trim();
    };

    return (
        <div className="grade4-practice-page">
            <header className="grade4-practice-header">
                <div className="header-left">
                    <div className="forest-timer">
                        <span className="timer-text">{formatTime(timeElapsed)}</span>
                    </div>
                </div>
                <div className="header-right">
                    <StickerExit onClick={() => navigate(-1)} />
                </div>
            </header>

            <main className="practice-container">
                <div className="mascot-side">
                    <img src={avatarImg} alt="Mascot" className="explorer-mascot" />
                </div>

                <div className="practice-layout">
                    <div className="question-side">
                        <div className="grade4-card">
                            <div className="card-header">
                                <span className="question-tag">Quest {currentIndex + 1}</span>
                                <h2 className="question-content">
                                    <LatexContent html={cleanText(currentQuestion?.text)} />
                                </h2>
                            </div>

                            <div className="card-body">
                                {currentQuestion?.type === 'User Input' || currentQuestion?.type === 'user_input' ? (
                                    <div className="input-area">
                                        <input
                                            type="text"
                                            className={`forest-input ${isSubmitted ? (isCorrect ? 'correct' : 'wrong') : ''}`}
                                            placeholder="Write your answer..."
                                            value={selectedOption || ''}
                                            onChange={(e) => setSelectedOption(e.target.value)}
                                            disabled={isSubmitted}
                                            onKeyDown={(e) => e.key === 'Enter' && !isSubmitted && handleSubmitAnswer()}
                                        />
                                    </div>
                                ) : (
                                    <div className="options-area">
                                        {currentQuestion?.options.map((option, idx) => (
                                            <button
                                                key={idx}
                                                className={`forest-option ${String(selectedOption) === String(option) ? 'selected' : ''} ${isSubmitted && String(option) === String(currentQuestion.correctAnswer) ? 'correct' : ''} ${isSubmitted && String(selectedOption) === String(option) && !isCorrect ? 'wrong' : ''}`}
                                                onClick={() => handleOptionSelect(option)}
                                                disabled={isSubmitted}
                                            >
                                                <LatexContent html={option} />
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="scratchpad-side">
                        <div className="magic-pad-container">
                            <Whiteboard isOpen={true} onClose={() => setShowMagicPad(false)} />
                        </div>
                    </div>
                </div>
            </main>

            <footer className="grade4-footer">
                <div className="footer-content">
                    <div className="footer-left">
                        {isSubmitted && (
                            <button className="explain-btn" onClick={() => setShowExplanationModal(true)}>
                                <Eye /> Reveal Solution
                            </button>
                        )}
                    </div>
                    <div className="footer-right">
                        {isSubmitted ? (
                            <button className="next-btn" onClick={handleNext}>
                                Continue <ChevronRight />
                            </button>
                        ) : (
                            (currentQuestion?.type === 'User Input' || currentQuestion?.type === 'user_input') && (
                                <button className="submit-btn" onClick={handleSubmitAnswer} disabled={!selectedOption}>
                                    Check Answer
                                </button>
                            )
                        )}
                    </div>
                </div>
            </footer>

            <ExplanationModal
                isOpen={showExplanationModal}
                isCorrect={isCorrect}
                correctAnswer={currentQuestion?.correctAnswer}
                explanation={currentQuestion?.solution}
                onClose={() => setShowExplanationModal(false)}
                onNext={() => { setShowExplanationModal(false); if (isCorrect) handleNext(); }}
            />

            <AnimatePresence>
                {suggestionModal.isOpen && (
                    <motion.div className="suggestion-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        <div className="suggestion-modal">
                            <img src={avatarImg} alt="Mascot" className="modal-mascot" />
                            <h3>{suggestionModal.type === 'next' ? "Master Explorer!" : "Tricky Trail?"}</h3>
                            <p>{suggestionModal.type === 'next' ? `You've mastered this! Want to explore "${suggestionModal.skill?.name}"?` : `This trail is tough. Let's try "${suggestionModal.skill?.name}" instead?`}</p>
                            <div className="modal-actions">
                                <button className="btn-go" onClick={() => navigate(`/junior/grade/${grade}/practice?topic=${encodeURIComponent(topic || '')}&skillId=${suggestionModal.skill.id}&skillName=${encodeURIComponent(suggestionModal.skill.name)}`)}>
                                    Move Forward
                                </button>
                                <button className="btn-stay" onClick={() => setSuggestionModal({ isOpen: false, type: null, skill: null })}>
                                    Keep Exploring
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Grade4PracticeSession;

import { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom';
import { api } from '../../services/api';
import ModelRenderer from '../../models/ModelRenderer';
import './MiddlePracticeSession.css';

// Components
import Navbar from '../../components/Navbar';
import { QuestionCard } from '../../components/QuestionCard';
import { BottomBar } from '../../components/BottomBar';
import { SunTimer } from '../../components/SunTimer';
import { InlineScratchpad } from '../../components/InlineScratchpad';
import { LatexText } from '../../components/LatexText';
import { AnimatePresence, motion } from 'framer-motion';
import { X, CheckCircle2, ChevronRight, Target, Clock, BookOpen, ArrowLeft } from 'lucide-react';
import { FullScreenScratchpad } from '../../components/FullScreenScratchpad';
import { capitalizeFirstLetter } from '../../lib/stringUtils';

// Assets
import mascotImg from '../../assets/mascot.png';

const encouragingPhrases = [
    "Great job!", "Way to go!", "You're doing amazing!", "Keep it up!",
    "Fantastic!", "Brilliant!", "Spot on!", "Excellent work!",
    "You're a star!", "Correct!",

    // New ones
    "Nailed it!",
    "That’s absolutely right!",
    "Boom! You got it!",
    "Superb work!",
    "You’re on fire!",
    "Impressive!",
    "That was smooth!",
    "Sharp thinking!",
    "You crushed it!",
    "Outstanding!",
    "Perfect answer!",
    "You’re getting really good at this!",
    "Yes! That’s the one!",
    "Top-tier answer!",
    "Flawless!",
    "You’ve got this!",
    "Keep shining!",
    "That’s some solid reasoning!",
    "Smart move!",
    "You’re leveling up!"
];


const MiddlePracticeSession = () => {
    const { skillId } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
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
    const [encouragement, setEncouragement] = useState(null);
    const [grade, setGrade] = useState(location.state?.grade || null);

    // Adaptive Logic State
    const [correctStreak, setCorrectStreak] = useState(0);
    const [wrongStreak, setWrongStreak] = useState(0);
    const [suggestionModal, setSuggestionModal] = useState({ isOpen: false, type: null, skill: null });

    // Skills Context (for navigation suggestions)
    const [skillsList, setSkillsList] = useState(location.state?.skills || []);
    const [skillIdx, setSkillIdx] = useState(location.state?.currentIndex ?? -1);

    // Session & Timer State
    const [sessionId, setSessionId] = useState(null);
    const questionStartTime = useRef(Date.now());
    const accumulatedTime = useRef(0);
    const isTabActive = useRef(true);
    const hasFetched = useRef(false);

    // Computed navigation targets
    const prevSkill = skillIdx > 0 ? skillsList[skillIdx - 1] : null;
    const nextSkill = (skillIdx !== -1 && skillIdx < skillsList.length - 1) ? skillsList[skillIdx + 1] : null;

    // Initial Session Creation
    const sessionCreatedForSkill = useRef(null);

    // Fetch skills context if missing (e.g., page reload)
    useEffect(() => {
        if (skillsList.length === 0 && skillId) {
            api.getSkillById(skillId).then(async (currentSkill) => {
                if (currentSkill?.grade) setGrade(currentSkill.grade);
                if (currentSkill?.topic && currentSkill?.grade) {
                    try {
                        const gradeNum = currentSkill.grade.replace(/\D/g, '');
                        const response = await api.getSkills(gradeNum);
                        if (response) {
                            const subtopics = response
                                .filter(s => s.topic === currentSkill.topic)
                                .filter((skill, index, self) =>
                                    skill.skill_name && self.findIndex(s => s.skill_id === skill.skill_id) === index
                                );
                            setSkillsList(subtopics);
                            const idx = subtopics.findIndex(s => String(s.skill_id) === String(skillId));
                            setSkillIdx(idx);
                        }
                    } catch (e) { console.error("Failed to restore skills context", e); }
                }
            }).catch(err => console.error("Failed to fetch skill info", err));
        }
    }, [skillsList.length, skillId]);

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
    }, [skillId]);

    // Timer Visibility Logic
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

    // Live Timer
    useEffect(() => {
        const timer = setInterval(() => {
            setElapsedTime((prev) => prev + 1);
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    // Fetch Questions
    // Adaptive Change: fetch mainly 1 question at a time (or batch 1)
    const fetchQuestions = async (diff = null, isInitial = true) => {
        if (!skillId) {
            setLoading(false);
            return;
        }

        if (isInitial) setLoading(true);
        else setFetchingNext(true);

        try {
            // Fetch ONE question dynamically
            let response = await api.getPracticeQuestionsBySkill(skillId, 1, null, diff || currentDifficulty);

            if (isInitial && response.template_metadata?.difficulty) {
                setCurrentDifficulty(response.template_metadata.difficulty);
            }

            let rawQuestions = [];
            if (response && response.questions) rawQuestions = response.questions;
            else if (Array.isArray(response)) rawQuestions = response;
            else if (response && response.preview_samples) rawQuestions = response.preview_samples;
            else if (response) rawQuestions = [response];

            if (!Array.isArray(rawQuestions)) rawQuestions = [];

            const normalized = rawQuestions.map((q, idx) => {
                let opts = q.options || [];
                if (opts && typeof opts === 'object' && !Array.isArray(opts)) opts = Object.values(opts);
                if (typeof opts === 'string') opts = opts.split(',').map(o => o.trim()).filter(Boolean);
                if (!Array.isArray(opts)) opts = [];

                let qText = q.question_text || q.question || q.question_html || q.text || "Question Text Missing";
                if (typeof qText === 'string') qText = qText.replace(/className=/g, 'class=');

                return {
                    id: q.id || q.question_id || (Date.now() + idx),
                    template_id: q.template_id,
                    text: qText,
                    options: opts,
                    correctAnswer: q.correct_answer || q.answer || q.answer_value || q.correct_option,
                    explanation: q.solution || q.solution_html || q.explanation || "No detailed explanation available.",
                    type: (q.type || q.question_type || (opts.length > 0 ? 'mcq' : 'input')).toLowerCase(),
                    image: q.imageUrl || q.image || q.image_url,
                    hint: q.hint
                };
            });

            if (isInitial) {
                setQuestions(normalized);
                if (response?.template_metadata?.skill_name) setSkillName(response.template_metadata.skill_name);
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

    useEffect(() => {
        // Prevent double-fetch in StrictMode
        if (hasFetched.current) return;
        hasFetched.current = true;
        fetchQuestions(null, true);
    }, [skillId]);

    // Rerender MathJax
    useEffect(() => {
        if (window.MathJax && questions.length > 0) {
            const timer = setTimeout(() => {
                window.MathJax.typesetPromise && window.MathJax.typesetPromise()
                    .catch(e => console.log('MathJax error:', e));
            }, 100);
            return () => clearTimeout(timer);
        }
    }, [questions, currentIndex, showExplanation]);

    const recordQuestionAttempt = async (question, selected, isCorrect) => {
        const userId = localStorage.getItem('userId');
        if (!userId) return;

        let timeSpent = accumulatedTime.current;
        if (isTabActive.current) timeSpent += Date.now() - questionStartTime.current;
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
                solution_text: String(question.explanation || ''),
                time_spent_seconds: seconds >= 0 ? seconds : 0
            });
        } catch (e) { console.error("Failed to record attempt", e); }
    };

    const QUESTIONS_PER_SESSION = 10;

    const handleAnswer = (answer) => {
        const currentQ = questions[currentIndex];
        setUserAnswers(prev => ({ ...prev, [currentQ.id]: answer }));

        const isCorrect = String(answer).trim().toLowerCase() === String(currentQ.correctAnswer).trim().toLowerCase();

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

            recordQuestionAttempt(currentQ, answer, isCorrect);
        }

        if (isCorrect) {
            const randomPhrase = encouragingPhrases[Math.floor(Math.random() * encouragingPhrases.length)];
            setEncouragement(randomPhrase);
            setShowExplanation(false);
        } else {
            setEncouragement(null);
            setShowExplanation(true);
        }
    };

    const proceedToNext = async () => {
        setShowExplanation(false);
        setEncouragement(null);

        if (stats.total >= QUESTIONS_PER_SESSION) {
            if (sessionId) api.finishSession(sessionId).catch(console.error);
            setCompleted(true);
            return;
        }

        const currentQ = questions[currentIndex];
        const userAnswer = userAnswers[currentQ?.id];
        const isCorrect = userAnswer && String(userAnswer).trim().toLowerCase() === String(currentQ?.correctAnswer).trim().toLowerCase();

        // Adaptive Logic
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

                // If mastered Hard
                if (currentDifficulty === 'Hard') {
                    nextCorrectStreak = 0;
                    if (nextSkill) {
                        setSuggestionModal({ isOpen: true, type: 'next', skill: nextSkill });
                        setCorrectStreak(nextCorrectStreak);
                        setWrongStreak(nextWrongStreak);
                        return;
                    }
                }
            }
        } else {
            nextCorrectStreak = 0;
            nextWrongStreak += 1;

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
                setCorrectStreak(nextCorrectStreak);
                setWrongStreak(nextWrongStreak);
                return;
            }
        }

        setCurrentDifficulty(nextDiff);
        setCorrectStreak(nextCorrectStreak);
        setWrongStreak(nextWrongStreak);

        // Fetch Next
        await fetchQuestions(nextDiff, false);
        setCurrentIndex(prev => prev + 1);
        accumulatedTime.current = 0;
        questionStartTime.current = Date.now();
        isTabActive.current = !document.hidden;
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}m ${secs}s`;
    };

    if (loading) return <div className="middle-loading">Generating problems...</div>;

    if (!questions || questions.length === 0) {
        return (
            <div className="h-[100dvh] w-full bg-gradient-to-br from-[#E0FBEF] to-[#E6FFFA] flex items-center justify-center font-sans text-[#31326F]">
                <div className="text-center p-12 bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl max-w-lg mx-auto border border-white/50">
                    <img src={mascotImg} alt="Mascot" className="w-32 h-32 mx-auto mb-6 object-contain drop-shadow-md" />
                    <h2 className="text-3xl font-bold mb-4 text-[#31326F]">No questions found!</h2>
                    <p className="text-lg text-[#31326F] opacity-80 mb-8 font-medium">Ask a grown-up to check back later.</p>
                    <button onClick={() => navigate(-1)} className="px-8 py-3 bg-[#31326F] text-white rounded-2xl font-bold text-lg hover:bg-[#25265E] transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1">Go Back</button>
                </div>
            </div>
        );
    }

    if (completed) {
        const accuracy = Math.round((stats.correct / (stats.total || 1)) * 100);
        return (
            <div className="middle-practice-page results-view overflow-y-auto bg-gray-50 min-h-screen">
                <Navbar />
                <div className="report-container p-6 lg:p-8 max-w-4xl mx-auto">
                    <div className="bg-white rounded-[32px] shadow-2xl overflow-hidden border border-gray-100 mb-8">
                        <div className="results-header bg-[#31326F] p-8 lg:p-12 text-white text-center relative overflow-hidden">
                            <h1 className="text-4xl font-black mb-2 tracking-tight">Practice Complete!</h1>
                            <p className="text-xl opacity-80 font-medium">{capitalizeFirstLetter(skillName)}</p>
                            <div className="mt-10 flex flex-wrap justify-center gap-8">
                                <div className="bg-white/10 backdrop-blur-md px-8 py-4 rounded-2xl border border-white/10">
                                    <p className="text-sm opacity-60 uppercase font-black tracking-widest mb-1">Accuracy</p>
                                    <p className="text-4xl font-black">{accuracy}%</p>
                                </div>
                                <div className="bg-white/10 backdrop-blur-md px-8 py-4 rounded-2xl border border-white/10">
                                    <p className="text-sm opacity-60 uppercase font-black tracking-widest mb-1">Time</p>
                                    <p className="text-4xl font-black">{formatTime(elapsedTime)}</p>
                                </div>
                            </div>
                        </div>
                        <div className="p-8">
                            <div className="grid grid-cols-3 gap-4 mb-8">
                                <div className="bg-green-50 p-6 rounded-2xl text-center border border-green-100"><p className="text-xs text-green-600 font-black uppercase mb-1">Correct</p><p className="text-3xl font-black text-green-700">{stats.correct}</p></div>
                                <div className="bg-red-50 p-6 rounded-2xl text-center border border-red-100"><p className="text-xs text-red-600 font-black uppercase mb-1">Wrong</p><p className="text-3xl font-black text-red-700">{stats.wrong}</p></div>
                                <div className="bg-blue-50 p-6 rounded-2xl text-center border border-blue-100"><p className="text-xs text-blue-600 font-black uppercase mb-1">Total</p><p className="text-3xl font-black text-blue-700">{stats.total}</p></div>
                            </div>
                            <div className="flex justify-center gap-4">
                                <button onClick={() => navigate(grade ? `/middle/grade/${grade}` : '/math')} className="px-10 py-4 bg-[#31326F] text-white rounded-2xl font-black text-lg hover:bg-[#25265E] transition-all shadow-lg">Back to Topics</button>
                                <button onClick={() => window.location.reload()} className="px-10 py-4 border-2 border-[#31326F] text-[#31326F] rounded-2xl font-black text-lg hover:bg-gray-50 transition-all">Try Again</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    const currentQ = questions[currentIndex];
    const userAnswer = userAnswers[currentQ?.id];
    const isAnswerCorrect = userAnswer && String(userAnswer).trim().toLowerCase() === String(currentQ?.correctAnswer).trim().toLowerCase();

    return (
        <div className="h-[100dvh] w-full bg-gradient-to-br from-[#E0FBEF] to-[#E6FFFA] flex flex-col overflow-hidden font-sans text-[#31326F]">

            <AnimatePresence>
                {suggestionModal.isOpen && (
                    <motion.div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        <motion.div className="bg-white rounded-3xl shadow-2xl p-8 max-w-sm w-full text-center relative overflow-hidden border-4 border-white" initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}>
                            <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-br from-[#E0FBEF] to-[#E6FFFA] -z-10 rounded-t-2xl" />
                            <img src={mascotImg} alt="Mascot" className="w-24 h-24 mx-auto -mt-4 mb-4 object-contain drop-shadow-md hover:scale-110 transition-transform" />
                            <h3 className="text-2xl font-black text-[#31326F] mb-2">
                                {suggestionModal.type === 'next' && "Awesome Job! 🌟"}
                                {suggestionModal.type === 'prev' && "Tricky stuff? 🤔"}
                                {suggestionModal.type === 'mentor' && "Need a hint? 💡"}
                            </h3>
                            <p className="text-gray-600 mb-6 font-medium leading-relaxed">
                                {suggestionModal.type === 'next' && `You're crushing it! Want to try "${suggestionModal.skill?.skill_name || suggestionModal.skill?.name}" next?`}
                                {suggestionModal.type === 'prev' && `This seems tough. How about we practice "${suggestionModal.skill?.skill_name || suggestionModal.skill?.name}" first?`}
                                {suggestionModal.type === 'mentor' && "It looks like you might need some help. Ask a grown-up or mentor to explain this topic!"}
                            </p>
                            <div className="flex flex-col gap-3">
                                <button onClick={async () => {
                                    if (suggestionModal.type === 'mentor') {
                                        setSuggestionModal({ isOpen: false, type: null, skill: null });
                                        setWrongStreak(0);
                                        await fetchQuestions(currentDifficulty, false);
                                        setCurrentIndex(prev => prev + 1);
                                    } else {
                                        const newSkill = suggestionModal.skill;
                                        const newIndex = skillsList.findIndex(s => s.skill_id === newSkill.skill_id);
                                        setSuggestionModal({ isOpen: false, type: null, skill: null });
                                        navigate(`/middle/grade/${grade}/practice/${newSkill.skill_id}`, { state: { skills: skillsList, currentIndex: newIndex, grade } });
                                    }
                                }} className="w-full py-3 bg-[#31326F] text-white rounded-xl font-bold text-lg shadow-lg hover:bg-[#25265E] transition-all">
                                    {suggestionModal.type === 'next' ? "Yes, Let's Go! 🚀" : suggestionModal.type === 'prev' ? "Try Previous Skill 🔙" : "Okay, Got it! 👍"}
                                </button>
                                <button onClick={async () => {
                                    setSuggestionModal({ isOpen: false, type: null, skill: null });
                                    if (suggestionModal.type === 'next') setCorrectStreak(0);
                                    if (suggestionModal.type === 'prev') setWrongStreak(0);
                                    await fetchQuestions(currentDifficulty, false);
                                    setCurrentIndex(prev => prev + 1);
                                }} className="w-full py-3 bg-white text-gray-500 rounded-xl font-bold text-lg hover:bg-gray-50 transition-colors">
                                    {suggestionModal.type === 'next' ? "Stay Here" : "Keep Trying"}
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <header className="relative flex items-center justify-between px-4 lg:px-8 py-2 lg:py-4 shrink-0 z-20 h-24 lg:h-32 landscape:h-16 landscape:lg:h-32">
                <div className="flex items-center">
                    <SunTimer timeLeft={elapsedTime} />
                </div>
                {encouragement && (
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-none">
                        <div className="px-6 py-2 lg:px-8 lg:py-3 bg-gradient-to-r from-green-400 to-emerald-500 text-white rounded-full font-black text-lg lg:text-xl shadow-lg border-2 border-white/50 animate-in zoom-in fade-in slide-in-from-bottom-2 duration-300 whitespace-nowrap">
                            {encouragement}
                        </div>
                    </div>
                )}
                <div className="flex items-center">
                    <img src={mascotImg} alt="Mascot" className="w-16 h-16 lg:w-24 lg:h-24 object-contain drop-shadow-lg" />
                </div>
            </header>

            <div className="flex-1 flex flex-col lg:flex-row gap-4 lg:gap-6 px-4 lg:px-6 pb-4 lg:pb-6 overflow-hidden max-w-[1400px] mx-auto w-full">
                <main className="flex-[3] relative h-full min-h-0 flex flex-col">
                    <AnimatePresence mode="wait">
                        <motion.div key={currentQ?.id} initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.98 }} transition={{ duration: 0.2 }} className="h-full">
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
                                        setUserAnswers(prev => { const next = { ...prev }; delete next[currentQ.id]; return next; });
                                        const historyEntry = history.find(h => h.question.id === currentQ.id);
                                        if (historyEntry) {
                                            setHistory(prev => prev.filter(h => h.question.id !== currentQ.id));
                                            setStats(prev => ({ ...prev, total: Math.max(0, prev.total - 1), correct: historyEntry.status === 'correct' ? Math.max(0, prev.correct - 1) : prev.correct, wrong: historyEntry.status === 'wrong' ? Math.max(0, prev.wrong - 1) : prev.wrong, streak: historyEntry.status === 'correct' ? Math.max(0, prev.streak - 1) : prev.streak }));
                                        }
                                        setShowExplanation(false);
                                    }}
                                />
                            )}
                        </motion.div>
                    </AnimatePresence>
                </main>
                <aside className="hidden lg:block flex-[2] h-full min-h-0">
                    <InlineScratchpad />
                </aside>
            </div>

            <div className="shrink-0 hidden lg:block px-4 lg:px-6 pb-4 lg:pb-6 max-w-[1400px] mx-auto w-full">
                <BottomBar
                    mode="junior"
                    onClear={() => {
                        const currentQ = questions[currentIndex];
                        const wasAnswered = userAnswers[currentQ.id];
                        if (!wasAnswered) return;
                        setUserAnswers(prev => { const next = { ...prev }; delete next[currentQ.id]; return next; });
                        const historyEntry = history.find(h => h.question.id === currentQ.id);
                        if (historyEntry) {
                            setHistory(prev => prev.filter(h => h.question.id !== currentQ.id));
                            setStats(prev => ({ ...prev, total: Math.max(0, prev.total - 1), correct: historyEntry.status === 'correct' ? Math.max(0, prev.correct - 1) : prev.correct, wrong: historyEntry.status === 'wrong' ? Math.max(0, prev.wrong - 1) : prev.wrong, streak: historyEntry.status === 'correct' ? Math.max(0, prev.streak - 1) : prev.streak }));
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

            <AnimatePresence>
                {showScratchpad && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] lg:hidden">
                        <FullScreenScratchpad onClose={() => setShowScratchpad(false)} />
                    </motion.div>
                )}
            </AnimatePresence>
            <AnimatePresence>
                {showExplanation && (
                    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
                        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="bg-white dark:bg-slate-900 rounded-[32px] lg:rounded-[40px] max-w-4xl w-full shadow-2xl overflow-hidden flex flex-col lg:flex-row min-h-[500px] max-h-[90vh] lg:max-h-none overflow-y-auto lg:overflow-visible border-4 border-white dark:border-slate-800">
                            <div className="flex-[4] bg-[#E0FBEF] flex flex-col items-center justify-center p-6 lg:p-8 relative min-h-[200px] lg:min-h-0 shrink-0">
                                <img src={mascotImg} alt="Mascot" className="w-32 h-32 lg:w-64 lg:h-64 object-contain drop-shadow-xl" />
                                <div className="mt-4 lg:mt-8 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm px-6 py-2 rounded-full border border-[#4FB7B3]/30">
                                    <span className="text-[#31326F] dark:text-[#A8FBD3] font-bold">Keep going!</span>
                                </div>
                            </div>
                            <div className="flex-[6] p-6 lg:p-12 flex flex-col">
                                <div className="flex items-center gap-3 mb-8">
                                    {!isAnswerCorrect ? (
                                        <><div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center"><X className="w-6 h-6 text-red-500" /></div><h3 className="text-3xl font-black text-[#31326F] dark:text-white">Not quite right</h3></>
                                    ) : (
                                        <><div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center"><CheckCircle2 className="w-6 h-6 text-green-500" /></div><h3 className="text-3xl font-black text-[#31326F] dark:text-white">Excellent!</h3></>
                                    )}
                                </div>
                                <div className="mb-8">
                                    <p className="text-[#4FB7B3] text-sm font-black uppercase tracking-widest mb-3">Correct Answer</p>
                                    <div className="bg-[#E0FBEF]/50 p-4 rounded-2xl flex items-center gap-3 border border-[#4FB7B3]/20">
                                        <div className="w-6 h-6 rounded-full border-2 border-[#4FB7B3] flex items-center justify-center shadow-sm"><div className="w-3 h-3 bg-[#4FB7B3] rounded-full" /></div>
                                        <span className="text-xl font-bold text-[#31326F] dark:text-white"><LatexText text={currentQ.correctAnswer} /></span>
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <p className="text-blue-400 text-sm font-black uppercase tracking-widest mb-3">Why is this correct?</p>
                                    <div className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed max-h-48 overflow-y-auto pr-4 scrollbar-thin"><LatexText text={currentQ.explanation} /></div>
                                </div>
                                <div className="mt-8 flex justify-end">
                                    <button onClick={() => setShowExplanation(false)} className="flex items-center gap-2 px-10 py-4 bg-[#31326F] text-white rounded-2xl font-black text-lg shadow-lg hover:shadow-xl hover:bg-[#25265E] transition-all">Got it<CheckCircle2 size={24} /></button>
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

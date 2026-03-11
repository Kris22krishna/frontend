import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { RefreshCw, Check, Eye, ChevronRight, ChevronLeft, X, Star, Scale, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../../../../../services/api';
import LatexContent from '../../../../LatexContent';
import ExplanationModal from '../../../../ExplanationModal';
import '../../../../../pages/juniors/JuniorPracticeSession.css';

const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const CORRECT_MESSAGES = [
    "✨ Amazing! You found the heavy side! ✨",
    "🌟 Brilliant balance! 🌟",
    "🎉 Correct! You know your weights! 🎉",
    "✨ Fantastic work! ✨",
    "🚀 Super! Scale master! 🚀"
];

const CompareWeightsAndCapacities = () => {
    const { grade } = useParams();
    const navigate = useNavigate();
    const [qIndex, setQIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const [showExplanationModal, setShowExplanationModal] = useState(false);
    const [timeElapsed, setTimeElapsed] = useState(0);
    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [shuffledOptions, setShuffledOptions] = useState([]);
    const [feedbackMessage, setFeedbackMessage] = useState("");
    const [showResults, setShowResults] = useState(false);
    const [balanceTilt, setBalanceTilt] = useState('level'); // 'level', 'left', 'right'

    // Logging states
    const [sessionId, setSessionId] = useState(null);
    const questionStartTime = useRef(Date.now());
    const accumulatedTime = useRef(0);
    const isTabActive = useRef(true);
    const SKILL_ID = 1140;
    const SKILL_NAME = "Weigh It, Pour It - Compare Weights and Capacities";

    const TOTAL_QUESTIONS = 10;
    const [sessionQuestions, setSessionQuestions] = useState([]);
    const [answers, setAnswers] = useState({});

    useEffect(() => {
        const userId = sessionStorage.getItem('userId') || localStorage.getItem('userId');
        if (userId && !sessionId) {
            api.createPracticeSession(userId, SKILL_ID).then(sess => {
                if (sess && sess.session_id) setSessionId(sess.session_id);
            }).catch(err => console.error("Failed to start session", err));
        }

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

        const generateQuestion = () => {
            const isWeight = Math.random() > 0.5;
            const unitSmall = isWeight ? 'g' : 'mL';
            const unitBig = isWeight ? 'kg' : 'L';

            // Generate comparable values
            // 75% chance of inequality
            const equal = Math.random() > 0.75;

            let val1, unit1, val2, unit2, val1Small, val2Small;

            // Base in small units (e.g. 500g to 5000g)
            const base1 = randomInt(5, 50) * 100;
            let base2 = base1;

            if (!equal) {
                // Determine difference
                do {
                    base2 = randomInt(5, 50) * 100;
                } while (base2 === base1);
            }

            // Assign formatting
            // Helper to format as big unit if possible
            const formatValue = (baseVal) => {
                if (baseVal >= 1000 && baseVal % 1000 === 0 && Math.random() > 0.3) {
                    return { val: baseVal / 1000, unit: unitBig };
                } else if (baseVal >= 1000 && Math.random() > 0.6) {
                    // e.g. 1.5 kg
                    return { val: baseVal / 1000, unit: unitBig };
                }
                return { val: baseVal, unit: unitSmall };
            };

            const fmt1 = formatValue(base1);
            val1 = fmt1.val; unit1 = fmt1.unit;
            val1Small = base1;

            const fmt2 = formatValue(base2);
            val2 = fmt2.val; unit2 = fmt2.unit;
            val2Small = base2;

            let correctOption;
            let explanation;

            if (val1Small > val2Small) {
                correctOption = "Left Side";
                explanation = `The left side has ${val1Small}${unitSmall}, and the right side has ${val2Small}${unitSmall}.<br/>${val1Small} > ${val2Small}, so the <strong>Left Side</strong> goes down to show it's heavier.`;
            } else if (val2Small > val1Small) {
                correctOption = "Right Side";
                explanation = `The left side has ${val1Small}${unitSmall}, and the right side has ${val2Small}${unitSmall}.<br/>${val2Small} > ${val1Small}, so the <strong>Right Side</strong> goes down to show it's heavier.`;
            } else {
                correctOption = "Balanced";
                explanation = `Both sides have ${val1Small}${unitSmall}.<br/>Since they are equal, the scale remains <strong>Balanced</strong>.`;
            }

            const scaleTiltTarget = val1Small > val2Small ? 'left' : (val2Small > val1Small ? 'right' : 'level');

            return {
                val1, unit1, val2, unit2,
                val1Small, val2Small,
                text: `<div class='question-container' style='font-family: "Open Sans", sans-serif; font-size: 1.8rem; text-align: center;'>
                    Which side will go down?
                </div>`,
                correctAnswer: correctOption,
                solution: explanation,
                scaleTiltTarget: scaleTiltTarget,
                shuffledOptions: ["Left Side", "Balanced", "Right Side"]
            };
        };

        const questions = [];
        for (let i = 0; i < TOTAL_QUESTIONS; i++) {
            questions.push(generateQuestion());
        }
        setSessionQuestions(questions);

        return () => {
            document.removeEventListener("visibilitychange", handleVisibilityChange);
        };
    }, []);

    useEffect(() => {
        if (showResults) return;
        const timer = setInterval(() => {
            setTimeElapsed(prev => prev + 1);
        }, 1000);
        return () => clearInterval(timer);
    }, [showResults]);

    useEffect(() => {
        if (sessionQuestions.length > 0) {
            const qData = sessionQuestions[qIndex];
            setCurrentQuestion(qData);
            setShuffledOptions(["Left Side", "Balanced", "Right Side"]);
            const previousAnswer = answers[qIndex];
            if (previousAnswer) {
                setSelectedOption(previousAnswer.selected);
                setIsSubmitted(true);
                setIsCorrect(previousAnswer.isCorrect);
                // Set tilt immediately for reviewed questions
                setBalanceTilt(qData.scaleTiltTarget);
            } else {
                setSelectedOption(null);
                setIsSubmitted(false);
                setIsCorrect(false);
                setBalanceTilt('level');
            }
        }
    }, [qIndex, sessionQuestions]);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const recordQuestionAttempt = async (question, selected, isCorrect) => {
        const userId = sessionStorage.getItem('userId') || localStorage.getItem('userId');
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
                skill_id: SKILL_ID,
                template_id: null,
                difficulty_level: 'medium',
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

    const handleCheck = () => {
        if (!selectedOption || !currentQuestion) return;
        const isRight = selectedOption === currentQuestion.correctAnswer;
        setIsCorrect(isRight);
        setIsSubmitted(true);
        setAnswers(prev => ({ ...prev, [qIndex]: { isCorrect: isRight, selected: selectedOption } }));

        // Animate scale
        setBalanceTilt(currentQuestion.scaleTiltTarget);

        if (isRight) {
            setFeedbackMessage(CORRECT_MESSAGES[Math.floor(Math.random() * CORRECT_MESSAGES.length)]);
        } else {
            setShowExplanationModal(true);
        }

        recordQuestionAttempt(currentQuestion, selectedOption, isRight);
    };

    const handleNext = async () => {
        if (qIndex < TOTAL_QUESTIONS - 1) {
            setQIndex(prev => prev + 1);
            setShowExplanationModal(false);
            setSelectedOption(null);
            setIsSubmitted(false);
            setIsCorrect(false);
            accumulatedTime.current = 0;
            questionStartTime.current = Date.now();
            setBalanceTilt('level');
        } else {
            const userId = sessionStorage.getItem('userId') || localStorage.getItem('userId');
            if (userId && sessionId) {
                const totalCorrect = Object.values(answers).filter(val => val.isCorrect === true).length;
                try {
                    await api.createReport({
                        title: SKILL_NAME,
                        type: 'practice',
                        score: (totalCorrect / TOTAL_QUESTIONS) * 100,
                        parameters: {
                            skill_id: SKILL_ID,
                            skill_name: SKILL_NAME,
                            total_questions: TOTAL_QUESTIONS,
                            correct_answers: totalCorrect,
                            timestamp: new Date().toISOString(),
                            time_taken_seconds: timeElapsed
                        },
                        user_id: parseInt(userId, 10)
                    });
                    await api.finishSession(sessionId);
                } catch (err) {
                    console.error("Failed to create report", err);
                }
            }
            setShowResults(true);
        }
    };

    const handleOptionSelect = (option) => {
        if (isSubmitted) return;
        setSelectedOption(option);
    };

    const handlePrevious = () => {
        if (qIndex > 0) {
            setQIndex(prev => prev - 1);
            setShowExplanationModal(false);
        }
    };

    const BalanceScale = ({ tilt, leftContent, rightContent }) => {
        const rotation = tilt === 'level' ? 0 : (tilt === 'left' ? -15 : 15);

        return (
            <div className="relative w-full max-w-2xl h-44 md:h-56 mx-auto mt-4 md:mt-8 mb-6 md:mb-10 flex flex-col items-center justify-end">
                {/* Central Pillar */}
                <div className="relative z-0 flex flex-col items-center w-full h-full justify-end">
                    <div className="w-4 md:w-6 h-28 md:h-36 bg-[#31326F] rounded-t-full shadow-inner relative z-10">
                        {/* Decorative lines on pillar */}
                        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-8 md:w-10 h-1 md:h-2 bg-[#E0FBEF] rounded-full opacity-50"></div>
                        <div className="absolute top-8 left-1/2 -translate-x-1/2 w-8 md:w-10 h-1 md:h-2 bg-[#E0FBEF] rounded-full opacity-50"></div>
                        <div className="absolute top-12 left-1/2 -translate-x-1/2 w-8 md:w-10 h-1 md:h-2 bg-[#E0FBEF] rounded-full opacity-50"></div>
                    </div>
                    {/* Elaborate Base */}
                    <div className="relative flex flex-col items-center z-0 -mt-2">
                        <div className="w-16 md:w-24 h-6 md:h-8 bg-[#4FB7B3] rounded-t-2xl shadow-md border-b-4 border-[#31326F]/20 relative z-10"></div>
                        <div className="w-24 md:w-36 h-4 md:h-6 bg-[#31326F] rounded-t-xl rounded-b-md shadow-xl -mt-1 relative z-0"></div>
                    </div>
                </div>

                {/* Rotating Beam Container */}
                <motion.div
                    className="absolute top-2 md:top-4 left-1/2 w-4/5 md:w-3/4 h-32 md:h-40 origin-top z-20"
                    style={{ marginLeft: '-40%', '@media (minWidth: 768px)': { marginLeft: '-37.5%' } }}
                    animate={{ rotate: rotation }}
                    transition={{ type: "spring", stiffness: 30, damping: 15, mass: 1 }}
                >
                    {/* The Main Horizontal Beam */}
                    <div className="w-full h-3 md:h-4 bg-[#4FB7B3] border-[3px] border-[#31326F] rounded-full relative shadow-sm">

                        {/* Center Pivot Point (Fixed to beam) */}
                        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-6 md:w-8 h-6 md:h-8 bg-white border-4 border-[#31326F] rounded-full z-30 shadow-sm flex items-center justify-center">
                            <div className="w-2 md:w-3 h-2 md:h-3 bg-[#4FB7B3] rounded-full"></div>
                        </div>

                        {/* Left Pan Assembly */}
                        <motion.div
                            className="absolute left-2 md:left-4 top-2 flex flex-col items-center origin-top z-10"
                            style={{ x: "-50%" }}
                            animate={{ rotate: -rotation }}
                            transition={{ type: "spring", stiffness: 30, damping: 15, mass: 1 }}
                        >
                            {/* Connector ring */}
                            <div className="w-3 md:w-4 h-3 md:h-4 rounded-full border-[3px] border-[#31326F] bg-white -mt-2 shadow-sm z-20"></div>

                            {/* Chains (represented by thick lines) */}
                            <div className="relative w-16 md:w-20 h-20 md:h-28 -mt-1 z-10">
                                <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute top-0 left-0">
                                    <line x1="50" y1="0" x2="10" y2="100" stroke="#9CA3AF" strokeWidth="3" strokeLinecap="round" />
                                    <line x1="50" y1="0" x2="90" y2="100" stroke="#9CA3AF" strokeWidth="3" strokeLinecap="round" />
                                </svg>
                            </div>

                            {/* Pan Base */}
                            <div className="w-20 md:w-28 h-6 md:h-8 bg-white border-4 border-[#31326F] border-t-0 rounded-b-[2rem] shadow-xl relative flex items-end justify-center pb-2 z-20">
                                {/* Inner bowl detail */}
                                <div className="absolute inset-0 bg-blue-50/50 rounded-b-[1.75rem] m-0.5"></div>
                                <div className="absolute bottom-[100%] mb-1 w-max text-center z-30">
                                    {leftContent}
                                </div>
                            </div>
                        </motion.div>

                        {/* Right Pan Assembly */}
                        <motion.div
                            className="absolute right-2 md:right-4 top-2 flex flex-col items-center origin-top z-10"
                            style={{ x: "50%" }}
                            animate={{ rotate: -rotation }}
                            transition={{ type: "spring", stiffness: 30, damping: 15, mass: 1 }}
                        >
                            {/* Connector ring */}
                            <div className="w-3 md:w-4 h-3 md:h-4 rounded-full border-[3px] border-[#31326F] bg-white -mt-2 shadow-sm z-20"></div>

                            {/* Chains */}
                            <div className="relative w-16 md:w-20 h-20 md:h-28 -mt-1 z-10">
                                <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute top-0 left-0">
                                    <line x1="50" y1="0" x2="10" y2="100" stroke="#9CA3AF" strokeWidth="3" strokeLinecap="round" />
                                    <line x1="50" y1="0" x2="90" y2="100" stroke="#9CA3AF" strokeWidth="3" strokeLinecap="round" />
                                </svg>
                            </div>

                            {/* Pan Base */}
                            <div className="w-20 md:w-28 h-6 md:h-8 bg-white border-4 border-[#31326F] border-t-0 rounded-b-[2rem] shadow-xl relative flex items-end justify-center pb-2 z-20">
                                {/* Inner bowl detail */}
                                <div className="absolute inset-0 bg-blue-50/50 rounded-b-[1.75rem] m-0.5"></div>
                                <div className="absolute bottom-[100%] mb-1 w-max text-center z-30">
                                    {rightContent}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        );
    };

    const stats = (() => {
        let correct = 0;
        const total = Object.keys(answers).length;
        Object.values(answers).forEach(ans => {
            if (ans.isCorrect) correct++;
        });
        return { correct, total: TOTAL_QUESTIONS };
    })();

    if (!currentQuestion && !showResults) return <div className="flex items-center justify-center min-h-screen"><div className="animate-pulse text-2xl font-bold text-[#31326F]">Loading Practice...</div></div>;

    if (showResults) {
        const score = stats.correct;
        const total = stats.total;
        const percentage = Math.round((score / total) * 100);

        return (
            <div className="junior-practice-page results-view overflow-y-auto" style={{ fontFamily: '"Open Sans", sans-serif' }}>
                <header className="junior-practice-header results-header relative">
                    <button
                        onClick={() => navigate(-1)}
                        className="back-topics-top absolute top-8 right-8 px-10 py-4 bg-white/20 hover:bg-white/30 text-white rounded-2xl font-black text-xl transition-all flex items-center gap-3 z-50 border-4 border-white/30 shadow-2xl backdrop-blur-sm"
                    >
                        Back to Topics
                    </button>
                    <div className="sun-timer-container">
                        <div className="sun-timer">
                            <div className="sun-rays"></div>
                            <span className="timer-text">Done!</span>
                        </div>
                    </div>
                    <div className="title-area">
                        <h1 className="results-title">Comparison Report</h1>
                    </div>
                </header>

                <main className="practice-content results-content max-w-5xl mx-auto w-full px-4">
                    <div className="results-hero-section flex flex-col items-center mb-8">
                        <h2 className="text-4xl font-black text-[#31326F] mb-2">Comparison King! 🎉</h2>

                        <div className="stars-container flex gap-4 my-6">
                            {[1, 2, 3].map(i => (
                                <motion.div
                                    key={i}
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: i * 0.2 }}
                                    className={`star-wrapper ${percentage >= (i * 33) ? 'active' : ''}`}
                                >
                                    <Star
                                        size={60}
                                        fill={percentage >= (i * 33) ? "#FFD700" : "#EDF2F7"}
                                        color={percentage >= (i * 33) ? "#F6AD55" : "#CBD5E0"}
                                    />
                                </motion.div>
                            ))}
                        </div>

                        <div className="results-stats-grid grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-3xl">
                            <div className="stat-card bg-white p-6 rounded-3xl shadow-sm border-2 border-[#E0FBEF] text-center">
                                <span className="block text-xs font-black uppercase tracking-widest text-[#4FB7B3] mb-1">Correct</span>
                                <span className="text-3xl font-black text-[#31326F]">{score}/{total}</span>
                            </div>
                            <div className="stat-card bg-white p-6 rounded-3xl shadow-sm border-2 border-[#E0FBEF] text-center">
                                <span className="block text-xs font-black uppercase tracking-widest text-[#4FB7B3] mb-1">Time</span>
                                <span className="text-3xl font-black text-[#31326F]">{formatTime(timeElapsed)}</span>
                            </div>
                            <div className="stat-card bg-white p-6 rounded-3xl shadow-sm border-2 border-[#E0FBEF] text-center">
                                <span className="block text-xs font-black uppercase tracking-widest text-[#4FB7B3] mb-1">Accuracy</span>
                                <span className="text-3xl font-black text-[#31326F]">{percentage}%</span>
                            </div>
                            <div className="stat-card bg-white p-6 rounded-3xl shadow-sm border-2 border-[#E0FBEF] text-center">
                                <span className="block text-xs font-black uppercase tracking-widest text-[#4FB7B3] mb-1">Correct Answers</span>
                                <span className="text-3xl font-black text-[#31326F]">{score}</span>
                            </div>
                        </div>
                    </div>

                    <div className="detailed-breakdown w-full mb-12">
                        <h3 className="text-2xl font-black text-[#31326F] mb-6 px-4">Comparison Log 📜</h3>
                        <div className="space-y-4">
                            {sessionQuestions.map((q, idx) => {
                                const ans = answers[idx];
                                if (!ans) return null;
                                return (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        className={`p-6 rounded-[2rem] border-4 ${ans.isCorrect ? 'border-[#E0FBEF] bg-white' : 'border-red-50 bg-white'} relative`}
                                    >
                                        <div className="flex items-start gap-4">
                                            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-black text-white shrink-0 ${ans.isCorrect ? 'bg-[#4FB7B3]' : 'bg-red-400'}`}>
                                                {idx + 1}
                                            </div>
                                            <div className="flex-1">
                                                <div className="text-lg font-bold text-[#31326F] mb-4 breakdown-question">
                                                    <LatexContent html={q.text} />
                                                </div>

                                                <div className="grid md:grid-cols-2 gap-4 mb-4">
                                                    <div className="answer-box p-4 rounded-2xl bg-gray-50 border-2 border-gray-100">
                                                        <span className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Your Answer</span>
                                                        <span className={`text-lg font-black ${ans.isCorrect ? 'text-[#4FB7B3]' : 'text-red-500'}`}>
                                                            {ans.selected}
                                                        </span>
                                                    </div>
                                                    {!ans.isCorrect && (
                                                        <div className="answer-box p-4 rounded-2xl bg-[#E0FBEF] border-2 border-[#4FB7B3]/20">
                                                            <span className="block text-[10px] font-black uppercase tracking-widest text-[#4FB7B3] mb-1">Correct Answer</span>
                                                            <span className="text-lg font-black text-[#31326F]">
                                                                {q.correctAnswer}
                                                            </span>
                                                        </div>
                                                    )}
                                                </div>

                                                <div className="explanation-box p-4 rounded-2xl bg-blue-50/50 border-2 border-blue-100">
                                                    <span className="block text-[10px] font-black uppercase tracking-widest text-blue-400 mb-1">Explain? 💡</span>
                                                    <div className="text-sm font-medium text-gray-600 leading-relaxed">
                                                        <LatexContent html={q.solution} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="shrink-0 pt-2 text-[#4FB7B3]">
                                                {ans.isCorrect ? <Check size={32} strokeWidth={3} /> : <X size={32} strokeWidth={3} className="text-red-400" />}
                                            </div>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>

                    <div className="results-actions flex flex-col md:flex-row justify-center gap-4 py-8 border-t-4 border-dashed border-gray-100">
                        <button className="magic-pad-btn play-again px-12 py-4 rounded-2xl bg-[#31326F] text-white font-black text-xl shadow-xl hover:-translate-y-1 transition-all" onClick={() => window.location.reload()}>
                            <RefreshCw size={24} /> Start New Quest
                        </button>
                        <button className="px-12 py-4 rounded-2xl border-4 border-[#31326F] text-[#31326F] font-black text-xl hover:bg-gray-50 transition-all flex items-center justify-center gap-3" onClick={() => navigate(grade ? `/junior/grade/${grade}` : '/math')}>
                            Back to Topics
                        </button>
                    </div>
                </main>
            </div>
        );
    }

    return (
        <div className="junior-practice-page village-theme" style={{ fontFamily: '"Open Sans", sans-serif' }}>
            <header className="junior-practice-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 2rem' }}>
                <div className="header-left"></div>

                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-max">
                    <div className="bg-white/90 backdrop-blur-md px-3 py-1.5 sm:px-6 sm:py-2 rounded-full border-2 border-[#4FB7B3]/30 text-[#31326F] font-black text-sm sm:text-xl shadow-lg whitespace-nowrap">
                        Question {qIndex + 1} / {TOTAL_QUESTIONS}
                    </div>
                </div>

                <div className="header-right">
                    <div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl border-2 border-[#4FB7B3]/30 text-[#31326F] font-bold text-lg shadow-md flex items-center gap-2">
                        {formatTime(timeElapsed)}
                    </div>
                </div>
            </header>

            <main className="flex-1 w-full max-w-5xl mx-auto px-4 pb-24 pt-4 relative z-10 flex flex-col justify-start min-h-0 min-h-[calc(100vh-140px)] -mt-12 sm:-mt-8">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={qIndex}
                        initial={{ x: 50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: -50, opacity: 0 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        className="my-auto bg-white/95 backdrop-blur-md rounded-[2rem] md:rounded-[3rem] shadow-2xl border-4 border-[#E0FBEF] p-4 sm:p-5 md:p-8 lg:p-10 flex flex-col items-center w-full grow-0 shrink-0 transform -translate-y-4 md:-translate-y-8"
                    >
                        <div className="text-center font-bold text-gray-500 uppercase tracking-widest text-sm mb-1 sm:mb-2">
                            Comparison Lab ⚖️
                        </div>

                        <div className="w-full flex-shrink-0">
                            <BalanceScale
                                tilt={balanceTilt}
                                leftContent={
                                    <div className="bg-white px-2 py-1 md:px-3 md:py-2 rounded-xl border-2 border-[#31326F] shadow-sm font-bold text-sm md:text-base text-[#31326F]">
                                        {currentQuestion.val1} {currentQuestion.unit1}
                                    </div>
                                }
                                rightContent={
                                    <div className="bg-white px-2 py-1 md:px-3 md:py-2 rounded-xl border-2 border-[#31326F] shadow-sm font-bold text-sm md:text-base text-[#31326F]">
                                        {currentQuestion.val2} {currentQuestion.unit2}
                                    </div>
                                }
                            />
                        </div>

                        <h2 className="text-lg sm:text-xl md:text-3xl font-medium text-[#31326F] text-center mt-0 md:mt-2 mb-3 md:mb-6">
                            Which side will go down?
                        </h2>

                        <div className="w-full max-w-4xl border-t-2 border-dashed border-gray-200 pt-3 md:pt-6 pb-1 md:pb-2">
                            <div className="grid grid-cols-3 gap-2 sm:gap-3 md:gap-5">
                                {shuffledOptions.map((option, idx) => (
                                    <button
                                        key={idx}
                                        className={`rounded-2xl md:rounded-3xl py-3 sm:py-4 md:py-5 flex items-center justify-center font-medium text-base sm:text-lg md:text-2xl transition-all border-4 relative overflow-hidden group w-full ${selectedOption === option
                                            ? 'bg-blue-50 border-[#4FB7B3] text-[#31326F] shadow-inner transform scale-[1.02]'
                                            : 'bg-white border-gray-200 text-gray-600 hover:border-blue-200 hover:bg-gray-50'
                                            } ${isSubmitted && option === currentQuestion.correctAnswer
                                                ? '!bg-green-100 !border-green-400 !text-green-800'
                                                : ''
                                            } ${isSubmitted && selectedOption === option && !isCorrect
                                                ? '!bg-red-50 !border-red-400 !text-red-700'
                                                : ''
                                            }`}
                                        onClick={() => handleOptionSelect(option)}
                                        disabled={isSubmitted}
                                    >
                                        <LatexContent html={option} />
                                    </button>
                                ))}
                            </div>
                            {isSubmitted && isCorrect && (
                                <motion.div
                                    initial={{ scale: 0.5, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    className="mt-3 sm:mt-4 md:mt-6 font-medium text-base sm:text-lg md:text-xl text-center px-4 md:px-6 py-2 md:py-3 rounded-2xl bg-green-100 text-green-700 mx-auto w-fit"
                                >
                                    {feedbackMessage}
                                </motion.div>
                            )}
                        </div>
                    </motion.div>
                </AnimatePresence>
            </main>

            <ExplanationModal
                isOpen={showExplanationModal}
                isCorrect={isCorrect}
                correctAnswer={currentQuestion.correctAnswer}
                explanation={currentQuestion.solution}
                onClose={() => setShowExplanationModal(false)}
                onNext={() => setShowExplanationModal(false)}
            />

            <footer className="junior-bottom-bar">
                <div className="desktop-footer-controls">
                    <div className="bottom-left">
                        <button
                            className="bg-red-50 text-red-500 px-6 py-2 rounded-xl border-2 border-red-100 font-bold hover:bg-red-100 transition-colors flex items-center gap-2"
                            onClick={async () => {
                                if (sessionId) await api.finishSession(sessionId).catch(console.error);
                                navigate(-1);
                            }}
                        >
                            Exit Practice
                        </button>
                    </div>
                    <div className="bottom-center">
                        {isSubmitted && (
                            <button className="view-explanation-btn" onClick={() => setShowExplanationModal(true)}>
                                <Eye size={20} /> View Explanation
                            </button>
                        )}
                    </div>
                    <div className="bottom-right">
                        <div className="nav-buttons-group">
                            {qIndex > 0 && (
                                <button className="nav-pill-next-btn" onClick={handlePrevious}>
                                    <ChevronLeft size={28} strokeWidth={3} /> Previous
                                </button>
                            )}
                            {isSubmitted ? (
                                <button className="nav-pill-next-btn" onClick={handleNext}>
                                    {qIndex < TOTAL_QUESTIONS - 1 ? (
                                        <>Next <ChevronRight size={28} strokeWidth={3} /></>
                                    ) : (
                                        <>Done <Check size={28} strokeWidth={3} /></>
                                    )}
                                </button>
                            ) : (
                                <button className="nav-pill-submit-btn" onClick={handleCheck} disabled={!selectedOption}>
                                    Submit <Check size={28} strokeWidth={3} />
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                <div className="mobile-footer-controls">
                    <div className="flex items-center gap-2">
                        <button
                            className="bg-red-50 text-red-500 p-2 rounded-lg border border-red-100"
                            onClick={async () => {
                                if (sessionId) await api.finishSession(sessionId).catch(console.error);
                                navigate(-1);
                            }}
                        >
                            <X size={20} />
                        </button>

                        {isSubmitted && (
                            <button className="view-explanation-btn" onClick={() => setShowExplanationModal(true)}>
                                <Eye size={18} /> Explain
                            </button>
                        )}
                    </div>

                    <div className="mobile-footer-right" style={{ flex: 1, maxWidth: '50%', display: 'flex', justifyContent: 'flex-end' }}>
                        <div className="nav-buttons-group" style={{ gap: '6px' }}>
                            {qIndex > 0 && (
                                <button className="nav-pill-next-btn" onClick={handlePrevious} style={{ padding: '6px 10px', fontSize: '0.85rem' }}>
                                    Previous
                                </button>
                            )}
                            {isSubmitted ? (
                                <button className="nav-pill-next-btn" onClick={handleNext} style={{ padding: '6px 10px', fontSize: '0.85rem' }}>
                                    {qIndex < TOTAL_QUESTIONS - 1 ? "Next" : "Done"}
                                </button>
                            ) : (
                                <button className="nav-pill-submit-btn" onClick={handleCheck} disabled={!selectedOption} style={{ padding: '6px 10px', fontSize: '0.85rem' }}>
                                    Submit
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default CompareWeightsAndCapacities;

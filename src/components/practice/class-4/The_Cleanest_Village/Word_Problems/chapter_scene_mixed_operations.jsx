import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { RefreshCw, Check, Eye, ChevronRight, ChevronLeft, X, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../../../../../services/api';
import LatexContent from '../../../../LatexContent';
import ExplanationModal from '../../../../ExplanationModal';
import '../../../../../pages/juniors/JuniorPracticeSession.css';

const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const CORRECT_MESSAGES = [
    "✨ Outstanding! You solved the problem! ✨",
    "🌟 A true village hero! 🌟",
    "🎉 Correct! Your math is making a difference! 🎉",
    "✨ Fantastic! Keep up the good work! ✨",
    "🚀 Super! You're cleaning up nicely! 🚀",
    "🌿 Perfect! The environment is happier! 🌿",
    "🎊 Great job! Moving on... 🎊",
    "💎 Spot on! Exact answer! 💎"
];

const ChapterSceneMixedOperations = () => {
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

    // Logging states
    const [sessionId, setSessionId] = useState(null);
    const questionStartTime = useRef(Date.now());
    const accumulatedTime = useRef(0);
    const isTabActive = useRef(true);
    const SKILL_ID = 4010;
    const SKILL_NAME = "The Cleanest Village - Word Problems (Mixed)";

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

        const questions = [];

        // 10 unique scenario generators — each used only once per session
        // Each returns { text, ans, sol } given difficulty-appropriate numbers
        const scenarioGenerators = [
            // Addition scenarios
            (index) => {
                let n1, n2;
                if (index < 3) { n1 = randomInt(10, 50); n2 = randomInt(10, 50); }
                else if (index < 6) { n1 = randomInt(50, 200); n2 = randomInt(50, 200); }
                else { n1 = randomInt(200, 400); n2 = randomInt(200, 400); }
                return {
                    text: `<div class='question-container'>
                        <p>To clean the park, ${n1} people volunteered on Saturday and ${n2} people on Sunday.</p>
                        <p>How many volunteers helped in total?</p>
                    </div>`,
                    ans: n1 + n2,
                    sol: `${n1} + ${n2} = ${n1 + n2}`
                };
            },
            (index) => {
                let n1, n2;
                if (index < 3) { n1 = randomInt(15, 50); n2 = randomInt(10, 40); }
                else if (index < 6) { n1 = randomInt(80, 200); n2 = randomInt(50, 150); }
                else { n1 = randomInt(200, 400); n2 = randomInt(100, 300); }
                return {
                    text: `<div class='question-container'>
                        <p>The village painted ${n1} metres of fencing in the morning and ${n2} metres in the afternoon.</p>
                        <p>How many metres of fencing were painted in total?</p>
                    </div>`,
                    ans: n1 + n2,
                    sol: `${n1} + ${n2} = ${n1 + n2}`
                };
            },
            (index) => {
                let n1, n2;
                if (index < 3) { n1 = randomInt(10, 40); n2 = randomInt(10, 30); }
                else if (index < 6) { n1 = randomInt(60, 150); n2 = randomInt(40, 120); }
                else { n1 = randomInt(150, 350); n2 = randomInt(100, 250); }
                return {
                    text: `<div class='question-container'>
                        <p>Class 4A donated ${n1} books and Class 4B donated ${n2} books to the village library.</p>
                        <p>How many books were donated altogether?</p>
                    </div>`,
                    ans: n1 + n2,
                    sol: `${n1} + ${n2} = ${n1 + n2}`
                };
            },
            // Subtraction scenarios
            (index) => {
                let n1, n2;
                if (index < 3) { n1 = randomInt(30, 100); n2 = randomInt(10, n1 - 10); }
                else if (index < 6) { n1 = randomInt(100, 300); n2 = randomInt(20, n1 - 20); }
                else { n1 = randomInt(300, 500); n2 = randomInt(50, n1 - 50); }
                return {
                    text: `<div class='question-container'>
                        <p>We collected ${n1} plastic bottles. We sent ${n2} of them for recycling.</p>
                        <p>How many bottles are still waiting to be sent?</p>
                    </div>`,
                    ans: n1 - n2,
                    sol: `${n1} - ${n2} = ${n1 - n2}`
                };
            },
            (index) => {
                let n1, n2;
                if (index < 3) { n1 = randomInt(40, 90); n2 = randomInt(10, n1 - 10); }
                else if (index < 6) { n1 = randomInt(100, 250); n2 = randomInt(30, n1 - 20); }
                else { n1 = randomInt(300, 500); n2 = randomInt(80, n1 - 40); }
                return {
                    text: `<div class='question-container'>
                        <p>A village pond had ${n1} litres of water. ${n2} litres were used for cleaning the streets.</p>
                        <p>How many litres of water are left in the pond?</p>
                    </div>`,
                    ans: n1 - n2,
                    sol: `${n1} - ${n2} = ${n1 - n2}`
                };
            },
            (index) => {
                let n1, n2;
                if (index < 3) { n1 = randomInt(30, 80); n2 = randomInt(5, n1 - 10); }
                else if (index < 6) { n1 = randomInt(100, 250); n2 = randomInt(20, n1 - 20); }
                else { n1 = randomInt(250, 450); n2 = randomInt(50, n1 - 50); }
                return {
                    text: `<div class='question-container'>
                        <p>The school had ${n1} old newspapers. Students sold ${n2} of them to a recycler.</p>
                        <p>How many newspapers are still left?</p>
                    </div>`,
                    ans: n1 - n2,
                    sol: `${n1} - ${n2} = ${n1 - n2}`
                };
            },
            (index) => {
                let n1, n2;
                if (index < 3) { n1 = randomInt(30, 80); n2 = randomInt(5, n1 - 5); }
                else if (index < 6) { n1 = randomInt(100, 300); n2 = randomInt(30, n1 - 20); }
                else { n1 = randomInt(300, 500); n2 = randomInt(60, n1 - 40); }
                return {
                    text: `<div class='question-container'>
                        <p>There were ${n1} kg of waste in the dump yard. The truck carried away ${n2} kg.</p>
                        <p>How much waste is still in the dump yard?</p>
                    </div>`,
                    ans: n1 - n2,
                    sol: `${n1} - ${n2} = ${n1 - n2}`
                };
            },
            // Multiplication scenarios
            (index) => {
                let n1, n2;
                if (index < 3) { n1 = randomInt(2, 5); n2 = randomInt(5, 15); }
                else if (index < 6) { n1 = randomInt(3, 7); n2 = randomInt(15, 30); }
                else { n1 = randomInt(5, 9); n2 = randomInt(30, 50); }
                return {
                    text: `<div class='question-container'>
                        <p>There are ${n1} teams. Each team planted ${n2} saplings.</p>
                        <p>How many saplings were planted in total?</p>
                    </div>`,
                    ans: n1 * n2,
                    sol: `${n1} \\times ${n2} = ${n1 * n2}`
                };
            },
            (index) => {
                let n1, n2;
                if (index < 3) { n1 = randomInt(2, 5); n2 = randomInt(3, 10); }
                else if (index < 6) { n1 = randomInt(4, 7); n2 = randomInt(10, 25); }
                else { n1 = randomInt(6, 9); n2 = randomInt(20, 40); }
                return {
                    text: `<div class='question-container'>
                        <p>Each volunteer cleaned ${n2} metres of road. There were ${n1} volunteers.</p>
                        <p>How many metres of road were cleaned altogether?</p>
                    </div>`,
                    ans: n1 * n2,
                    sol: `${n1} \\times ${n2} = ${n1 * n2}`
                };
            },
            (index) => {
                let n1, n2;
                if (index < 3) { n1 = randomInt(2, 4); n2 = randomInt(5, 12); }
                else if (index < 6) { n1 = randomInt(3, 6); n2 = randomInt(12, 25); }
                else { n1 = randomInt(5, 8); n2 = randomInt(25, 45); }
                return {
                    text: `<div class='question-container'>
                        <p>The village has ${n1} streets. Each street has ${n2} lamp posts.</p>
                        <p>How many lamp posts are there in the village?</p>
                    </div>`,
                    ans: n1 * n2,
                    sol: `${n1} \\times ${n2} = ${n1 * n2}`
                };
            }
        ];

        // Shuffle scenario order so each question gets a unique scenario
        const shuffledGenerators = [...scenarioGenerators].sort(() => Math.random() - 0.5);

        for (let index = 0; index < TOTAL_QUESTIONS; index++) {
            const questionData = shuffledGenerators[index](index);
            const ans = questionData.ans;

            const options = [
                ans.toString(),
                (ans + randomInt(1, 5)).toString(),
                (ans - randomInt(1, 5)).toString(),
                (ans + 10).toString()
            ];

            const uniqueOptions = [...new Set(options)];
            while (uniqueOptions.length < 4) {
                let rand = (ans + randomInt(-20, 20)).toString();
                if (rand !== ans.toString() && !uniqueOptions.includes(rand) && parseInt(rand) > 0) uniqueOptions.push(rand);
            }

            questions.push({
                text: questionData.text,
                correctAnswer: ans.toString(),
                solution: `Identify the operation and solve.<br/>
                           Calculation: ${questionData.sol}.<br/>
                           Answer: <strong>${ans}</strong>.`,
                shuffledOptions: [...uniqueOptions].sort(() => Math.random() - 0.5)
            });
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
            setShuffledOptions(qData.shuffledOptions);
            const previousAnswer = answers[qIndex];
            if (previousAnswer) {
                setSelectedOption(previousAnswer.selected);
                setIsSubmitted(true);
                setIsCorrect(previousAnswer.isCorrect);
            } else {
                setSelectedOption(null);
                setIsSubmitted(false);
                setIsCorrect(false);
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
                difficulty_level: 'Hard',
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
        } else {
            const userId = sessionStorage.getItem('userId') || localStorage.getItem('userId');
            if (userId) {
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
                } catch (err) {
                    console.error("Failed to create report", err);
                }
            }
            if (sessionId) await api.finishSession(sessionId).catch(console.error);
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

    const stats = (() => {
        let correct = 0;
        const total = Object.keys(answers).length;
        Object.values(answers).forEach(ans => {
            if (ans.isCorrect) correct++;
        });
        return { correct, total: TOTAL_QUESTIONS };
    })();

    if (!currentQuestion && !showResults) return <div>Loading...</div>;

    if (showResults) {
        const score = stats.correct;
        const total = stats.total;
        const percentage = Math.round((score / total) * 100);

        return (
            <div className="junior-practice-page results-view overflow-y-auto">
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
                        <h1 className="results-title">Village Report</h1>
                    </div>
                </header>

                <main className="practice-content results-content max-w-5xl mx-auto w-full px-4">
                    <div className="results-hero-section flex flex-col items-center mb-8">
                        <h2 className="text-4xl font-black text-[#31326F] mb-2">Adventure Complete! 🎉</h2>

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
                        <h3 className="text-2xl font-black text-[#31326F] mb-6 px-4">Problem Log 📜</h3>
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
                <div className="header-left">
                    {/* Placeholder */}
                </div>

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

            <main className="practice-content-wrapper">
                <div className="practice-board-container" style={{ gridTemplateColumns: '1fr', maxWidth: '800px', margin: '0 auto' }}>
                    <div className="practice-left-col" style={{ width: '100%' }}>
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={qIndex}
                                initial={{ x: 50, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                exit={{ x: -50, opacity: 0 }}
                                transition={{ duration: 0.4, ease: "easeOut" }}
                                style={{ height: '100%', width: '100%' }}
                            >
                                <div className="question-card-modern" style={{ paddingLeft: '2rem' }}>
                                    <div className="question-header-modern">
                                        <h2 className="question-text-modern" style={{ fontFamily: '"Open Sans", sans-serif', fontSize: 'clamp(1rem, 2vw, 1.6rem)', maxHeight: 'none', fontWeight: '500', textAlign: 'left', justifyContent: 'flex-start', overflow: 'visible' }}>
                                            <LatexContent html={currentQuestion.text} />
                                        </h2>
                                    </div>
                                    <div className="interaction-area-modern">
                                        <div className="options-grid-modern">
                                            {shuffledOptions.map((option, idx) => (
                                                <button
                                                    key={idx}
                                                    className={`option-btn-modern ${selectedOption === option ? 'selected' : ''} ${isSubmitted && option === currentQuestion.correctAnswer ? 'correct' : ''
                                                        } ${isSubmitted && selectedOption === option && !isCorrect ? 'wrong' : ''
                                                        }`}
                                                    style={{
                                                        fontFamily: '"Open Sans", sans-serif',
                                                        fontWeight: '400',
                                                        fontSize: '2.5rem',
                                                        backgroundColor: !isSubmitted ? (selectedOption === option ? '#e5e7eb' : '#f9fafb') : undefined,
                                                        color: !isSubmitted ? '#1f2937' : undefined,
                                                        borderColor: !isSubmitted ? (selectedOption === option ? '#9ca3af' : '#d1d5db') : undefined,
                                                        borderWidth: !isSubmitted ? '2px' : undefined,
                                                        borderStyle: !isSubmitted ? 'solid' : undefined
                                                    }}
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
                                                className="feedback-mini correct"
                                                style={{ marginTop: '20px' }}
                                            >
                                                {feedbackMessage}
                                            </motion.div>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
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

                    <div className="mobile-footer-right" style={{ width: 'auto' }}>
                        <div className="nav-buttons-group">
                            {qIndex > 0 && (
                                <button className="nav-pill-next-btn" onClick={handlePrevious}>
                                    Previous
                                </button>
                            )}
                            {isSubmitted ? (
                                <button className="nav-pill-next-btn" onClick={handleNext}>
                                    {qIndex < TOTAL_QUESTIONS - 1 ? "Next" : "Done"}
                                </button>
                            ) : (
                                <button className="nav-pill-submit-btn" onClick={handleCheck} disabled={!selectedOption}>
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

export default ChapterSceneMixedOperations;

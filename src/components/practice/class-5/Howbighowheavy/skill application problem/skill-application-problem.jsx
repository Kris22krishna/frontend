import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { RefreshCw, Check, Eye, ChevronRight, ChevronLeft, X, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../../../../../services/api';
import LatexContent from '../../../../LatexContent';
import ExplanationModal from '../../../../ExplanationModal';
import '../../../../../pages/juniors/JuniorPracticeSession.css';

const CORRECT_MESSAGES = [
    "✨ Measurement Master! ✨",
    "🌟 You've mastered the chapter! 🌟",
    "🎉 Correct! You're the Village's Lead Analyst! 🎉",
    "✨ Fantastic work! ✨",
    "🚀 Super! You're ready for any challenge! 🚀",
    "🌿 Perfect! Integrated knowledge in action! 🌿",
    "🎊 Great job! Moving on... 🎊",
    "💎 Precision application! 💎"
];

const SkillApplicationProblems = () => {
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

    const [sessionId, setSessionId] = useState(null);
    const questionStartTime = useRef(Date.now());
    const accumulatedTime = useRef(0);
    const isTabActive = useRef(true);
    const SKILL_ID = 1223;
    const SKILL_NAME = "Skill Application Problem";

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

        const qs = [
            {
                text: "A metal block is <strong>10 cm long, 5 cm wide, and 2 cm high</strong>. If 1 $cm^3$ of this metal weighs <strong>8 g</strong>, what is the total mass of the block?",
                correctAnswer: "800 g",
                options: ["100 g", "400 g", "800 g", "1.6 kg"],
                solution: "1. Find Volume: 10 × 5 × 2 = 100 $cm^3$.<br/>2. Find Mass: 100 × 8 g = <strong>800 g</strong>."
            },
            {
                text: "A large shipping container is <strong>4 m x 2 m x 2 m</strong>. How many <strong>1-metre unit cubes</strong> can fit inside it?",
                correctAnswer: "16 cubes",
                options: ["8 cubes", "16 cubes", "24 cubes", "32 cubes"],
                solution: "The capacity in unit cubes is simply the volume: 4 × 2 × 2 = <strong>16 cubes</strong>."
            },
            {
                text: "Which of these is <strong>most likely</strong> to have the same numerical value for its volume (in ml) and its mass (in grams)?",
                correctAnswer: "Water",
                options: ["Water", "Cooking Oil", "Honey", "Feathers"],
                solution: "For <strong>water</strong>, 1 ml has a mass of exactly 1 gram. This is a unique property used in many measurement systems."
            },
            {
                text: "A water tank is <strong>3/4 full</strong>. It currently contains <strong>1,500 L</strong> of water. What is the total capacity of the tank when full?",
                correctAnswer: "2,000 L",
                options: ["1,500 L", "2,000 L", "2,500 L", "3,000 L"],
                solution: "If 3/4 = 1,500, then 1/4 = 1,500 ÷ 3 = 500.<br/>Full capacity (4/4) = 500 × 4 = <strong>2,000 L</strong>."
            },
            {
                text: "A farmer has <strong>3 bags of rice</strong> weighing <strong>5 kg each</strong>. If he uses <strong>2.5 kg</strong> of rice, how many <strong>grams</strong> of rice are left?",
                correctAnswer: "12,500 g",
                options: ["12,500 g", "12.5 g", "2,500 g", "10,000 g"],
                solution: "1. Total = 3 × 5 kg = 15 kg.<br/>2. Left = 15 kg - 2.5 kg = 12.5 kg.<br/>3. Convert to g: 12.5 × 1,000 = <strong>12,500 g</strong>."
            },
            {
                text: "A box of chocolates has <strong>4 layers</strong>. Each layer has 20 chocolates, and each chocolate weighs <strong>10 g</strong>. What is the total mass of all chocolates in the box?",
                correctAnswer: "800 g",
                options: ["80 g", "200 g", "400 g", "800 g"],
                solution: "1. Total chocolates = 4 × 20 = 80.<br/>2. Total mass = 80 × 10 g = <strong>800 g</strong>."
            },
            {
                text: "A stone is dropped into a measuring cylinder with 500 ml of water. The level rises to <strong>650 ml</strong>. What is the total volume of <strong>5 such stones</strong>?",
                correctAnswer: "750 ml",
                options: ["150 ml", "650 ml", "750 ml", "1000 ml"],
                solution: "1. Volume of 1 stone = 650 - 500 = 150 ml.<br/>2. Volume of 5 stones = 150 × 5 = <strong>750 ml</strong>."
            },
            {
                text: "Is the volume of a <strong>3x3x3 cube</strong> greater than, less than, or equal to a <strong>2x4x3 cuboid</strong>?",
                correctAnswer: "Greater than",
                options: ["Greater than", "Less than", "Equal to", "Cannot be compared"],
                solution: "- Cube: 3 × 3 × 3 = 27 units.<br/>- Cuboid: 2 × 4 × 3 = 24 units.<br/>27 is <strong>greater</strong> than 24."
            },
            {
                text: "A box weighs <strong>1 kg</strong> when empty. It is filled with <strong>50 balls</strong>, each weighing <strong>10 g</strong>. What is the total mass of the box and balls in <strong>kilograms</strong>?",
                correctAnswer: "1.5 kg",
                options: ["1.5 kg", "1.05 kg", "1500 kg", "2 kg"],
                solution: "1. Mass of balls = 50 × 10 g = 500 g = 0.5 kg.<br/>2. Total = 1 kg + 0.5 kg = <strong>1.5 kg</strong>."
            },
            {
                text: "A 1-Litre bottle is <strong>half full</strong>. If you pour out <strong>200 ml</strong>, how much liquid is left in the bottle?",
                correctAnswer: "300 ml",
                options: ["300 ml", "500 ml", "800 ml", "200 ml"],
                solution: "1. Half of 1 L = 500 ml.<br/>2. Remaining = 500 ml - 200 ml = <strong>300 ml</strong>."
            }
        ];
        setSessionQuestions(qs.map(q => ({ ...q, shuffledOptions: [...q.options].sort(() => Math.random() - 0.5) })));
        return () => { document.removeEventListener("visibilitychange", handleVisibilityChange); };
    }, []);

    useEffect(() => {
        if (showResults) return;
        const timer = setInterval(() => { setTimeElapsed(prev => prev + 1); }, 1000);
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
        if (isTabActive.current) timeSpent += Date.now() - questionStartTime.current;
        const seconds = Math.round(timeSpent / 1000);
        try {
            await api.recordAttempt({
                user_id: parseInt(userId, 10),
                session_id: sessionId,
                skill_id: SKILL_ID,
                difficulty_level: qIndex < 3 ? 'Easy' : (qIndex < 6 ? 'Medium' : 'Hard'),
                question_text: String(question.text || ''),
                correct_answer: String(question.correctAnswer || ''),
                student_answer: String(selected || ''),
                is_correct: isCorrect,
                solution_text: String(question.solution || ''),
                time_spent_seconds: seconds >= 0 ? seconds : 0
            });
        } catch (e) { console.error("Failed to record attempt", e); }
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
                            time_taken_seconds: timeElapsed
                        },
                        user_id: parseInt(userId, 10)
                    });
                } catch (err) { console.error("Failed to create report", err); }
            }
            if (sessionId) await api.finishSession(sessionId).catch(console.error);
            setShowResults(true);
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

    const handleOptionSelect = (option) => { if (isSubmitted) return; setSelectedOption(option); };
    const handlePrevious = () => { if (qIndex > 0) { setQIndex(prev => prev - 1); setShowExplanationModal(false); } };

    if (!currentQuestion && !showResults) return <div className="flex justify-center items-center h-screen text-[#31326F] font-bold tracking-widest text-2xl uppercase italic animate-pulse">Mastering Skills...</div>;

    if (showResults) {
        const score = Object.values(answers).filter(val => val.isCorrect).length;
        const percentage = Math.round((score / TOTAL_QUESTIONS) * 100);
        return (
            <div className="junior-practice-page results-view overflow-y-auto" style={{ fontFamily: '"Open Sans", sans-serif' }}>
                <header className="junior-practice-header results-header relative">
                    <button onClick={() => navigate(-1)} className="back-topics-top absolute top-8 right-8 px-10 py-4 bg-white/20 hover:bg-white/30 text-white rounded-2xl font-black text-xl transition-all flex items-center gap-3 z-50 border-4 border-white/30 shadow-2xl backdrop-blur-sm">Back to Topics</button>
                    <div className="sun-timer-container"><div className="sun-timer"><div className="sun-rays"></div><span className="timer-text">Done!</span></div></div>
                    <div className="title-area"><h1 className="results-title">Chapter Mastery Report</h1></div>
                </header>
                <main className="practice-content results-content max-w-5xl mx-auto w-full px-4 text-center">
                    <h2 className="text-4xl font-black text-[#31326F] mb-1">Chapter Complete! 🏆</h2>
                    <div className="stars-container flex justify-center gap-4 my-6">
                        {[1, 2, 3].map(i => (
                            <motion.div key={i} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: i * 0.2 }} className={`star-wrapper ${percentage >= (i * 33) ? 'active' : ''}`}>
                                <Star size={60} fill={percentage >= (i * 33) ? "#FFD700" : "#EDF2F7"} color={percentage >= (i * 33) ? "#F6AD55" : "#CBD5E0"} />
                            </motion.div>
                        ))}
                    </div>
                    <div className="results-stats-grid grid grid-cols-2 lg:grid-cols-4 gap-4 w-full max-w-3xl mx-auto">
                        <div className="stat-card bg-white p-6 rounded-3xl shadow-sm border-2 border-[#E0FBEF]"><span className="block text-xs font-black text-[#4FB7B3] mb-1">Correct</span><span className="text-3xl font-black text-[#31326F]">{score}/{TOTAL_QUESTIONS}</span></div>
                        <div className="stat-card bg-white p-6 rounded-3xl shadow-sm border-2 border-[#E0FBEF]"><span className="block text-xs font-black text-[#4FB7B3] mb-1">Time</span><span className="text-3xl font-black text-[#31326F]">{formatTime(timeElapsed)}</span></div>
                        <div className="stat-card bg-white p-6 rounded-3xl shadow-sm border-2 border-[#E0FBEF]"><span className="block text-xs font-black text-[#4FB7B3] mb-1">Accuracy</span><span className="text-3xl font-black text-[#31326F]">{percentage}%</span></div>
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
                    <div className="bg-white/90 backdrop-blur-md px-3 py-1.5 sm:px-6 sm:py-2 rounded-full border-2 border-[#4FB7B3]/30 text-[#31326F] font-black text-sm sm:text-xl shadow-lg whitespace-nowrap">Q{qIndex + 1} / {TOTAL_QUESTIONS}</div>
                </div>
                <div className="header-right"><div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl border-2 border-[#4FB7B3]/30 text-[#31326F] font-bold text-lg shadow-md flex items-center gap-2">{formatTime(timeElapsed)}</div></div>
            </header>

            <main className="practice-content-wrapper">
                <div className="practice-board-container" style={{ gridTemplateColumns: '1fr', maxWidth: '800px', margin: '0 auto' }}>
                    <div className="practice-left-col" style={{ width: '100%' }}>
                        <AnimatePresence mode="wait">
                            <motion.div key={qIndex} initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -50, opacity: 0 }} transition={{ duration: 0.4, ease: "easeOut" }} style={{ height: '100%', width: '100%' }}>
                                <div className="question-card-modern" style={{ paddingLeft: '2rem' }}>
                                    <div className="question-header-modern">
                                        <h2 className="question-text-modern" style={{ fontFamily: '"Open Sans", sans-serif', fontSize: '2.5rem', fontWeight: '400', textAlign: 'center' }}>
                                            <span style={{ color: '#4FB7B3', fontWeight: 'bold', marginRight: '0.5rem' }}>{qIndex + 1}.</span>
                                            <LatexContent html={currentQuestion.text} />
                                        </h2>
                                    </div>
                                    <div className="interaction-area-modern">
                                        <div className="options-grid-modern">
                                            {shuffledOptions.map((option, idx) => (
                                                <button key={idx} className={`option-btn-modern ${selectedOption === option ? 'selected' : ''} ${isSubmitted && option === currentQuestion.correctAnswer ? 'correct' : ''} ${isSubmitted && selectedOption === option && !isCorrect ? 'wrong' : ''}`}
                                                    style={{ fontFamily: '"Open Sans", sans-serif', fontWeight: '400', fontSize: '2.5rem' }}
                                                    onClick={() => handleOptionSelect(option)} disabled={isSubmitted}><LatexContent html={option} /></button>
                                            ))}
                                        </div>
                                        {isSubmitted && isCorrect && <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="feedback-mini correct" style={{ marginTop: '20px' }}>{feedbackMessage}</motion.div>}
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </main>

            <ExplanationModal isOpen={showExplanationModal} isCorrect={isCorrect} correctAnswer={currentQuestion.correctAnswer} explanation={currentQuestion.solution} onClose={() => setShowExplanationModal(false)} onNext={() => setShowExplanationModal(false)} />

            <footer className="junior-bottom-bar">
                <div className="desktop-footer-controls">
                    <div className="bottom-left"><button className="bg-red-50 text-red-500 px-6 py-2 rounded-xl border-2 border-red-100 font-bold hover:bg-red-100 transition-colors flex items-center gap-2" onClick={async () => { if (sessionId) await api.finishSession(sessionId).catch(console.error); navigate(-1); }}>Exit</button></div>
                    <div className="bottom-center">{isSubmitted && <button className="view-explanation-btn" onClick={() => setShowExplanationModal(true)}><Eye size={20} /> Explain</button>}</div>
                    <div className="bottom-right">
                        <div className="nav-buttons-group">
                            {qIndex > 0 && <button className="nav-pill-next-btn" onClick={handlePrevious}><ChevronLeft size={28} strokeWidth={3} /> Prev</button>}
                            {isSubmitted ? <button className="nav-pill-next-btn" onClick={handleNext}>{qIndex < TOTAL_QUESTIONS - 1 ? <>Next <ChevronRight size={28} strokeWidth={3} /></> : <>Done <Check size={28} strokeWidth={3} /></>}</button> : <button className="nav-pill-submit-btn" onClick={handleCheck} disabled={!selectedOption}>Submit <Check size={28} strokeWidth={3} /></button>}
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default SkillApplicationProblems;

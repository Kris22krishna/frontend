import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { RefreshCw, Check, Eye, ChevronRight, ChevronLeft, X, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../../../../../services/api';
import LatexContent from '../../../../LatexContent';
import ExplanationModal from '../../../../ExplanationModal';
import '../../../../../pages/juniors/JuniorPracticeSession.css';

const CORRECT_MESSAGES = [
    "✨ Great estimate! You have a sharp eye! ✨",
    "🌟 Perfect! Your estimation skills are top-notch! 🌟",
    "🎉 Correct! You really know your sizes! 🎉",
    "✨ Fantastic work! ✨",
    "🚀 Super! You're becoming a Volume Master! 🚀",
    "🌿 Perfect! Nature thanks your precision! 🌿",
    "🎊 Great job! Moving on... 🎊",
    "💎 Spot on! Estimation is an art! 💎"
];

const VolumeEstimation = () => {
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
    const SKILL_ID = 1214;
    const SKILL_NAME = "Volume Estimation";

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
                text: "Estimate the volume of a standard <strong>cup of tea</strong>.",
                correctAnswer: "250 ml",
                options: ["250 ml", "5 Litres", "10 ml", "25 Litres"],
                solution: "A standard cup or glass typically holds around <strong>200 ml to 300 ml</strong>. 5L would be a large bucket, and 10ml is just two teaspoons."
            },
            {
                text: "Which of these containers would most likely hold exactly <strong>1 Litre</strong> of liquid?",
                correctAnswer: "A carton of fruit juice",
                options: ["A bathtub", "A carton of fruit juice", "A soup spoon", "An eye dropper"],
                solution: "Bathtubs hold 150-200 L, spoons hold ~15 ml, and eye droppers hold ~1 ml. A <strong>juice carton</strong> is a standard 1 L container."
            },
            {
                text: "Estimate the capacity of a large <strong>overhead water tank</strong> for a house.",
                correctAnswer: "1000 Litres",
                options: ["10 Litres", "1000 Litres", "100 ml", "50 Litres"],
                solution: "Household tanks are designed to store water for many uses (bathing, cleaning, cooking), so they usually hold <strong>500 to 2000 Litres</strong>."
            },
            {
                text: "If a small water bottle holds <strong>500 ml</strong>, how many such bottles are needed to fill a <strong>2.5 Litre</strong> jug?",
                correctAnswer: "5 bottles",
                options: ["2 bottles", "4 bottles", "5 bottles", "10 bottles"],
                solution: "1. Convert 2.5 L to ml: 2.5 × 1000 = 2500 ml.<br/>2. Divide: 2500 ml ÷ 500 ml = <strong>5 bottles</strong>."
            },
            {
                text: "Which has a <strong>greater volume</strong>: Six 200 ml juice boxes or one 1 Litre bottle?",
                correctAnswer: "Six 200 ml juice boxes",
                options: ["Six 200 ml juice boxes", "One 1 Litre bottle", "They are equal", "Cannot be determined"],
                solution: "Total for juice boxes: 6 × 200 ml = 1,200 ml.<br/>One bottle: 1,000 ml.<br/>Since 1,200 > 1,000, the <strong>boxes have more volume</strong>."
            },
            {
                text: "Estimate the volume of a <strong>standard teaspoon</strong>.",
                correctAnswer: "5 ml",
                options: ["5 ml", "50 ml", "500 ml", "5 Litres"],
                solution: "In cooking and medicine, a <strong>teaspoon</strong> is a small unit equal to exactly <strong>5 ml</strong>."
            },
            {
                text: "Estimate how much water a <strong>standard bathtub</strong> can hold when full.",
                correctAnswer: "150 Litres",
                options: ["15 Litres", "150 Litres", "1500 Litres", "1.5 Litres"],
                solution: "A bathtub is large enough for a person but not as big as a room. <strong>150 Litres</strong> is a reasonable estimate for a medium bathtub."
            },
            {
                text: "A large cooking pot for a family of 4 likely holds:",
                correctAnswer: "5 Litres",
                options: ["5 ml", "50 ml", "5 Litres", "500 Litres"],
                solution: "A meal for a family requires a few litres of space for liquid and food. <strong>5 Litres</strong> is standard; 500L would be for a whole village!"
            },
            {
                text: "Roughly how many <strong>drops of water</strong> would it take to fill a 1 ml pipette?",
                correctAnswer: "20 drops",
                options: ["2 drops", "20 drops", "200 drops", "2000 drops"],
                solution: "Standard medical and lab drops are approximately 0.05 ml each, so <strong>20 drops</strong> make about 1 ml."
            },
            {
                text: "Which unit is <strong>most appropriate</strong> to measure the volume of ink in a ballpen refill?",
                correctAnswer: "Millilitres (ml)",
                options: ["Litres (L)", "Millilitres (ml)", "Kilograms (kg)", "Metres (m)"],
                solution: "Ink in a pen is a very small quantity of liquid, so <strong>millilitres</strong> is the best unit to use."
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

    if (!currentQuestion && !showResults) return <div className="flex justify-center items-center h-screen text-[#31326F] font-bold tracking-widest text-2xl uppercase italic animate-pulse">Scanning Sizes...</div>;

    if (showResults) {
        const score = Object.values(answers).filter(val => val.isCorrect).length;
        const percentage = Math.round((score / TOTAL_QUESTIONS) * 100);
        return (
            <div className="junior-practice-page results-view overflow-y-auto" style={{ fontFamily: '"Open Sans", sans-serif' }}>
                <header className="junior-practice-header results-header relative">
                    <button onClick={() => navigate(-1)} className="back-topics-top absolute top-8 right-8 px-10 py-4 bg-white/20 hover:bg-white/30 text-white rounded-2xl font-black text-xl transition-all flex items-center gap-3 z-50 border-4 border-white/30 shadow-2xl backdrop-blur-sm">Back to Topics</button>
                    <div className="sun-timer-container"><div className="sun-timer"><div className="sun-rays"></div><span className="timer-text">Done!</span></div></div>
                    <div className="title-area"><h1 className="results-title">Estimation Report</h1></div>
                </header>
                <main className="practice-content results-content max-w-5xl mx-auto w-full px-4">
                    <div className="results-hero-section flex flex-col items-center mb-8">
                        <h2 className="text-4xl font-black text-[#31326F] mb-1">Adventure Complete! ✨</h2>
                        <div className="stars-container flex gap-4 my-6">
                            {[1, 2, 3].map(i => (
                                <motion.div key={i} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: i * 0.2 }} className={`star-wrapper ${percentage >= (i * 33) ? 'active' : ''}`}>
                                    <Star size={60} fill={percentage >= (i * 33) ? "#FFD700" : "#EDF2F7"} color={percentage >= (i * 33) ? "#F6AD55" : "#CBD5E0"} />
                                </motion.div>
                            ))}
                        </div>
                        <div className="results-stats-grid grid grid-cols-2 lg:grid-cols-4 gap-4 w-full max-w-3xl">
                            <div className="stat-card bg-white p-6 rounded-3xl shadow-sm border-2 border-[#E0FBEF] text-center"><span className="block text-xs font-black uppercase tracking-widest text-[#4FB7B3] mb-1">Correct</span><span className="text-3xl font-black text-[#31326F]">{score}/{TOTAL_QUESTIONS}</span></div>
                            <div className="stat-card bg-white p-6 rounded-3xl shadow-sm border-2 border-[#E0FBEF] text-center"><span className="block text-xs font-black uppercase tracking-widest text-[#4FB7B3] mb-1">Time</span><span className="text-3xl font-black text-[#31326F]">{formatTime(timeElapsed)}</span></div>
                            <div className="stat-card bg-white p-6 rounded-3xl shadow-sm border-2 border-[#E0FBEF] text-center"><span className="block text-xs font-black uppercase tracking-widest text-[#4FB7B3] mb-1">Accuracy</span><span className="text-3xl font-black text-[#31326F]">{percentage}%</span></div>
                            <div className="stat-card bg-white p-6 rounded-3xl shadow-sm border-2 border-[#E0FBEF] text-center"><span className="block text-xs font-black uppercase tracking-widest text-[#4FB7B3] mb-1">Score</span><span className="text-3xl font-black text-[#31326F]">{score * 10} pts</span></div>
                        </div>
                    </div>
                    <div className="detailed-breakdown w-full mb-12">
                        <h3 className="text-2xl font-black text-[#31326F] mb-6 px-4">Observation Log 📜</h3>
                        <div className="space-y-4">
                            {sessionQuestions.map((q, idx) => {
                                const ans = answers[idx];
                                if (!ans) return null;
                                return (
                                    <div key={idx} className={`p-6 rounded-[2rem] border-4 ${ans.isCorrect ? 'border-[#E0FBEF] bg-white' : 'border-red-50 bg-white'} relative`}>
                                        <div className="flex items-start gap-4">
                                            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-black text-white shrink-0 ${ans.isCorrect ? 'bg-[#4FB7B3]' : 'bg-red-400'}`}>{idx + 1}</div>
                                            <div className="flex-1">
                                                <div className="text-lg font-bold text-[#31326F] mb-4"><LatexContent html={q.text} /></div>
                                                <div className="grid md:grid-cols-2 gap-4 mb-4">
                                                    <div className="answer-box p-4 rounded-2xl bg-gray-50 border-2 border-gray-100"><span className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Your Choice</span><span className={`text-lg font-black ${ans.isCorrect ? 'text-[#4FB7B3]' : 'text-red-500'}`}>{ans.selected}</span></div>
                                                    {!ans.isCorrect && (<div className="answer-box p-4 rounded-2xl bg-[#E0FBEF] border-2 border-[#4FB7B3]/20"><span className="block text-[10px] font-black uppercase tracking-widest text-[#4FB7B3] mb-1">Correct Choice</span><span className="text-lg font-black text-[#31326F]">{q.correctAnswer}</span></div>)}
                                                </div>
                                                <div className="explanation-box p-4 rounded-2xl bg-blue-50/50 border-2 border-blue-100">
                                                    <span className="block text-[10px] font-black uppercase tracking-widest text-blue-400 mb-1">Explain? 💡</span>
                                                    <div className="text-sm font-medium text-gray-600"><LatexContent html={q.solution} /></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
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

export default VolumeEstimation;

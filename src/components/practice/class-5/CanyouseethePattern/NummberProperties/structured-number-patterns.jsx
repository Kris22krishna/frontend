import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { RefreshCw, Check, Eye, ChevronRight, ChevronLeft, X, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../../../../../services/api';
import LatexContent from '../../../../LatexContent';
import ExplanationModal from '../../../../ExplanationModal';
import mascotImg from '../../../../../assets/mascot.png';
import '../../../../../pages/juniors/JuniorPracticeSession.css';

const CORRECT_MESSAGES = [
    "✨ Pattern Master! ✨",
    "🌟 Brilliant sequence solving! 🌟",
    "🎉 Correct! You've found the structure! 🎉",
    "✨ Amazing observation! ✨",
    "🚀 Super! You're a number scientist! 🚀"
];

const TriangularNumberVisual = ({ n }) => {
    let dots = [];
    for (let i = 1; i <= n; i++) {
        for (let j = 0; j < i; j++) {
            dots.push(<circle key={`${i}-${j}`} cx={25 - (i * 5) + (j * 10) + 10} cy={i * 10} r="3" fill="#4FB7B3" />);
        }
    }
    return (
        <div className="flex justify-center items-center py-4">
            <svg width="60" height="60" viewBox="0 0 60 60">
                {dots}
            </svg>
        </div>
    );
};

const StructuredNumberPatterns = () => {
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

    const [sessionId, setSessionId] = useState(null);
    const questionStartTime = useRef(Date.now());
    const accumulatedTime = useRef(0);
    const isTabActive = useRef(true);
    const SKILL_ID = 1183;
    const SKILL_NAME = "Structured Number Patterns";

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

        const generateQuestions = () => {
            const qs = [];
            const squareData = [
                { n: 2, seq: "1, 4, 9, ...", ans: "16" },
                { n: 3, seq: "4, 9, 16, 25, ...", ans: "36" },
                { n: 1, seq: "1, 4, 9, 16, 25, 36, ...", ans: "49" }
            ];

            squareData.forEach(d => {
                qs.push({
                    text: `Identify the next square number in the sequence: ${d.seq}`,
                    correctAnswer: d.ans,
                    options: [d.ans, (parseInt(d.ans) + 5).toString(), (parseInt(d.ans) - 2).toString(), (parseInt(d.ans) + 11).toString()],
                    solution: `Square numbers are results of multiplying a number by itself ($n \times n$). $7 \times 7 = 49$.`
                });
            });

            qs.push({
                text: "Triangular numbers can be arranged in a triangle. What is the next triangular number after 1, 3, 6, 10?",
                visual: <TriangularNumberVisual n={4} />,
                correctAnswer: "15",
                options: ["15", "14", "20", "12"],
                solution: `Triangular numbers are sums of consecutive integers: $1, 1+2=3, 3+3=6, 6+4=10, 10+5=<b>15</b>$.`
            });
            qs.push({
                text: "Find the 6th triangular number.",
                correctAnswer: "21",
                options: ["21", "18", "25", "15"],
                solution: "Sum the first 6 integers: $1+2+3+4+5+6 = 21$."
            });
            qs.push({
                text: "What is the sum of two consecutive triangular numbers, say 3 and 6?",
                correctAnswer: "9",
                options: ["9", "18", "12", "10"],
                solution: `$3 + 6 = 9$. The sum of two consecutive triangular numbers is always a square number!`
            });

            qs.push({
                text: "The sum of the first 4 odd numbers ($1+3+5+7$) is equal to:",
                correctAnswer: "16",
                options: ["16", "15", "12", "20"],
                solution: "The sum of the first $n$ odd numbers is $n^2$. For $n=4$, $4^2 = 16$."
            });
            qs.push({
                text: "Find the pattern: $1 \times 1 = 1$, $11 \times 11 = 121$, $111 \times 111 = 12321$. What is $1111 \times 1111$?",
                correctAnswer: "1234321",
                options: ["1234321", "12344321", "11111111", "12321"],
                solution: "The digits increase to 4 and then decrease back to 1."
            });
            qs.push({
                text: "What is the result of $12345679 \times 9$?",
                correctAnswer: "111,111,111",
                options: ["111,111,111", "123456789", "999,999,999", "1,234,567,900"],
                solution: "This special number multiplied by 9 always results in all 1s."
            });
            qs.push({
                text: "Look at the pattern: $9 \times 6 = 54$; $9 \times 66 = 594$; $9 \times 666 = 5994$. What is $9 \times 6666$?",
                correctAnswer: "59994",
                options: ["59994", "5994", "599994", "600004"],
                solution: "As the 6s increase, more 9s appear in the middle between 5 and 4."
            });

            return qs;
        };

        setSessionQuestions(generateQuestions());

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
            setShuffledOptions([...qData.options].sort(() => Math.random() - 0.5));
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
                difficulty_level: qIndex < 3 ? 'Easy' : qIndex < 6 ? 'Medium' : 'Hard',
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

    const handleNext = async () => {
        if (qIndex < TOTAL_QUESTIONS - 1) {
            setQIndex(prev => prev + 1);
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
                } catch (err) {
                    console.error("Failed to create report", err);
                }
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
        if (isRight) setFeedbackMessage(CORRECT_MESSAGES[Math.floor(Math.random() * CORRECT_MESSAGES.length)]);
        else setShowExplanationModal(true);
        recordQuestionAttempt(currentQuestion, selectedOption, isRight);
    };

    const handlePrevious = () => {
        if (qIndex > 0) setQIndex(prev => prev - 1);
    };

    if (!currentQuestion && !showResults) return <div className="flex justify-center items-center h-screen text-[#31326F] font-bold">Structuring the numbers...</div>;

    if (showResults) {
        const score = Object.values(answers).filter(val => val.isCorrect).length;
        const percentage = Math.round((score / TOTAL_QUESTIONS) * 100);

        return (
            <div className="junior-practice-page results-view overflow-y-auto" style={{ fontFamily: '"Open Sans", sans-serif' }}>
                <header className="junior-practice-header results-header relative">
                    <button onClick={() => navigate(-1)} className="back-topics-top absolute top-8 right-8 px-10 py-4 bg-white/20 hover:bg-white/30 text-white rounded-2xl font-black text-xl transition-all flex items-center gap-3 z-50 border-4 border-white/30 shadow-2xl backdrop-blur-sm">Back to Topics</button>
                    <div className="sun-timer-container">
                        <div className="sun-timer"><div className="sun-rays"></div><span className="timer-text">Done!</span></div>
                    </div>
                    <div className="title-area"><h1 className="results-title">Structure Genius</h1></div>
                </header>
                <main className="practice-content results-content max-w-5xl mx-auto w-full px-4">
                    <div className="results-hero-section flex flex-col items-center mb-8">
                        <h2 className="text-4xl font-black text-[#31326F] mb-2">Sequence Mastery! 🔢</h2>
                        <div className="stars-container flex gap-4 my-6">
                            {[1, 2, 3].map(i => (
                                <motion.div key={i} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: i * 0.2 }} className={`star-wrapper ${percentage >= (i * 33) ? 'active' : ''}`}>
                                    <Star size={60} fill={percentage >= (i * 33) ? "#FFD700" : "#EDF2F7"} color={percentage >= (i * 33) ? "#F6AD55" : "#CBD5E0"} />
                                </motion.div>
                            ))}
                        </div>
                        <div className="results-stats-grid grid grid-cols-2 lg:grid-cols-4 gap-4 w-full max-w-3xl">
                            <div className="stat-card bg-white p-6 rounded-3xl shadow-sm border-2 border-[#E0FBEF] text-center">
                                <span className="block text-xs font-black uppercase tracking-widest text-[#4FB7B3] mb-1">Correct</span>
                                <span className="text-3xl font-black text-[#31326F]">{score}/{TOTAL_QUESTIONS}</span>
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
                                <span className="block text-xs font-black uppercase tracking-widest text-[#4FB7B3] mb-1">Score</span>
                                <span className="text-3xl font-black text-[#31326F]">{score * 10} pts</span>
                            </div>
                        </div>
                    </div>

                    <div className="detailed-breakdown w-full mb-12">
                        <h3 className="text-2xl font-black text-[#31326F] mb-6 px-4">Sequence Log 📜</h3>
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
                                                    <div className="answer-box p-4 rounded-2xl bg-gray-50 border-2 border-gray-100">
                                                        <span className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Your Answer</span>
                                                        <span className={`text-lg font-black ${ans.isCorrect ? 'text-[#4FB7B3]' : 'text-red-500'}`}>{ans.selected}</span>
                                                    </div>
                                                    {!ans.isCorrect && (
                                                        <div className="answer-box p-4 rounded-2xl bg-[#E0FBEF] border-2 border-[#4FB7B3]/20">
                                                            <span className="block text-[10px] font-black uppercase tracking-widest text-[#4FB7B3] mb-1">Correct Answer</span>
                                                            <span className="text-lg font-black text-[#31326F]">{q.correctAnswer}</span>
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="explanation-box p-4 rounded-2xl bg-blue-50/50 border-2 border-blue-100">
                                                    <span className="block text-[10px] font-black uppercase tracking-widest text-blue-400 mb-1">Solution 💡</span>
                                                    <div className="text-sm font-medium text-gray-600"><LatexContent html={q.solution} /></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <div className="results-actions flex flex-col md:flex-row justify-center gap-4 py-8 border-t-4 border-dashed border-gray-100">
                        <button className="magic-pad-btn play-again px-12 py-4 rounded-2xl bg-[#31326F] text-white font-black text-xl shadow-xl hover:-translate-y-1 transition-all" onClick={() => window.location.reload()}><RefreshCw size={24} /> New Sequence</button>
                        <button className="px-12 py-4 rounded-2xl border-4 border-[#31326F] text-[#31326F] font-black text-xl hover:bg-gray-50 transition-all flex items-center justify-center gap-3" onClick={() => navigate(-1)}>Back to Topics</button>
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
                    <div className="bg-white/90 backdrop-blur-md px-3 py-1.5 sm:px-6 sm:py-2 rounded-full border-2 border-[#4FB7B3]/30 text-[#31326F] font-black text-sm sm:text-xl shadow-lg whitespace-nowrap">Question {qIndex + 1} / {TOTAL_QUESTIONS}</div>
                </div>
                <div className="header-right"><div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl border-2 border-[#4FB7B3]/30 text-[#31326F] font-bold text-lg shadow-md flex items-center gap-2">{formatTime(timeElapsed)}</div></div>
            </header>
            <main className="practice-content-wrapper">
                <div className="practice-board-container" style={{ gridTemplateColumns: '1fr', maxWidth: '800px', margin: '0 auto' }}>
                    <div className="practice-left-col" style={{ width: '100%' }}>
                        <AnimatePresence mode="wait">
                            <motion.div key={qIndex} initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -50, opacity: 0 }} transition={{ duration: 0.4, ease: "easeOut" }} style={{ height: '100%', width: '100%' }}>
                                <div className="question-card-modern" style={{ paddingLeft: '2rem' }}>
                                    <div className="question-header-modern"><h2 className="question-text-modern" style={{ fontFamily: '"Open Sans", sans-serif', fontSize: '2.5rem', fontWeight: '400', textAlign: 'center' }}><LatexContent html={currentQuestion.text} /></h2></div>
                                    {currentQuestion.visual && <div className="my-2">{currentQuestion.visual}</div>}
                                    <div className="interaction-area-modern">
                                        <div className="options-grid-modern">
                                            {shuffledOptions.map((option, idx) => (
                                                <button key={idx} className={`option-btn-modern ${selectedOption === option ? 'selected' : ''} ${isSubmitted && option === currentQuestion.correctAnswer ? 'correct' : ''} ${isSubmitted && selectedOption === option && !isCorrect ? 'wrong' : ''}`} onClick={() => !isSubmitted && setSelectedOption(option)} disabled={isSubmitted} style={{ fontFamily: '"Open Sans", sans-serif', fontWeight: '400', fontSize: '2.5rem' }}><LatexContent html={option} /></button>
                                            ))}
                                        </div>
                                        {isSubmitted && isCorrect && (
                                            <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="feedback-mini correct" style={{ marginTop: '20px' }}>{feedbackMessage}</motion.div>
                                        )}
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
                    <div className="bottom-left"><button className="bg-red-50 text-red-500 px-6 py-2 rounded-xl border-2 border-red-100 font-bold hover:bg-red-100 transition-colors flex items-center gap-2" onClick={() => navigate(-1)}>Exit Session</button></div>
                    <div className="bottom-center">{isSubmitted && <button className="view-explanation-btn" onClick={() => setShowExplanationModal(true)}><Eye size={20} /> View Explanation</button>}</div>
                    <div className="bottom-right">
                        <div className="nav-buttons-group">
                            {qIndex > 0 && <button className="nav-pill-next-btn" onClick={handlePrevious}><ChevronLeft size={28} strokeWidth={3} /> Prev</button>}
                            {isSubmitted ? (
                                <button className="nav-pill-next-btn" onClick={handleNext}>{qIndex < TOTAL_QUESTIONS - 1 ? <>Next <ChevronRight size={28} strokeWidth={3} /></> : <>Done <Check size={28} strokeWidth={3} /></>}</button>
                            ) : (
                                <button className="nav-pill-submit-btn" onClick={handleCheck} disabled={!selectedOption}>Submit <Check size={28} strokeWidth={3} /></button>
                            )}
                        </div>
                    </div>
                </div>
                <div className="mobile-footer-controls">
                    <button className="bg-red-50 text-red-500 p-2 rounded-lg border border-red-100" onClick={() => navigate(-1)}><X size={20} /></button>
                    <div className="nav-buttons-group">
                        {isSubmitted ? (
                            <button className="nav-pill-next-btn" onClick={handleNext}>{qIndex < TOTAL_QUESTIONS - 1 ? "Next" : "Done"}</button>
                        ) : (
                            <button className="nav-pill-submit-btn" onClick={handleCheck} disabled={!selectedOption}>Submit</button>
                        )}
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default StructuredNumberPatterns;

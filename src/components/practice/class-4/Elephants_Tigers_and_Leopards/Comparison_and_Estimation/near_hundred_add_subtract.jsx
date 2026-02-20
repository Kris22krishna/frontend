import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { RefreshCw, Check, Eye, ChevronRight, ChevronLeft, X, Star, Zap, FastForward } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../../../../../services/api';
import LatexContent from '../../../../LatexContent';
import ExplanationModal from '../../../../ExplanationModal';
import '../../../../../pages/juniors/JuniorPracticeSession.css';

const SmartShortcuts = () => {
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

    // Logging
    const [sessionId, setSessionId] = useState(null);
    const questionStartTime = useRef(Date.now());
    const accumulatedTime = useRef(0);
    const isTabActive = useRef(true);
    const SKILL_ID = 1199;
    const SKILL_NAME = "Elephants, Tigers, and Leopards - Smart Shortcuts";
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

        const generatedQuestions = [];
        const difficulties = ['easy', 'easy', 'easy', 'medium', 'medium', 'medium', 'hard', 'hard', 'hard', 'hard'];

        difficulties.forEach((diff, idx) => {
            generatedQuestions.push(generateQuestion(diff, idx));
        });
        setSessionQuestions(generatedQuestions);

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

    const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

    const generateQuestion = (difficulty, index) => {
        // Theme: Shortcuts. "45 + 9 = 45 + 10 - 1"
        // Near 10, Near 100.

        let questionText = "";
        let correctAnswer = "";
        let explanation = "";

        if (difficulty === 'easy') {
            // Adding/Subtracting 9 or 11
            let n = randomInt(20, 80);
            let op = Math.random() > 0.5 ? 9 : 11;

            if (Math.random() > 0.5) {
                // Addition
                questionText = `To calculate **${n} + ${op}**, you can first add **10** and then...`;
                let ans = n + op;
                if (op === 9) {
                    correctAnswer = "Subtract 1";
                    explanation = `${n} + 10 = ${n + 10}.<br/>Since we added 1 too many (10 instead of 9), we **subtract 1**.<br/>${n + 10} - 1 = ${ans}.`;
                } else {
                    correctAnswer = "Add 1";
                    explanation = `${n} + 10 = ${n + 10}.<br/>We need 11, so we **add 1** more.<br/>${n + 10} + 1 = ${ans}.`;
                }
            } else {
                // Subtraction
                // n must be > 11
                questionText = `To calculate **${n} - ${op}**, you can first subtract **10** and then...`;
                if (op === 9) {
                    correctAnswer = "Add 1"; // -10 is too much subtracted. Add 1 back.
                    explanation = `Subtracting 10 takes away too much (we only wanted to take 9).<br/>So we **add 1** back.`;
                } else {
                    correctAnswer = "Subtract 1";
                    explanation = `Subtracting 10 is not enough (we need to take 11).<br/>So we **subtract 1** more.`;
                }
            }
            return {
                id: index,
                text: questionText,
                correctAnswer: correctAnswer,
                solution: explanation,
                shuffledOptions: ["Add 1", "Subtract 1", "Add 10", "Subtract 10"].sort(() => Math.random() - 0.5)
            };

        } else if (difficulty === 'medium') {
            // Near 100 (99, 101)
            let n = randomInt(200, 800);
            let op = Math.random() > 0.5 ? 99 : 101;
            let result;
            if (Math.random() > 0.5) {
                result = n + op;
                questionText = `What is **${n} + ${op}**? (Hint: Think of 100)`;
                explanation = op === 99 ? `${n} + 100 = ${n + 100}. Subtract 1 = ${result}.` : `${n} + 100 = ${n + 100}. Add 1 = ${result}.`;
            } else {
                result = n - op;
                questionText = `What is **${n} - ${op}**? (Hint: Think of 100)`;
                explanation = op === 99 ? `${n} - 100 = ${n - 100}. Add 1 back = ${result}.` : `${n} - 100 = ${n - 100}. Subtract 1 more = ${result}.`;
            }
            correctAnswer = result.toString();
        } else { // Hard
            // Mixed large numbers or step explanation
            // 564 + 298 = 564 + 300 - 2
            let n = randomInt(1000, 4000);
            let op = randomInt(1, 4) * 100 - 2; // 98, 198, 298..
            let rounded = op + 2; // 100, 200..

            questionText = `Which is the **smartest** way to calculate **${n} + ${op}**?`;
            correctAnswer = `${n} + ${rounded} - 2`;
            explanation = `${op} is close to ${rounded} (just 2 less).<br/>So add ${rounded} first, then remove 2.`;

            return {
                id: index,
                text: questionText,
                correctAnswer: correctAnswer,
                solution: explanation,
                shuffledOptions: [
                    `${n} + ${rounded} - 2`,
                    `${n} + ${rounded} + 2`,
                    `${n} + ${rounded - 10} + 8`,
                    `${n} + ${rounded} - 10`
                ].sort(() => Math.random() - 0.5)
            };
        }

        const correctVal = correctAnswer;
        const distractors = new Set([correctVal]);
        while (distractors.size < 4) {
            let d = parseInt(correctVal) + randomInt(-20, 20);
            if (d !== parseInt(correctVal) && !isNaN(d)) distractors.add(d.toString());
            if (distractors.size < 4 && !isNaN(parseInt(correctVal))) {
                distractors.add((parseInt(correctVal) + 10).toString());
                distractors.add((parseInt(correctVal) - 10).toString());
                distractors.add((parseInt(correctVal) + 100).toString());
            }
            // Safety break
            if (distractors.size < 4) distractors.add(randomInt(100, 999).toString());
        }

        return {
            id: index,
            text: questionText,
            correctAnswer: correctVal,
            solution: explanation,
            shuffledOptions: Array.from(distractors).sort(() => Math.random() - 0.5)
        };
    };

    const handleAnswer = (val) => {
        if (isSubmitted) return;
        setSelectedOption(val);
    };

    const handleSubmit = () => {
        if (!selectedOption || !currentQuestion) return;
        const isRight = selectedOption === currentQuestion.correctAnswer;
        setIsCorrect(isRight);
        setIsSubmitted(true);
        setAnswers(prev => ({ ...prev, [qIndex]: { isCorrect: isRight, selected: selectedOption } }));
        if (isRight) setFeedbackMessage("Fast & Smart! ⚡");
        else setShowExplanationModal(true);

        const userId = sessionStorage.getItem('userId') || localStorage.getItem('userId');
        if (!userId) return;
        let timeSpent = accumulatedTime.current;
        if (isTabActive.current) timeSpent += Date.now() - questionStartTime.current;
        api.recordAttempt({
            user_id: parseInt(userId, 10),
            session_id: sessionId,
            skill_id: SKILL_ID,
            difficulty_level: 'Medium',
            question_text: String(currentQuestion.text),
            correct_answer: String(currentQuestion.correctAnswer),
            student_answer: String(selectedOption),
            is_correct: isRight,
            solution_text: String(currentQuestion.solution),
            time_spent_seconds: Math.round(timeSpent / 1000)
        }).catch(console.error);
    };

    // ... Navigation ...
    const handleNext = async () => {
        if (qIndex < TOTAL_QUESTIONS - 1) {
            setQIndex(prev => prev + 1);
            setIsSubmitted(false);
            setIsCorrect(false);
            setSelectedOption(null);
            setShowExplanationModal(false);
            accumulatedTime.current = 0;
            questionStartTime.current = Date.now();
        } else {
            const userId = sessionStorage.getItem('userId');
            if (userId && sessionId) {
                const totalCorrect = Object.values(answers).filter(val => val.isCorrect).length;
                await api.createReport({
                    title: SKILL_NAME,
                    type: 'practice',
                    score: (totalCorrect / TOTAL_QUESTIONS) * 100,
                    parameters: { skill_id: SKILL_ID, total_questions: TOTAL_QUESTIONS, correct_answers: totalCorrect, timestamp: new Date().toISOString(), time_taken_seconds: timeElapsed },
                    user_id: parseInt(userId, 10)
                });
                await api.finishSession(sessionId);
            }
            setShowResults(true);
        }
    };
    const handlePrevious = () => { if (qIndex > 0) setQIndex(prev => prev - 1); };

    if (showResults) {
        const score = Object.values(answers).filter(a => a.isCorrect).length;
        return (
            <div className="junior-practice-page results-view overflow-y-auto">
                <header className="junior-practice-header results-header relative">
                    <button onClick={() => navigate(-1)} className="back-topics-top absolute top-8 right-8 px-10 py-4 bg-white/20 hover:bg-white/30 text-white rounded-2xl font-black text-xl transition-all flex items-center gap-3 z-50 border-4 border-white/30 shadow-2xl backdrop-blur-sm">Back</button>
                    <div className="title-area"><h1 className="results-title">Shortcut Pro!</h1></div>
                </header>
                <main className="practice-content results-content max-w-5xl mx-auto w-full px-4 text-center">
                    <h2 className="text-4xl font-black text-[#31326F] mb-6">Score: {score}/{TOTAL_QUESTIONS}</h2>
                    <button className="magic-pad-btn play-again px-12 py-4 rounded-2xl bg-[#31326F] text-white font-black text-xl" onClick={() => window.location.reload()}>Speed Math</button>
                </main>
            </div>
        );
    }

    if (!currentQuestion) return <div>Loading...</div>;

    return (
        <div className="junior-practice-page village-theme" style={{ fontFamily: '"Open Sans", sans-serif', background: '#FFFDE7' }}>
            <header className="junior-practice-header">
                <div className="bg-white/90 px-4 py-2 rounded-xl text-[#31326F] font-bold">Q {qIndex + 1} / {TOTAL_QUESTIONS}</div>
                <div className="bg-white/90 px-4 py-2 rounded-xl text-[#31326F] font-bold">{formatTime(timeElapsed)}</div>
            </header>

            <main className="practice-content-wrapper">
                <div className="flex flex-col items-center justify-center p-4 max-w-4xl mx-auto">

                    <div className="bg-white rounded-[3rem] p-8 shadow-xl border-b-8 border-yellow-200 w-full text-center">
                        <div className="flex justify-center mb-6">
                            <div className="bg-yellow-100 p-4 rounded-full"><Zap size={48} className="text-yellow-600" /></div>
                        </div>

                        <h2 className="text-3xl font-black text-[#31326F] mb-8 leading-relaxed">
                            <LatexContent html={currentQuestion.text} />
                        </h2>

                        <div className="grid grid-cols-2 gap-4 max-w-2xl mx-auto">
                            {shuffledOptions.map((opt, i) => (
                                <button
                                    key={i}
                                    disabled={isSubmitted}
                                    onClick={() => handleAnswer(opt)}
                                    className={`
                                         p-6 rounded-2xl text-2xl font-black transition-all border-4 shadow-sm
                                         ${selectedOption === opt
                                            ? 'border-yellow-400 bg-yellow-50 text-yellow-900'
                                            : 'border-yellow-50 bg-white text-gray-600 hover:border-yellow-200'}
                                         ${isSubmitted && opt === currentQuestion.correctAnswer ? '!border-green-500 !bg-green-100 !text-green-700' : ''}
                                         ${isSubmitted && selectedOption === opt && !isCorrect ? '!border-red-500 !bg-red-100 !text-red-700' : ''}
                                     `}
                                >
                                    {opt}
                                </button>
                            ))}
                        </div>

                        {isSubmitted && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={`mt-8 font-bold text-xl ${isCorrect ? 'text-green-600' : 'text-red-500'}`}>
                                {isCorrect ? feedbackMessage : "Quick thinking needed!"}
                            </motion.div>
                        )}
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
                    <div className="bottom-left"><button className="text-gray-500 font-bold hover:text-red-500" onClick={() => navigate(-1)}>Exit</button></div>
                    <div className="bottom-right">
                        <div className="flex gap-2">
                            {qIndex > 0 && <button className="nav-pill-next-btn" onClick={handlePrevious}><ChevronLeft /> Prev</button>}
                            {isSubmitted ? (
                                <button className="nav-pill-next-btn" onClick={handleNext}>Next <ChevronRight /></button>
                            ) : (
                                <button className="nav-pill-submit-btn" onClick={handleSubmit} disabled={!selectedOption}>Submit <Check /></button>
                            )}
                        </div>
                    </div>
                </div>
                <div className="mobile-footer-controls">
                    <div className="flex items-center gap-2"><button className="bg-red-50 text-red-500 p-2 rounded-lg border border-red-100" onClick={() => navigate(-1)}><X size={20} /></button></div>
                    <div className="mobile-footer-right" style={{ width: 'auto' }}>
                        <div className="nav-buttons-group">
                            {qIndex > 0 && <button className="nav-pill-next-btn" onClick={handlePrevious}>Prev</button>}
                            {isSubmitted ? (
                                <button className="nav-pill-next-btn" onClick={handleNext}>Next</button>
                            ) : (
                                <button className="nav-pill-submit-btn" onClick={handleSubmit} disabled={!selectedOption}>Submit</button>
                            )}
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default SmartShortcuts;

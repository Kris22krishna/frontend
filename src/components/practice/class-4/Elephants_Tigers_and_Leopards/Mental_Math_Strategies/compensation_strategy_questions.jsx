import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { RefreshCw, Check, Eye, ChevronRight, ChevronLeft, X, Star, ArrowLeftRight, GitMerge } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../../../../../services/api';
import LatexContent from '../../../../LatexContent';
import ExplanationModal from '../../../../ExplanationModal';
import '../../../../../pages/juniors/JuniorPracticeSession.css';

const CompensationStrategy = () => {
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
    const SKILL_ID = 1200;
    const SKILL_NAME = "Elephants, Tigers, and Leopards - Compensation Strategy";
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
        // Theme: "Give and Take" (Compensation).
        // If I add 2 to one number, I must subtract 2 from the other to keep sum same.
        // Or for subtraction: Add to both to keep difference same.

        let n1, n2, adj, qType;
        let questionText = "";
        let explanation = "";
        let correctAnswer = "";

        if (difficulty === 'easy') {
            // Addition Compensation
            // 28 + 45 = 30 + 43
            n1 = randomInt(18, 58);
            if (n1 % 10 > 7) adj = 10 - (n1 % 10); // Close to next 10 (e.g. 28 -> need 2)
            else adj = 1;

            n2 = randomInt(20, 60);
            let n1New = n1 + adj;
            let n2New = n2 - adj;

            questionText = `To make **${n1} + ${n2}** easier, we can change **${n1}** to **${n1New}**.<br/>What should **${n2}** become?`;
            correctAnswer = n2New.toString();
            explanation = `We added **${adj}** to ${n1}.<br/>To balance it, we must **subtract ${adj}** from ${n2}.<br/>${n2} - ${adj} = ${n2New}.`;
        } else if (difficulty === 'medium') {
            // Subtraction Compensation
            // 53 - 18 = 55 - 20 (Add 2 to both)
            let s1 = randomInt(40, 90);
            let s2 = randomInt(15, 39);
            if (s2 % 10 > 7) adj = 10 - (s2 % 10);
            else adj = 2; // Arbitrary small adjust

            let s2New = s2 + adj;
            let s1New = s1 + adj;

            questionText = `To subtract **${s1} - ${s2}**, we can add **${adj}** to ${s2} to make it **${s2New}**.<br/>What must we do to **${s1}**?`;
            correctAnswer = `Add ${adj}`;
            explanation = `In subtraction, if you change one number, you must change the other in the **same way** to keep the difference the same.<br/>So, add ${adj} to ${s1} too.`;

            // Adjust options: "Add X", "Subtract X"
            return {
                id: index,
                text: questionText,
                correctAnswer: correctAnswer,
                solution: explanation,
                shuffledOptions: [`Add ${adj}`, `Subtract ${adj}`, `Add ${adj + 1}`, `Subtract ${adj + 1}`].sort(() => Math.random() - 0.5)
            };
        } else { // Hard
            // Complete rewrite
            // "Which expression is equal to 198 + 345?"
            let n = randomInt(100, 400);
            let m = randomInt(100, 400);

            // e.g. 198 (needs +2)
            let base = Math.ceil(n / 100) * 100;
            adj = base - n;
            if (adj === 0 || adj > 5) adj = 2; // force it

            let mNew = m - adj;
            let nNew = n + adj;

            questionText = `Using the 'Give and Take' rule, which sum is the same as **${n} + ${m}**?`;
            correctAnswer = `${nNew} + ${mNew}`;
            explanation = `We give ${adj} to ${n} to make it ${nNew}.<br/>We take ${adj} from ${m} to make it ${mNew}.`;
        }

        const correctVal = correctAnswer;
        const distractors = new Set([correctVal]);

        while (distractors.size < 4) {
            // For Easy/Hard where answer is a number/expression
            if (difficulty === 'easy') {
                let d = parseInt(correctVal) + randomInt(-5, 5);
                if (d > 0 && d !== parseInt(correctVal)) distractors.add(d.toString());
            } else if (difficulty === 'hard') {
                // Options: n+adj + m+adj (Wrong), n-adj + m-adj (Wrong)
                // Correct: n+adj + m-adj
                if (distractors.size < 4) distractors.add(`${parseInt(correctAnswer.split('+')[0])} + ${parseInt(correctAnswer.split('+')[1]) + adj * 2}`);
                if (distractors.size < 4) distractors.add(`${parseInt(correctAnswer.split('+')[0]) - adj * 2} + ${parseInt(correctAnswer.split('+')[1])}`);
                if (distractors.size < 4) distractors.add(`${randomInt(100, 999)} + ${randomInt(100, 999)}`);
            }
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
        if (isRight) setFeedbackMessage("Fair Trade! ⚖️");
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
                    <div className="title-area"><h1 className="results-title">Math Balancer!</h1></div>
                </header>
                <main className="practice-content results-content max-w-5xl mx-auto w-full px-4 text-center">
                    <h2 className="text-4xl font-black text-[#31326F] mb-6">Score: {score}/{TOTAL_QUESTIONS}</h2>
                    <button className="magic-pad-btn play-again px-12 py-4 rounded-2xl bg-[#31326F] text-white font-black text-xl" onClick={() => window.location.reload()}>Rebalance</button>
                </main>
            </div>
        );
    }

    if (!currentQuestion) return <div>Loading...</div>;

    return (
        <div className="junior-practice-page village-theme" style={{ fontFamily: '"Open Sans", sans-serif', background: '#E3F2FD' }}>
            <header className="junior-practice-header">
                <div className="bg-white/90 px-4 py-2 rounded-xl text-[#31326F] font-bold">Q {qIndex + 1} / {TOTAL_QUESTIONS}</div>
                <div className="bg-white/90 px-4 py-2 rounded-xl text-[#31326F] font-bold">{formatTime(timeElapsed)}</div>
            </header>

            <main className="practice-content-wrapper">
                <div className="flex flex-col items-center justify-center p-4 max-w-4xl mx-auto">

                    <div className="bg-white rounded-[3rem] p-8 shadow-xl border-b-8 border-blue-200 w-full text-center">
                        <div className="flex justify-center gap-4 mb-6">
                            <div className="bg-blue-100 p-4 rounded-full"><GitMerge size={48} className="text-blue-600" /></div>
                            <div className="bg-blue-50 p-4 rounded-full"><ArrowLeftRight size={48} className="text-blue-400" /></div>
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
                                            ? 'border-blue-400 bg-blue-50 text-blue-900'
                                            : 'border-blue-50 bg-white text-gray-600 hover:border-blue-200'}
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
                                {isCorrect ? feedbackMessage : "Keep it balanced!"}
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

export default CompensationStrategy;

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
    "✨ Amazing! You're a pattern expert! ✨",
    "🌟 You're a pattern wizard! 🌟",
    "🎉 Correct! You really know your patterns! 🎉",
    "✨ Fantastic work! ✨",
    "🚀 Super! Keep striving for excellence! 🚀"
];

const PatternIdentification = () => {
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
    const SKILL_ID = 2001;
    const SKILL_NAME = "Pattern Identification";

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

        const generateQuestion = (idx) => {
            const types = ['arithmetic', 'geometric', 'alternating'];
            const type = types[idx % types.length];
            let sequence = [], questionText, correctAnswer, solution, options;

            if (type === 'arithmetic') {
                const start = randomInt(1, 20);
                const diff = randomInt(2, 10);
                for (let i = 0; i < 4; i++) sequence.push(start + i * diff);
                questionText = `Identify the next number in the pattern: $${sequence.join(', ')}, \\dots$?`;
                correctAnswer = (start + 4 * diff).toString();
                solution = `The difference between consecutive terms is $${diff}$.<br/>$${sequence[3]} + ${diff} = ${correctAnswer}$.`;
                options = [correctAnswer, (start + 5 * diff).toString(), (start + 4 * diff + 1).toString(), (start + 3 * diff).toString()];
            } else if (type === 'geometric') {
                const start = randomInt(1, 5);
                const ratio = randomInt(2, 3);
                for (let i = 0; i < 4; i++) sequence.push(start * Math.pow(ratio, i));
                questionText = `What comes next in the sequence: $${sequence.join(', ')}, \\dots$?`;
                correctAnswer = (start * Math.pow(ratio, 4)).toString();
                solution = `Each term is multiplied by $${ratio}$ to get the next term.<br/>$${sequence[3]} \\times ${ratio} = ${correctAnswer}$.`;
                options = [correctAnswer, (start * Math.pow(ratio, 5)).toString(), (parseFloat(correctAnswer) + ratio).toString(), (start * Math.pow(ratio, 3)).toString()];
            } else {
                const a = randomInt(1, 10);
                const b = randomInt(11, 20);
                sequence = [a, b, a + 1, b + 1, a + 2, b + 2];
                questionText = `Observe the alternating pattern: $${sequence.join(', ')}, \\dots$. What is the next number?`;
                correctAnswer = (a + 3).toString();
                solution = `There are two patterns: $${a}, ${a + 1}, ${a + 2} \dots$ and $${b}, ${b + 1}, ${b + 2} \dots$. The next term belongs to the first pattern.<br/>$${a + 2} + 1 = ${correctAnswer}$.`;
                options = [correctAnswer, (b + 3).toString(), (a + 4).toString(), (b + 2).toString()];
            }
            return { questionText, correctAnswer, solution, options };
        };

        const questions = [];
        for (let i = 0; i < TOTAL_QUESTIONS; i++) {
            const q = generateQuestion(i);
            questions.push({
                text: `<div class='question-container' style='font-family: "Open Sans", sans-serif; font-size: 2.2rem; font-weight: normal; text-align: center;'>${q.questionText}</div>`,
                correctAnswer: q.correctAnswer,
                solution: q.solution,
                shuffledOptions: [...q.options].sort(() => Math.random() - 0.5)
            });
        }
        setSessionQuestions(questions);

        return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
    }, []);

    useEffect(() => {
        if (showResults) return;
        const timer = setInterval(() => setTimeElapsed(prev => prev + 1), 1000);
        return () => clearInterval(timer);
    }, [showResults]);

    useEffect(() => {
        if (sessionQuestions.length > 0) {
            const qData = sessionQuestions[qIndex];
            setCurrentQuestion(qData);
            setShuffledOptions(qData.shuffledOptions);
            const prev = answers[qIndex];
            if (prev) {
                setSelectedOption(prev.selected);
                setIsSubmitted(true);
                setIsCorrect(prev.isCorrect);
            } else {
                setSelectedOption(null);
                setIsSubmitted(false);
                setIsCorrect(false);
            }
        }
    }, [qIndex, sessionQuestions]);

    const handleCheck = () => {
        if (!selectedOption || !currentQuestion) return;
        const isRight = selectedOption === currentQuestion.correctAnswer;
        setIsCorrect(isRight);
        setIsSubmitted(true);
        setAnswers(prev => ({ ...prev, [qIndex]: { isCorrect: isRight, selected: selectedOption } }));
        if (isRight) setFeedbackMessage(CORRECT_MESSAGES[randomInt(0, CORRECT_MESSAGES.length - 1)]);
        else setShowExplanationModal(true);
    };

    const handleNext = () => {
        if (qIndex < TOTAL_QUESTIONS - 1) setQIndex(prev => prev + 1);
        else setShowResults(true);
    };

    if (!currentQuestion && !showResults) return <div className="flex h-screen items-center justify-center text-2xl font-bold">Loading...</div>;

    if (showResults) {
        const score = Object.values(answers).filter(a => a.isCorrect).length;
        return (
            <div className="junior-practice-page results-view overflow-y-auto">
                <header className="junior-practice-header results-header relative">
                    <button onClick={() => navigate(-1)} className="back-topics-top absolute top-8 right-8 px-10 py-4 bg-white/20 text-white rounded-2xl font-black text-xl border-4 border-white/30">Back to Topics</button>
                    <h1 className="results-title">Pattern Identification Results</h1>
                </header>
                <main className="practice-content results-content max-w-5xl mx-auto w-full px-4 text-center">
                    <h2 className="text-4xl font-black text-[#31326F] mt-8">Score: {score}/{TOTAL_QUESTIONS}</h2>
                    <button className="magic-pad-btn play-again mt-8 px-12 py-4 rounded-2xl bg-[#31326F] text-white font-semibold text-xl" onClick={() => window.location.reload()}>Play Again</button>
                </main>
            </div>
        );
    }

    return (
        <div className="junior-practice-page village-theme">
            <header className="junior-practice-header flex justify-between items-center px-8">
                <button onClick={() => navigate(-1)} className="bg-white/90 p-2 rounded-xl border-2 border-[#4FB7B3]/30"><X size={24} /></button>
                <div className="bg-white/90 px-6 py-2 rounded-full border-2 border-[#4FB7B3]/30 font-semibold text-xl">Question {qIndex + 1} / {TOTAL_QUESTIONS}</div>
                <div className="bg-white/90 px-4 py-2 rounded-xl border-2 border-[#4FB7B3]/30 font-bold text-lg">{Math.floor(timeElapsed / 60)}:{(timeElapsed % 60).toString().padStart(2, '0')}</div>
            </header>
            <main className="practice-content-wrapper flex flex-col items-center mt-12">
                <AnimatePresence mode="wait">
                    <motion.div key={qIndex} initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -50, opacity: 0 }} className="question-card-modern w-full max-w-3xl p-8 bg-white rounded-3xl shadow-xl">
                        <h2 className="text-3xl font-medium text-center mb-12"><LatexContent html={currentQuestion.text} /></h2>
                        <div className="grid grid-cols-2 gap-4">
                            {shuffledOptions.map((opt, i) => (
                                <button key={i} className={`option-btn-modern p-6 rounded-2xl border-4 text-2xl font-medium transition-all ${selectedOption === opt ? 'border-[#4FB7B3] bg-[#E0FBEF]' : 'border-gray-100'}`} onClick={() => !isSubmitted && setSelectedOption(opt)} disabled={isSubmitted}><LatexContent html={opt} /></button>
                            ))}
                        </div>
                        {isSubmitted && isCorrect && <div className="feedback-mini correct mt-8 text-center text-[#4FB7B3] font-bold text-xl">{feedbackMessage}</div>}
                    </motion.div>
                </AnimatePresence>
            </main>
            <ExplanationModal isOpen={showExplanationModal} isCorrect={isCorrect} correctAnswer={currentQuestion.correctAnswer} explanation={currentQuestion.solution} onClose={() => setShowExplanationModal(false)} onNext={() => setShowExplanationModal(false)} />
            <footer className="junior-bottom-bar fixed bottom-0 w-full bg-white p-6 shadow-2xl flex justify-between items-center">
                <button className="bg-red-50 text-red-500 px-8 py-3 rounded-xl border-2 border-red-100 font-bold" onClick={() => navigate(-1)}>Exit</button>
                <div className="flex gap-4">
                    {qIndex > 0 && <button className="nav-pill-next-btn px-8 py-3 rounded-xl bg-gray-100 font-bold" onClick={() => setQIndex(qIndex - 1)}>Prev</button>}
                    {isSubmitted ? (
                        <button className="nav-pill-next-btn px-8 py-3 rounded-xl bg-[#31326F] text-white font-bold" onClick={handleNext}>{qIndex < TOTAL_QUESTIONS - 1 ? "Next" : "Done"}</button>
                    ) : (
                        <button className="nav-pill-submit-btn px-8 py-3 rounded-xl bg-[#4FB7B3] text-white font-bold" onClick={handleCheck} disabled={!selectedOption}>Submit</button>
                    )}
                </div>
            </footer>
        </div>
    );
};

export default PatternIdentification;

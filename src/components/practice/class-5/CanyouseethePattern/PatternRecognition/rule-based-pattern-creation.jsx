import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { RefreshCw, Check, Eye, ChevronRight, ChevronLeft, X, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../../../../../services/api';
import LatexContent from '../../../../LatexContent';
import ExplanationModal from '../../../../ExplanationModal';
import '../../../../../pages/juniors/JuniorPracticeSession.css';

const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const RuleBasedPatternCreation = () => {
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
    const SKILL_ID = 2002;
    const SKILL_NAME = "Rule-based Pattern Creation";
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

        const generateQuestion = (idx) => {
            const rules = ['multiplyBy2', 'addAndSubtract', 'square'];
            const rule = rules[idx % rules.length];
            let sequence = [], questionText, correctAnswer, solution, options;

            if (rule === 'multiplyBy2') {
                const start = randomInt(1, 10);
                sequence = [start, start * 2, start * 4];
                questionText = `Starting with $${start}$, double each number to create a pattern. What is the $4^{th}$ number?`;
                correctAnswer = (start * 8).toString();
                solution = `$${start} \\times 2 = ${start * 2}$, $${start * 2} \\times 2 = ${start * 4}$, $${start * 4} \\times 2 = <strong>${correctAnswer}</strong>$.`;
                options = [correctAnswer, (start * 16).toString(), (start * 6).toString(), (start + 6).toString()];
            } else if (rule === 'addAndSubtract') {
                const start = randomInt(20, 50);
                const add = randomInt(5, 10);
                const sub = randomInt(2, 4);
                sequence = [start, start + add, start + add - sub];
                questionText = `Rule: Add $${add}$, then subtract $${sub}$. Starting with $${start}$, the pattern is $${sequence.join(', ')}$. What is the next number?`;
                correctAnswer = (start + add - sub + add).toString();
                solution = `Previous term was $${sequence[2]}$. Applying the rule "Add $${add}$": $${sequence[2]} + ${add} = <strong>${correctAnswer}</strong>$.`;
                options = [correctAnswer, (start + add - sub - sub).toString(), (start + 2 * add - 2 * sub).toString(), (start + add).toString()];
            } else {
                const start = randomInt(1, 3);
                sequence = [start, start + 1, start + 2];
                questionText = `Rule: Square the position number (1st, 2nd, 3rd...). What is the $5^{th}$ number in this pattern?`;
                correctAnswer = "25";
                solution = `The $5^{th}$ position means $5^2 = 5 \\times 5 = <strong>25</strong>$.`;
                options = ["25", "20", "16", "30"];
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
    }, []);

    useEffect(() => {
        if (!showResults) {
            const timer = setInterval(() => setTimeElapsed(prev => prev + 1), 1000);
            return () => clearInterval(timer);
        }
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
        if (isRight) setFeedbackMessage("Great job! Rule applied correctly!");
        else setShowExplanationModal(true);
    };

    const handleNext = () => {
        if (qIndex < TOTAL_QUESTIONS - 1) setQIndex(prev => prev + 1);
        else setShowResults(true);
    };

    if (!currentQuestion && !showResults) return <div className="flex h-screen items-center justify-center text-2xl font-bold">Loading...</div>;

    if (showResults) {
        return (
            <div className="junior-practice-page results-view overflow-y-auto">
                <header className="junior-practice-header results-header text-center">
                    <h1 className="results-title">Rule-based Creation Results</h1>
                </header>
                <main className="practice-content results-content text-center mt-12">
                    <h2 className="text-4xl font-black">Score: {Object.values(answers).filter(a => a.isCorrect).length}/{TOTAL_QUESTIONS}</h2>
                    <button className="magic-pad-btn play-again mt-8 px-12 py-4 rounded-2xl bg-[#31326F] text-white font-semibold" onClick={() => navigate(-1)}>Back to Topics</button>
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
                <motion.div key={qIndex} initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="question-card-modern w-full max-w-3xl p-8 bg-white rounded-3xl shadow-xl">
                    <h2 className="text-3xl font-medium text-center mb-12"><LatexContent html={currentQuestion.text} /></h2>
                    <div className="grid grid-cols-2 gap-4">
                        {shuffledOptions.map((opt, i) => (
                            <button key={i} className={`option-btn-modern p-6 rounded-2xl border-4 text-2xl font-medium ${selectedOption === opt ? 'border-[#4FB7B3] bg-[#E0FBEF]' : 'border-gray-100'}`} onClick={() => !isSubmitted && setSelectedOption(opt)} disabled={isSubmitted}><LatexContent html={opt} /></button>
                        ))}
                    </div>
                </motion.div>
            </main>
            <ExplanationModal isOpen={showExplanationModal} isCorrect={isCorrect} correctAnswer={currentQuestion.correctAnswer} explanation={currentQuestion.solution} onClose={() => setShowExplanationModal(false)} onNext={() => setShowExplanationModal(false)} />
            <footer className="junior-bottom-bar fixed bottom-0 w-full bg-white p-6 shadow-2xl flex justify-between items-center">
                <button className="bg-red-50 text-red-500 px-8 py-3 rounded-xl border-2 border-red-100 font-bold" onClick={() => navigate(-1)}>Exit</button>
                <div className="flex gap-4">
                    {isSubmitted ? <button className="nav-pill-next-btn px-8 py-3 rounded-xl bg-[#31326F] text-white font-bold" onClick={handleNext}>Next</button> : <button className="nav-pill-submit-btn px-8 py-3 rounded-xl bg-[#4FB7B3] text-white font-bold" onClick={handleCheck} disabled={!selectedOption}>Submit</button>}
                </div>
            </footer>
        </div>
    );
};

export default RuleBasedPatternCreation;

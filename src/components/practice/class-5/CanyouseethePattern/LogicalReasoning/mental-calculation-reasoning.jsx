import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { RefreshCw, Check, Eye, ChevronRight, ChevronLeft, X, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../../../../../services/api';
import LatexContent from '../../../../LatexContent';
import ExplanationModal from '../../../../ExplanationModal';
import '../../../../../pages/juniors/JuniorPracticeSession.css';

const MentalCalculationReasoning = () => {
    const navigate = useNavigate();
    const [qIndex, setQIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const [showExplanationModal, setShowExplanationModal] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [shuffledOptions, setShuffledOptions] = useState([]);
    const [timeElapsed, setTimeElapsed] = useState(0);
    const [showResults, setShowResults] = useState(false);
    const [answers, setAnswers] = useState({});

    const TOTAL_QUESTIONS = 10;
    const [sessionQuestions, setSessionQuestions] = useState([]);

    useEffect(() => {
        const generateQuestion = (idx) => {
            const types = ['multiply9', 'add11', 'halfAndDouble'];
            const type = types[idx % types.length];
            let questionText, correctAnswer, solution, options;

            if (type === 'multiply9') {
                const val = randomInt(5, 20);
                questionText = `Quickly calculate $${val} \\times 9$. (Hint: Multiply by 10 and subtract the original number)`;
                correctAnswer = (val * 9).toString();
                solution = `$${val} \\times 10 = ${val * 10} \\to ${val * 10} - ${val} = <strong>${correctAnswer}</strong>$.`;
                options = [correctAnswer, (val * 10).toString(), (val * 8).toString(), (val * 9 + 1).toString()];
            } else if (type === 'add11') {
                const val = randomInt(50, 150);
                questionText = `Quickly add $${val} + 11$. (Hint: Add 10, then add 1)`;
                correctAnswer = (val + 11).toString();
                solution = `$${val} + 10 = ${val + 10} \\to ${val + 10} + 1 = <strong>${correctAnswer}</strong>$.`;
                options = [correctAnswer, (val + 10).toString(), (val + 12).toString(), (val + 21).toString()];
            } else {
                const a = 12, b = 5;
                questionText = `Calculate $${a} \\times ${b}$ by halving $${a}$ and doubling $${b}$.`;
                correctAnswer = "60";
                solution = `Half of $${a}$ is $6$. Double of $${b}$ is $10$. $6 \\times 10 = <strong>60</strong>$.`;
                options = ["60", "50", "72", "55"];
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
        if (!isRight) setShowExplanationModal(true);
    };

    if (!currentQuestion && !showResults) return <div className="flex h-screen items-center justify-center text-2xl font-bold text-[#31326F]">Loading...</div>;

    if (showResults) {
        return (
            <div className="junior-practice-page results-view overflow-y-auto">
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
                    {isSubmitted ? <button className="nav-pill-next-btn px-8 py-3 rounded-xl bg-[#31326F] text-white font-bold" onClick={() => qIndex < TOTAL_QUESTIONS - 1 ? setQIndex(qIndex + 1) : setShowResults(true)}>Next</button> : <button className="nav-pill-submit-btn px-8 py-3 rounded-xl bg-[#4FB7B3] text-white font-bold" onClick={handleCheck} disabled={!selectedOption}>Submit</button>}
                </div>
            </footer>
        </div>
    );
};

export default MentalCalculationReasoning;

import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { RefreshCw, Check, Eye, ChevronRight, ChevronLeft, X, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../../../../../services/api';
import LatexContent from '../../../../LatexContent';
import ExplanationModal from '../../../../ExplanationModal';
import '../../../../../pages/juniors/JuniorPracticeSession.css';

const StructuredNumberPatterns = () => {
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
            const types = ['staircase', 'multiplicationTrick', 'fibonacciLite'];
            const type = types[idx % types.length];
            let questionText, correctAnswer, solution, options;

            if (type === 'staircase') {
                questionText = `Observe: $1 \\times 1 = 1$, $11 \\times 11 = 121$. What is $111 \\times 111$?`;
                correctAnswer = "12321";
                solution = `The pattern for multiplying numbers with all 1s is to go up to the number of digits and then back down. 3 digits: $1 \\to 2 \\to 3 \\to 2 \\to 1 = <strong>12321</strong>$.`;
                options = ["12321", "1221", "123321", "11111"];
            } else if (type === 'multiplicationTricky') {
                const num = randomInt(2, 5);
                questionText = `Study the pattern: $1 \\times 8 + 1 = 9$, $12 \\times 8 + 2 = 98$. What is $123 \\times 8 + 3$?`;
                correctAnswer = "987";
                solution = `The results follow the decreasing digits from 9. 1 digit: 9. 2 digits: 98. 3 digits: <strong>987</strong>.`;
                options = ["987", "986", "999", "1000"];
            } else {
                const sequence = [1, 1, 2, 3, 5, 8];
                questionText = `In this pattern, each number is the sum of the two before it: $1, 1, 2, 3, 5, 8, \\dots$. What is the next number?`;
                correctAnswer = "13";
                solution = `$5 + 8 = <strong>13</strong>$.`;
                options = ["13", "11", "15", "10"];
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

    if (!currentQuestion && !showResults) return <div className="flex h-screen items-center justify-center text-2xl font-bold">Loading...</div>;

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

export default StructuredNumberPatterns;

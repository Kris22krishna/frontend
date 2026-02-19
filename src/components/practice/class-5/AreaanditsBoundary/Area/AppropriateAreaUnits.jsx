import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { RefreshCw, Check, Eye, ChevronRight, ChevronLeft, X, Star, Map, Compass, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../../../../../services/api';
import LatexContent from '../../../../LatexContent';
import ExplanationModal from '../../../../ExplanationModal';
import '../../../../../pages/juniors/JuniorPracticeSession.css';

const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const ScaleVisual = ({ level }) => {
    // level: 'small', 'medium', 'large'
    const scales = {
        small: (
            <div className="flex flex-col items-center">
                <div className="w-24 h-24 bg-white border-2 border-slate-200 rounded-lg flex items-center justify-center relative shadow-sm overflow-hidden">
                    <div className="absolute top-1 left-1 w-6 h-6 bg-slate-100 border border-slate-300 rounded"></div>
                    <div className="text-[10px] font-bold text-slate-400">STAMP</div>
                </div>
                <div className="mt-4 text-slate-400 font-bold">Small Object</div>
            </div>
        ),
        medium: (
            <div className="flex flex-col items-center">
                <div className="w-48 h-32 bg-indigo-50 border-2 border-slate-200 rounded-xl flex items-center justify-center relative shadow-md">
                    <div className="grid grid-cols-4 grid-rows-3 gap-2 p-2 w-full h-full opacity-20">
                        {[...Array(12)].map((_, i) => <div key={i} className="bg-slate-300"></div>)}
                    </div>
                    <Map className="absolute text-indigo-400" size={40} />
                </div>
                <div className="mt-4 text-indigo-400 font-bold">Classroom / Room</div>
            </div>
        ),
        large: (
            <div className="flex flex-col items-center">
                <div className="w-64 h-48 bg-emerald-50 border-2 border-slate-200 rounded-[2.5rem] flex items-center justify-center relative shadow-xl">
                    <Globe className="text-emerald-500 opacity-20" size={100} />
                    <Compass className="absolute text-emerald-600" size={50} />
                </div>
                <div className="mt-4 text-emerald-600 font-bold">City / Country</div>
            </div>
        )
    };
    return <div className="my-12 flex justify-center">{scales[level]}</div>;
};

const CORRECT_MESSAGES = [
    "✨ You have a great sense of scale! ✨",
    "🌟 Excellent unit choice! 🌟",
    "🎉 Correct! That unit fits perfectly! 🎉",
    "✨ Brilliant! ✨",
    "🚀 Mastering measurements! 🚀"
];

const AppropriateAreaUnits = () => {
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
    const SKILL_ID = 1162;
    const SKILL_NAME = "Choose and Interpret Appropriate Area Units";
    const TOTAL_QUESTIONS = 10;
    const [sessionQuestions, setSessionQuestions] = useState([]);
    const [answers, setAnswers] = useState({});

    useEffect(() => {
        const userId = sessionStorage.getItem('userId') || localStorage.getItem('userId');
        if (userId && !sessionId) {
            api.createPracticeSession(userId, SKILL_ID).then(sess => {
                if (sess && sess.session_id) setSessionId(sess.session_id);
            }).catch(console.error);
        }

        const generateQuestions = () => {
            const qs = [];

            // Easy (3) - Small objects
            const smallItems = [
                { item: "a postal stamp", unit: "square centimeters (sq cm)" },
                { item: "a student's notebook", unit: "square centimeters (sq cm)" },
                { item: "a playing card", unit: "square centimeters (sq cm)" }
            ];
            for (let i = 0; i < 3; i++) {
                qs.push({
                    text: `Which unit of area is most appropriate for measuring the surface of <strong>${smallItems[i].item}</strong>?`,
                    correctAnswer: smallItems[i].unit,
                    solution: `Since ${smallItems[i].item} is a very small object, we measure it in smaller units like <strong>square centimeters (sq cm)</strong>.`,
                    visual: <ScaleVisual level="small" />,
                    shuffledOptions: ["square centimeters (sq cm)", "square meters (sq m)", "square kilometers (sq km)", "kilometers (km)"].sort(() => Math.random() - 0.5)
                });
            }

            // Medium (3) - Mid-sized
            const medItems = [
                { item: "a classroom floor", unit: "square meters (sq m)" },
                { item: "a vegetable garden", unit: "square meters (sq m)" },
                { item: "a swimming pool surface", unit: "square meters (sq m)" }
            ];
            for (let i = 0; i < 3; i++) {
                qs.push({
                    text: `Which unit is best to measure the area of <strong>${medItems[i].item}</strong>?`,
                    correctAnswer: medItems[i].unit,
                    solution: `For larger objects like a ${medItems[i].item}, **square meters (sq m)** is more appropriate than sq cm or sq km.`,
                    visual: <ScaleVisual level="medium" />,
                    shuffledOptions: ["square meters (sq m)", "square centimeters (sq cm)", "square kilometers (sq km)", "meters (m)"].sort(() => Math.random() - 0.5)
                });
            }

            // Hard (4) - Very large or conversions
            const largeItems = [
                { item: "the state of Rajasthan", unit: "square kilometers (sq km)" },
                { item: "the city of Mumbai", unit: "square kilometers (sq km)" }
            ];
            for (let i = 0; i < 2; i++) {
                qs.push({
                    text: `What is the most suitable unit for measuring the area of <strong>${largeItems[i].item}</strong>?`,
                    correctAnswer: largeItems[i].unit,
                    solution: `Geographical areas like ${largeItems[i].item} are vast, so they are measured in <strong>square kilometers (sq km)</strong>.`,
                    visual: <ScaleVisual level="large" />,
                    shuffledOptions: ["square kilometers (sq km)", "square meters (sq m)", "square centimeters (sq cm)", "kilometers (km)"].sort(() => Math.random() - 0.5)
                });
            }

            // Conversion/comparison questions for Hard
            qs.push({
                text: "Fill in the blank: $1 \\text{ square meter} =$ ______ $\\text{square centimeters}$.",
                correctAnswer: "10,000",
                solution: `Since $1 \\text{ meter} = 100 \\text{ cm}$, <br/> $1 \\text{ sq m} = 100 \\text{ cm} \\times 100 \\text{ cm} = 10,000 \\text{ sq cm}$.`,
                visual: <div className="h-40 flex items-center justify-center text-5xl font-black text-indigo-400 opacity-30">$1 \\text{m}^2$</div>,
                shuffledOptions: ["10,000", "1,000", "100", "10,00,000"].sort(() => Math.random() - 0.5)
            });

            qs.push({
                text: "A rectangular field is $100$ m long and $10$ m wide. What is its <strong>area and appropriate unit</strong>?",
                correctAnswer: "1,000 sq m",
                solution: `Area = $100 \\text{ m} \\times 10 \\text{ m} = 1,000$ square meters.`,
                visual: <ScaleVisual level="medium" />,
                shuffledOptions: ["1,000 sq m", "1,000 sq cm", "110 sq m", "1,000 m"].sort(() => Math.random() - 0.5)
            });

            return qs;
        };
        setSessionQuestions(generateQuestions());
    }, []);

    useEffect(() => {
        if (!showResults) {
            const t = setInterval(() => setTimeElapsed(p => p + 1), 1000);
            return () => clearInterval(t);
        }
    }, [showResults]);

    useEffect(() => {
        if (sessionQuestions.length > 0) {
            const q = sessionQuestions[qIndex];
            setCurrentQuestion(q);
            setShuffledOptions(q.shuffledOptions);
            const ans = answers[qIndex];
            setSelectedOption(ans?.selected || null);
            setIsSubmitted(!!ans);
            setIsCorrect(ans?.isCorrect || false);
        }
    }, [qIndex, sessionQuestions, answers]);

    const handleCheck = () => {
        const isRight = selectedOption === currentQuestion.correctAnswer;
        setIsCorrect(isRight);
        setIsSubmitted(true);
        setAnswers(prev => ({ ...prev, [qIndex]: { isCorrect: isRight, selected: selectedOption } }));
        setFeedbackMessage(isRight ? CORRECT_MESSAGES[randomInt(0, CORRECT_MESSAGES.length - 1)] : "");
        if (!isRight) setShowExplanationModal(true);
        const userId = sessionStorage.getItem('userId') || localStorage.getItem('userId');
        if (userId && sessionId) {
            api.recordAttempt({
                user_id: parseInt(userId), session_id: sessionId, skill_id: SKILL_ID,
                difficulty_level: qIndex < 3 ? 'Easy' : qIndex < 6 ? 'Medium' : 'Hard',
                question_text: currentQuestion.text, correct_answer: currentQuestion.correctAnswer,
                student_answer: selectedOption, is_correct: isRight, solution_text: currentQuestion.solution,
                time_spent_seconds: 10
            });
        }
    };

    const handleNext = () => {
        if (qIndex < TOTAL_QUESTIONS - 1) setQIndex(qIndex + 1);
        else {
            const userId = sessionStorage.getItem('userId') || localStorage.getItem('userId');
            if (userId) {
                const score = Object.values(answers).filter(a => a.isCorrect).length;
                api.createReport({
                    title: SKILL_NAME, type: 'practice', score: (score / TOTAL_QUESTIONS) * 100,
                    parameters: { skill_id: SKILL_ID, skill_name: SKILL_NAME, total_questions: TOTAL_QUESTIONS, correct_answers: score, time_taken_seconds: timeElapsed },
                    user_id: parseInt(userId)
                });
            }
            if (sessionId) api.finishSession(sessionId);
            setShowResults(true);
        }
    };

    if (!currentQuestion && !showResults) return <div className="flex h-screen items-center justify-center text-2xl font-bold">Loading...</div>;

    if (showResults) {
        const score = Object.values(answers).filter(a => a.isCorrect).length;
        const percentage = Math.round((score / TOTAL_QUESTIONS) * 100);
        return (
            <div className="junior-practice-page results-view p-8 flex flex-col items-center">
                <header className="w-full flex justify-end mb-12"><button onClick={() => navigate(-1)} className="px-8 py-3 bg-slate-100 rounded-xl font-black">Close</button></header>
                <div className="flex gap-4 mb-8">{[1, 2, 3].map(i => <Star key={i} size={80} fill={percentage >= i * 33 ? "#FFD700" : "#EDF2F7"} color="#CBD5E0" />)}</div>
                <h1 className="text-5xl font-black text-[#31326F] mb-4">Unit Master!</h1>
                <div className="text-3xl font-bold text-slate-500 mb-12">{score} / {TOTAL_QUESTIONS} right</div>
                <button className="px-16 py-5 bg-[#4FB7B3] text-white rounded-[2rem] font-black text-2xl" onClick={() => navigate(-1)}>Back to Topics</button>
            </div>
        );
    }

    return (
        <div className="junior-practice-page village-theme" style={{ fontFamily: '"Open Sans", sans-serif' }}>
            <header className="junior-practice-header flex justify-between items-center px-12 h-24">
                <button onClick={() => navigate(-1)} className="bg-white p-2 rounded-xl border-2 border-slate-50"><X size={28} /></button>
                <div className="bg-white px-8 py-3 rounded-full border-2 border-slate-50 text-[#31326F] font-black text-2xl">Question {qIndex + 1} / {TOTAL_QUESTIONS}</div>
                <div className="w-24 text-right font-black text-xl">{Math.floor(timeElapsed / 60)}:{(timeElapsed % 60).toString().padStart(2, '0')}</div>
            </header>
            <main className="practice-content-wrapper flex items-center justify-center p-6">
                <div className="max-w-4xl w-full bg-white rounded-[4rem] p-16 shadow-2xl border-4 border-slate-50">
                    <h2 className="text-4xl font-black text-[#31326F] text-center mb-12"><LatexContent html={currentQuestion.text} /></h2>
                    <div className="mb-12">{currentQuestion.visual}</div>
                    <div className="grid grid-cols-2 gap-8 mt-12">
                        {shuffledOptions.map((opt, i) => (
                            <button
                                key={i} onClick={() => !isSubmitted && setSelectedOption(opt)} disabled={isSubmitted}
                                className={`p-10 text-2xl font-black rounded-3xl border-4 transition-all ${selectedOption === opt ? 'border-[#31326F] bg-indigo-50' : 'border-slate-50 bg-slate-50/20 hover:border-slate-200'} ${isSubmitted && opt === currentQuestion.correctAnswer ? 'bg-emerald-50 border-emerald-500 text-emerald-700' : ''} ${isSubmitted && selectedOption === opt && !isCorrect ? 'bg-red-50 border-red-500 text-red-700' : ''}`}
                            >
                                <LatexContent html={opt} />
                            </button>
                        ))}
                    </div>
                </div>
            </main>
            <footer className="h-28 bg-white/80 flex items-center justify-between px-16 border-t border-slate-100">
                <button className="text-red-500 font-black text-2xl" onClick={() => navigate(-1)}>Exit</button>
                <div className="flex gap-6">
                    {isSubmitted && <button className="px-10 py-4 bg-indigo-50 text-indigo-700 font-black rounded-2xl" onClick={() => setShowExplanationModal(true)}>Explain</button>}
                    {isSubmitted ?
                        <button className="px-12 py-4 bg-[#31326F] text-white font-black rounded-2xl" onClick={handleNext}>{qIndex < TOTAL_QUESTIONS - 1 ? 'Next' : 'Done'}</button> :
                        <button className="px-12 py-4 bg-[#4FB7B3] text-white font-black rounded-2xl" onClick={handleCheck} disabled={!selectedOption}>Submit</button>
                    }
                </div>
            </footer>
            <ExplanationModal isOpen={showExplanationModal} isCorrect={isCorrect} correctAnswer={currentQuestion.correctAnswer} explanation={currentQuestion.solution} onClose={() => setShowExplanationModal(false)} onNext={() => { setShowExplanationModal(false); handleNext(); }} />
        </div>
    );
};

export default AppropriateAreaUnits;

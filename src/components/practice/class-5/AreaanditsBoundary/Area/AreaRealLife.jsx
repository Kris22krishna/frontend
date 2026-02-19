import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { RefreshCw, Check, Eye, ChevronRight, ChevronLeft, X, Star, Home, TreePine, Layout } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../../../../../services/api';
import LatexContent from '../../../../LatexContent';
import ExplanationModal from '../../../../ExplanationModal';
import '../../../../../pages/juniors/JuniorPracticeSession.css';

const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const RealLifeVisual = ({ type, dimension1, dimension2, unit }) => {
    const renders = {
        rug: (
            <div className="flex flex-col items-center">
                <div className="w-64 h-40 bg-orange-100 border-4 border-orange-400 rounded-xl relative flex items-center justify-center overflow-hidden shadow-lg">
                    <div className="absolute inset-4 border-2 border-dashed border-orange-300 rounded-lg"></div>
                    <Layout className="text-orange-400 opacity-20" size={80} />
                    <span className="absolute top-2 left-1/2 -translate-x-1/2 font-black text-orange-600">{dimension1} {unit}</span>
                    <span className="absolute left-2 top-1/2 -translate-y-1/2 -rotate-90 font-black text-orange-600">{dimension2} {unit}</span>
                </div>
            </div>
        ),
        garden: (
            <div className="flex flex-col items-center">
                <div className="w-72 h-48 bg-emerald-50 border-4 border-emerald-500 rounded-2xl relative flex items-center justify-center overflow-hidden shadow-lg">
                    <div className="grid grid-cols-4 gap-4 p-4 opacity-30">
                        {[...Array(8)].map((_, i) => <TreePine key={i} className="text-emerald-600" size={32} />)}
                    </div>
                    <span className="absolute bottom-2 left-1/2 -translate-x-1/2 font-black text-emerald-700">{dimension1} {unit}</span>
                    <span className="absolute right-2 top-1/2 -translate-y-1/2 font-black text-emerald-700">{dimension2} {unit}</span>
                </div>
            </div>
        ),
        floor: (
            <div className="flex flex-col items-center">
                <div className="w-80 h-40 bg-slate-50 border-4 border-[#31326F] relative flex items-center justify-center overflow-hidden shadow-md">
                    <div className="absolute inset-0 grid grid-cols-10 grid-rows-5 border border-slate-200">
                        {[...Array(50)].map((_, i) => <div key={i} className="border-[0.5px] border-slate-100"></div>)}
                    </div>
                    <Home className="text-[#31326F] opacity-10" size={60} />
                    <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 font-black text-[#31326F]">{dimension1} {unit}</span>
                    <span className="absolute -right-16 top-1/2 -translate-y-1/2 font-black text-[#31326F]">{dimension2} {unit}</span>
                </div>
            </div>
        )
    };
    return <div className="my-12 flex justify-center">{renders[type] || renders.rug}</div>;
};

const CORRECT_MESSAGES = [
    "✨ You're a real-world geometry pro! ✨",
    "🌟 Excellent problem solving! 🌟",
    "🎉 Correct! You visualized that perfectly! 🎉",
    "✨ Brilliant calculation! ✨",
    "🚀 Scaling up your skills! 🚀"
];

const AreaRealLife = () => {
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
    const SKILL_ID = 1161;
    const SKILL_NAME = "Area in Real-Life Situations";
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

            // Easy (3)
            for (let i = 0; i < 3; i++) {
                const l = randomInt(2, 5);
                const w = randomInt(2, 4);
                const area = l * w;
                const items = ["small rug", "floor mat", "notice board"];
                const item = items[i];
                qs.push({
                    text: `A <strong>${item}</strong> has a length of $${l}$ m and a width of $${w}$ m. What is its <strong>area</strong>?`,
                    correctAnswer: `${area} sq m`,
                    solution: `To find the area of the ${item}, multiply length by width: <br/> $${l} \\text{ m} \\times ${w} \\text{ m} = ${area} \\text{ sq m}$.`,
                    visual: <RealLifeVisual type="rug" dimension1={l} dimension2={w} unit="m" />,
                    shuffledOptions: [`${area} sq m`, `${area + 2} sq m`, `${(l + w) * 2} sq m`, `${area - 1} sq m`].sort(() => Math.random() - 0.5)
                });
            }

            // Medium (3)
            for (let i = 0; i < 3; i++) {
                const l = randomInt(10, 20);
                const w = randomInt(5, 12);
                const area = l * w;
                qs.push({
                    text: `A rectangular <strong>garden</strong> is $${l}$ m long and $${w}$ m wide. What is the total <strong>area</strong> of the garden?`,
                    correctAnswer: `${area} sq m`,
                    solution: `Area of garden = Length $\\times$ Width <br/> $${l} \\times ${w} = ${area} \\text{ sq m}$.`,
                    visual: <RealLifeVisual type="garden" dimension1={l} dimension2={w} unit="m" />,
                    shuffledOptions: [`${area} sq m`, `${area + 15} sq m`, `${area - 10} sq m`, `${(l + w) * 2} sq m`].sort(() => Math.random() - 0.5)
                });
            }

            // Hard (4) - Cost or multi-step
            for (let i = 0; i < 4; i++) {
                if (i % 2 === 0) {
                    const l = randomInt(5, 8);
                    const w = randomInt(4, 6);
                    const area = l * w;
                    const costPerSq = randomInt(50, 150);
                    const totalCost = area * costPerSq;
                    qs.push({
                        text: `A room floor measures $${l}$ m by $${w}$ m. If the <strong>cost</strong> of tiling is $₹${costPerSq}$ per square meter, how much will it cost to tile the entire floor?`,
                        correctAnswer: `₹${totalCost}`,
                        solution: `Step 1: Find the area. $${l} \\times ${w} = ${area} \\text{ sq m}$. <br/> Step 2: Calculate total cost. $${area} \\times ₹${costPerSq} = ₹${totalCost}$.`,
                        visual: <RealLifeVisual type="floor" dimension1={l} dimension2={w} unit="m" />,
                        shuffledOptions: [`₹${totalCost}`, `₹${totalCost + 500}`, `₹${area}`, `₹${totalCost - 200}`].sort(() => Math.random() - 0.5)
                    });
                } else {
                    const l = 10, w = 10;
                    const innerL = 8, innerW = 8;
                    const outerArea = l * w;
                    const innerArea = innerL * innerW;
                    const pathArea = outerArea - innerArea;
                    qs.push({
                        text: `A square park has side $${l}$ m. A square path is built inside, leaving a smaller square of side $${innerL}$ m. What is the <strong>area of the path</strong>?`,
                        correctAnswer: `${pathArea} sq m`,
                        solution: `Total Area = $${l} \\times ${l} = 100 \\text{ sq m}$. <br/> Inner Area = $${innerL} \\times ${innerL} = 64 \\text{ sq m}$. <br/> Path Area = $100 - 64 = 36 \\text{ sq m}$.`,
                        visual: <div className="h-40 flex items-center justify-center bg-gray-50 rounded-xl border-dashed border-2 border-gray-300">Path Problem</div>,
                        shuffledOptions: [`${pathArea} sq m`, `${outerArea} sq m`, `${innerArea} sq m`, `10 sq m`].sort(() => Math.random() - 0.5)
                    });
                }
            }
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
                time_spent_seconds: 15
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
                <h1 className="text-5xl font-black text-[#31326F] mb-4">Great Work!</h1>
                <div className="text-3xl font-bold text-slate-500 mb-12">{score} out of {TOTAL_QUESTIONS} correct</div>
                <button className="px-16 py-5 bg-[#31326F] text-white rounded-[2rem] font-black text-2xl shadow-xl" onClick={() => navigate(-1)}>Back to Topics</button>
            </div>
        );
    }

    return (
        <div className="junior-practice-page village-theme" style={{ fontFamily: '"Open Sans", sans-serif' }}>
            <header className="junior-practice-header flex justify-between items-center px-12 h-24">
                <button onClick={() => navigate(-1)} className="bg-white p-2 rounded-xl border border-slate-100"><X size={28} /></button>
                <div className="bg-white/90 backdrop-blur px-8 py-3 rounded-full border border-slate-100 text-[#31326F] font-black text-2xl">Question {qIndex + 1} / {TOTAL_QUESTIONS}</div>
                <div className="w-24 text-right font-bold text-xl">{Math.floor(timeElapsed / 60)}:{(timeElapsed % 60).toString().padStart(2, '0')}</div>
            </header>
            <main className="practice-content-wrapper flex items-center justify-center p-6">
                <div className="max-w-4xl w-full bg-white rounded-[4rem] p-16 shadow-2xl border-b-[12px] border-[#31326F]/10">
                    <h2 className="text-4xl font-black text-[#31326F] text-center mb-12 leading-tight"><LatexContent html={currentQuestion.text} /></h2>
                    <div className="mb-12">{currentQuestion.visual}</div>
                    <div className="grid grid-cols-2 gap-8">
                        {shuffledOptions.map((opt, i) => (
                            <button
                                key={i} onClick={() => !isSubmitted && setSelectedOption(opt)} disabled={isSubmitted}
                                className={`p-10 text-3xl font-black rounded-[2.5rem] border-4 transition-all duration-300 transform hover:-translate-y-1 ${selectedOption === opt ? 'border-[#31326F] bg-indigo-50 shadow-inner' : 'border-slate-50 bg-slate-50/30 hover:bg-white hover:border-indigo-100 shadow-sm'} ${isSubmitted && opt === currentQuestion.correctAnswer ? 'bg-emerald-50 border-emerald-500 text-emerald-700' : ''} ${isSubmitted && selectedOption === opt && !isCorrect ? 'bg-red-50 border-red-500 text-red-700' : ''}`}
                            >
                                <LatexContent html={opt} />
                            </button>
                        ))}
                    </div>
                    {isSubmitted && isCorrect && <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-center mt-12 text-[#4FB7B3] font-black text-3xl">{feedbackMessage}</motion.div>}
                </div>
            </main>
            <footer className="h-28 bg-white/60 backdrop-blur-xl flex items-center justify-between px-16 border-t border-slate-100">
                <button className="text-red-500 font-black text-2xl px-6" onClick={() => navigate(-1)}>Exit</button>
                <div className="flex gap-6">
                    {isSubmitted && <button className="px-10 py-4 bg-indigo-50 text-indigo-700 font-black rounded-3xl" onClick={() => setShowExplanationModal(true)}>Explain</button>}
                    {isSubmitted ?
                        <button className="px-12 py-4 bg-[#31326F] text-white font-black rounded-[1.5rem] text-xl" onClick={handleNext}>{qIndex < TOTAL_QUESTIONS - 1 ? 'Next' : 'Done'}</button> :
                        <button className="px-12 py-4 bg-[#4FB7B3] text-white font-black rounded-[1.5rem] text-xl" onClick={handleCheck} disabled={!selectedOption}>Submit</button>
                    }
                </div>
            </footer>
            <ExplanationModal isOpen={showExplanationModal} isCorrect={isCorrect} correctAnswer={currentQuestion.correctAnswer} explanation={currentQuestion.solution} onClose={() => setShowExplanationModal(false)} onNext={() => { setShowExplanationModal(false); handleNext(); }} />
        </div>
    );
};

export default AreaRealLife;

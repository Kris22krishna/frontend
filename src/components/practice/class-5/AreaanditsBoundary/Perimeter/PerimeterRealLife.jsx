import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { RefreshCw, Check, Eye, ChevronRight, ChevronLeft, X, Star, Frame, Fence, Footprints } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../../../../../services/api';
import LatexContent from '../../../../LatexContent';
import ExplanationModal from '../../../../ExplanationModal';
import '../../../../../pages/juniors/JuniorPracticeSession.css';

const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const PerimeterObjectVisual = ({ type, l, w, unit }) => {
    const renders = {
        frame: (
            <div className="flex flex-col items-center">
                <div className="w-56 h-64 bg-amber-50 border-[12px] border-amber-800 rounded shadow-2xl relative flex items-center justify-center">
                    <Frame className="text-amber-800 opacity-10" size={100} />
                    <div className="absolute top-2 left-1/2 -translate-x-1/2 font-black text-amber-900">{l} {unit}</div>
                    <div className="absolute right-2 top-1/2 -translate-y-1/2 font-black text-amber-900 -rotate-90">{w} {unit}</div>
                </div>
            </div>
        ),
        garden: (
            <div className="flex flex-col items-center">
                <div className="w-80 h-48 bg-emerald-50 border-4 border-emerald-500 rounded-2xl relative shadow-lg overflow-hidden">
                    <div className="absolute inset-0 grid grid-cols-6 grid-rows-4 opacity-10">
                        {[...Array(24)].map((_, i) => <Fence key={i} />)}
                    </div>
                    <div className="absolute -left-2 top-0 bottom-0 w-2 bg-amber-700/30"></div>
                    <div className="absolute -right-2 top-0 bottom-0 w-2 bg-amber-700/30"></div>
                    <div className="absolute left-0 right-0 -top-2 h-2 bg-amber-700/30"></div>
                    <div className="absolute left-0 right-0 -bottom-2 h-2 bg-amber-700/30"></div>
                    <span className="absolute bottom-4 left-1/2 -translate-x-1/2 font-black text-emerald-800 tracking-tighter">{l} {unit}</span>
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 font-black text-emerald-800 -rotate-90">{w} {unit}</span>
                </div>
            </div>
        ),
        runner: (
            <div className="flex flex-col items-center">
                <div className="w-80 h-48 border-4 border-slate-300 rounded-[3rem] relative bg-slate-50 flex items-center justify-center">
                    <motion.div
                        animate={{ x: [0, 100, 0, -100, 0], y: [0, 50, 100, 50, 0] }}
                        transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                        className="text-indigo-500"
                    ><Footprints size={40} /></motion.div>
                    <span className="absolute -top-10 left-1/2 -translate-x-1/2 font-black text-[#31326F]">{l} {unit}</span>
                    <span className="absolute -right-16 top-1/2 -translate-y-1/2 font-black text-[#31326F]">{w} {unit}</span>
                </div>
            </div>
        )
    };
    return <div className="my-16">{renders[type]}</div>;
};

const CORRECT_MESSAGES = [
    "✨ You solved it! Real-world math master! ✨",
    "🌟 Excellent boundary calculation! 🌟",
    "🎉 Correct! You're ready to build a fence! 🎉",
    "✨ Brilliant visualization! ✨",
    "🚀 Scaling up your geometry skills! 🚀"
];

const PerimeterRealLife = () => {
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
    const SKILL_ID = 1166;
    const SKILL_NAME = "Perimeter in Real-Life Contexts";
    const TOTAL_QUESTIONS = 10;
    const [sessionQuestions, setSessionQuestions] = useState([]);
    const [answers, setAnswers] = useState({});

    useEffect(() => {
        const userId = sessionStorage.getItem('userId') || localStorage.getItem('userId');
        if (userId && !sessionId) {
            api.createPracticeSession(userId, SKILL_ID).then(sess => {
                if (sess && sess.session_id) setSessionId(sess.session_id);
            });
        }

        const generateQuestions = () => {
            const qs = [];

            // Easy (3) - Frames, Lace
            for (let i = 0; i < 3; i++) {
                const l = randomInt(20, 50);
                const w = randomInt(15, 30);
                const p = 2 * (l + w);
                qs.push({
                    text: `A picture frame is $${l}$ cm long and $${w}$ cm wide. How much <strong>wooden strip</strong> is needed to make the frame?`,
                    correctAnswer: `${p} cm`,
                    solution: `The wooden strip goes around the boundary. <br/> Perimeter $= 2 \\times (L + W) = 2 \\times (${l} + ${w}) = 2 \\times ${l + w} = ${p}$ cm.`,
                    visual: <PerimeterObjectVisual type="frame" l={l} w={w} unit="cm" />,
                    shuffledOptions: [`${p} cm`, `${l * w} cm`, `${l + w} cm`, `${p + 10} cm`].sort(() => Math.random() - 0.5)
                });
            }

            // Medium (3) - Fencing
            for (let i = 0; i < 3; i++) {
                const l = randomInt(40, 80);
                const w = randomInt(25, 45);
                const p = 2 * (l + w);
                qs.push({
                    text: `A farmer wants to <strong>fence</strong> a rectangular field that is $${l}$ m long and $${w}$ m wide. What is the total length of the fence needed?`,
                    correctAnswer: `${p} m`,
                    solution: `Fencing involves the perimeter: <br/> $2 \\times (${l} + ${w}) = 2 \\times ${l + w} = ${p}$ m.`,
                    visual: <PerimeterObjectVisual type="garden" l={l} w={w} unit="m" />,
                    shuffledOptions: [`${p} m`, `${l * w} m`, `${p * 2} m`, `${p - 10} m`].sort(() => Math.random() - 0.5)
                });
            }

            // Hard (4) - Walking/Cost
            for (let i = 0; i < 4; i++) {
                if (i % 2 === 0) {
                    const l = randomInt(100, 200);
                    const w = randomInt(50, 100);
                    const p = 2 * (l + w);
                    const laps = randomInt(2, 5);
                    const totalDist = p * laps;
                    qs.push({
                        text: `An athlete runs around a rectangular park ($${l}$ m by $${w}$ m) <strong>$${laps}$ times</strong>. What is the total distance covered?`,
                        correctAnswer: `${totalDist} m`,
                        solution: `Park Perimeter $= 2 \\times (${l} + ${w}) = ${p}$ m. <br/> Total Distance $= ${laps} \\times ${p} = ${totalDist}$ m.`,
                        visual: <PerimeterObjectVisual type="runner" l={l} w={w} unit="m" />,
                        shuffledOptions: [`${totalDist} m`, `${p} m`, `${l * w} m`, `${totalDist + 100} m`].sort(() => Math.random() - 0.5)
                    });
                } else {
                    const l = randomInt(10, 15);
                    const w = randomInt(6, 10);
                    const p = 2 * (l + w);
                    const rate = randomInt(20, 40);
                    const cost = p * rate;
                    qs.push({
                        text: `The cost of fencing a field is $₹${rate}$ per meter. If the field is $${l}$ m by $${w}$ m, what is the <strong>total cost of fencing</strong>?`,
                        correctAnswer: `₹${cost}`,
                        solution: `Step 1: Perimeter $= 2 \\times (${l} + ${w}) = ${p}$ m. <br/> Step 2: Cost $= ${p} \\times ₹${rate} = ₹${cost}$.`,
                        visual: <div className="h-32 flex items-center justify-center font-black text-emerald-600 bg-emerald-50 rounded-2xl">Cost Problem</div>,
                        shuffledOptions: [`₹${cost}`, `₹${cost + 100}`, `₹${p}`, `₹${l * w * rate}`].sort(() => Math.random() - 0.5)
                    });
                }
            }
            return qs;
        }
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
            <div className="junior-practice-page results-view p-8 flex flex-col items-center justify-center h-screen bg-white">
                <div className="flex gap-4 mb-12 text-amber-400">{[1, 2, 3].map(i => <Star key={i} size={80} fill={percentage >= i * 33 ? "currentColor" : "none"} />)}</div>
                <h1 className="text-7xl font-black text-[#31326F] mb-4 text-center leading-tight">Expert Perimeter Skills!</h1>
                <div className="text-4xl font-black text-[#4FB7B3] mb-16">{score} / {TOTAL_QUESTIONS} Points</div>
                <button className="px-20 py-6 bg-[#31326F] text-white rounded-[2rem] font-black text-3xl shadow-xl hover:scale-105 active:scale-95 transition-all" onClick={() => navigate(-1)}>Exit</button>
            </div>
        );
    }

    return (
        <div className="junior-practice-page village-theme" style={{ fontFamily: '"Open Sans", sans-serif' }}>
            <header className="px-12 h-24 flex items-center justify-between border-b-4 border-slate-50">
                <button onClick={() => navigate(-1)} className="p-3 bg-white/50 rounded-2xl border-2 border-white shadow-inner"><X size={28} /></button>
                <div className="bg-white px-10 py-3 rounded-full font-black text-2xl text-[#31326F] shadow-lg">Q{qIndex + 1} / {TOTAL_QUESTIONS}</div>
                <div className="font-black text-2xl text-slate-300 w-24 text-right tracking-widest">{formatTime(timeElapsed)}</div>
            </header>
            <main className="practice-content-wrapper flex items-center justify-center p-8">
                <div className="max-w-4xl w-full bg-white rounded-[4rem] p-16 shadow-2xl relative">
                    <div className="absolute top-0 left-0 w-32 h-32 bg-indigo-50 rounded-br-[10rem] -z-10"></div>
                    <h2 className="text-4xl font-black text-[#31326F] text-center mb-12 leading-relaxed"><LatexContent html={currentQuestion.text} /></h2>
                    <div className="flex justify-center mb-12 transform scale-110">{currentQuestion.visual}</div>
                    <div className="grid grid-cols-2 gap-8">
                        {shuffledOptions.map((opt, i) => (
                            <button
                                key={i} onClick={() => !isSubmitted && setSelectedOption(opt)} disabled={isSubmitted}
                                className={`p-10 text-3xl font-black rounded-[2.5rem] border-4 transition-all duration-300 ${selectedOption === opt ? 'border-[#31326F] bg-indigo-100/30' : 'border-slate-50 bg-slate-50/20 hover:bg-white shadow-sm'} ${isSubmitted && opt === currentQuestion.correctAnswer ? 'bg-emerald-50 border-emerald-500 text-emerald-700' : ''} ${isSubmitted && selectedOption === opt && !isCorrect ? 'bg-red-50 border-red-500 text-red-700' : ''}`}
                            >
                                <LatexContent html={opt} />
                            </button>
                        ))}
                    </div>
                </div>
            </main>
            <footer className="h-28 px-16 flex items-center justify-between">
                <button className="text-2xl font-black text-red-500 hover:text-red-600" onClick={() => navigate(-1)}>Exit</button>
                <div className="flex gap-6">
                    {isSubmitted && <button className="px-12 py-4 bg-indigo-50 text-[#31326F] font-black rounded-3xl" onClick={() => setShowExplanationModal(true)}>Explain</button>}
                    {isSubmitted ?
                        <button className="px-14 py-4 bg-[#31326F] text-white font-black rounded-[1.5rem] text-xl" onClick={handleNext}>{qIndex < TOTAL_QUESTIONS - 1 ? 'Next' : 'Done'}</button> :
                        <button className="px-14 py-4 bg-[#4FB7B3] text-white font-black rounded-[1.5rem] text-xl" onClick={handleCheck} disabled={!selectedOption}>Submit</button>
                    }
                </div>
            </footer>
            <ExplanationModal isOpen={showExplanationModal} isCorrect={isCorrect} correctAnswer={currentQuestion.correctAnswer} explanation={currentQuestion.solution} onClose={() => setShowExplanationModal(false)} onNext={() => { setShowExplanationModal(false); handleNext(); }} />
        </div>
    );
};

const formatTime = (s) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`;

export default PerimeterRealLife;

import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { RefreshCw, Check, Eye, ChevronRight, ChevronLeft, X, Star, BrainCircuit, Rocket } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../../../../../services/api';
import LatexContent from '../../../../LatexContent';
import ExplanationModal from '../../../../ExplanationModal';
import '../../../../../pages/juniors/JuniorPracticeSession.css';

const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const CORRECT_MESSAGES = [
    "✨ You're a true Geometry Master! ✨",
    "🌟 Complex problem solver! 🌟",
    "🎉 Correct! You've mastered Skill Application! 🎉",
    "✨ Brilliant logic! ✨",
    "🚀 Ready for the next level! 🚀"
];

const SkillApplicationProblemsArea = () => {
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
    const SKILL_ID = 1168;
    const SKILL_NAME = "Skill Application Problems (Area & Perimeter)";
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

            // Easy (3) - Mixed basics
            qs.push({
                text: "A square has a perimeter of $24$ cm. What is its <strong>area</strong>?",
                correctAnswer: "36 sq cm",
                solution: `Step 1: Find side. $P = 24$, so side $= 24 \\div 4 = 6$ cm. <br/> Step 2: Calculate area. $A = 6 \\times 6 = 36$ sq cm.`,
                visual: <div className="h-24 flex items-center justify-center font-black text-indigo-200">P = 24 cm</div>,
                shuffledOptions: ["36 sq cm", "24 sq cm", "48 sq cm", "12 sq cm"].sort(() => Math.random() - 0.5)
            });

            qs.push({
                text: "A rectangular mat is $3$ m long and $2$ m wide. What is the difference between its <strong>area</strong> and <strong>perimeter</strong> (values only)?",
                correctAnswer: "4",
                solution: `Area $= 3 \\times 2 = 6$ sq m. <br/> Perimeter $= 2 \\times (3+2) = 10$ m. <br/> Difference $= 10 - 6 = 4$.`,
                shuffledOptions: ["4", "5", "6", "10"].sort(() => Math.random() - 0.5)
            });

            qs.push({
                text: "To cover a floor with tiles, we need the ________, but to put a border around it, we need the ________.",
                correctAnswer: "Area, Perimeter",
                solution: "Tiles cover the inner surface (<strong>Area</strong>), a border goes around the boundary (<strong>Perimeter</strong>).",
                shuffledOptions: ["Area, Perimeter", "Perimeter, Area", "Length, Width", "Volume, Area"].sort(() => Math.random() - 0.5)
            });

            // Medium (3) - Multi-step
            for (let i = 0; i < 3; i++) {
                const l = randomInt(10, 15);
                const w = randomInt(5, 8);
                const p = 2 * (l + w);
                const a = l * w;
                qs.push({
                    text: `A garden is $${l}$ m by $${w}$ m. If you walk around it $2$ times, how many meters do you walk, and what is the garden's area?`,
                    correctAnswer: `${p * 2} m, ${a} sq m`,
                    solution: `Perimeter $= ${p}$ m. Distance for 2 laps $= ${p * 2}$ m. <br/> Area $= ${l} \\times ${w} = ${a}$ sq m.`,
                    shuffledOptions: [`${p * 2} m, ${a} sq m`, `${p} m, ${a} sq m`, `${p * 2} m, ${p} sq m`, `${a} m, ${p} sq m`].sort(() => Math.random() - 0.5)
                });
            }

            // Hard (4) - Complex
            qs.push({
                text: "A rectangular room floor is $6$ m by $4$ m. If square tiles of side $50$ cm are used, how many **tiles** are needed?",
                correctAnswer: "96",
                solution: `Floor Area $= 600 \\text{ cm} \\times 400 \\text{ cm} = 240,000 \\text{ sq cm}$. <br/> Tile Area $= 50 \\text{ cm} \\times 50 \\text{ cm} = 2,500 \\text{ sq cm}$. <br/> Tiles $= 240,000 \\div 2,500 = <strong>96$ tiles</strong>.`,
                visual: <div className="h-32 flex items-center justify-center font-black text-slate-300">Room: 6m x 4m | Tile: 50cm</div>,
                shuffledOptions: ["96", "48", "100", "24"].sort(() => Math.random() - 0.5)
            });

            qs.push({
                text: "Which rectangle has the **smallest perimeter** for a fixed area of $36$ sq cm?",
                correctAnswer: "6 cm × 6 cm square",
                solution: "Among rectangles with same area, the <strong>square</strong> (where sides are closest) has the shortest perimeter. For $A=36$, $6 \\times 6$ has $P=24$ (shortest).",
                shuffledOptions: ["6 cm × 6 cm square", "9 cm × 4 cm", "12 cm × 3 cm", "18 cm × 2 cm"].sort(() => Math.random() - 0.5)
            });

            qs.push({
                text: "A square paper of side $10$ cm is cut into $4$ smaller equal squares. What is the <strong>total perimeter</strong> of all $4$ smaller squares combined?",
                correctAnswer: "80 cm",
                solution: `Large square side $= 10$ cm. <br/> Smaller squares each have side $= 5$ cm. <br/> Perimeter of one small square $= 4 \\times 5 = 20$ cm. <br/> Total perimeter $= 4 \\times 20 = 80$ cm.`,
                visual: <div className="h-24 flex items-center justify-center font-black text-indigo-400">✂️ Cutting Paper</div>,
                shuffledOptions: ["80 cm", "40 cm", "20 cm", "100 cm"].sort(() => Math.random() - 0.5)
            });

            qs.push({
                text: "A wire of $40$ cm is bent into a rectangle of length $12$ cm. What is its **area**?",
                correctAnswer: "96 sq cm",
                solution: `Perimeter $= 40$. $2 \\times (L + W) = 40 \\rightarrow L + W = 20$. <br/> Since $L = 12$, $W = 8$ cm. <br/> Area $= 12 \\times 8 = 96$ sq cm.`,
                shuffledOptions: ["96 sq cm", "80 sq cm", "120 sq cm", "40 sq cm"].sort(() => Math.random() - 0.5)
            });

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
                time_spent_seconds: 20
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

    if (!currentQuestion && !showResults) return <div className="flex h-screen items-center justify-center text-2xl font-bold font-serif">Deep Thinking...</div>;

    if (showResults) {
        const score = Object.values(answers).filter(a => a.isCorrect).length;
        const p = Math.round((score / TOTAL_QUESTIONS) * 100);
        return (
            <div className="junior-practice-page results-view flex items-center justify-center min-h-screen bg-slate-50 font-serif">
                <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white p-16 rounded-[5rem] shadow-2xl flex flex-col items-center max-w-2xl w-full border-t-[20px] border-[#31326F]">
                    <div className="flex gap-4 mb-8">
                        {[1, 2, 3].map(i => <Star key={i} size={80} fill={p >= i * 33 ? "#FFD700" : "#EDF2F7"} color="#CBD5E0" />)}
                    </div>
                    <h1 className="text-6xl font-black text-[#31326F] mb-4 text-center">Chapter Mastered!</h1>
                    <Rocket className="text-indigo-400 mb-8" size={64} />
                    <div className="text-7xl font-black text-[#31326F] mb-12">{score} / {TOTAL_QUESTIONS}</div>
                    <button className="w-full py-6 bg-[#31326F] text-white rounded-[2rem] font-black text-3xl shadow-xl active:scale-95 transition-all" onClick={() => navigate(-1)}>Finish Chapter</button>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="junior-practice-page village-theme" style={{ fontFamily: '"Open Sans", sans-serif' }}>
            <header className="px-12 h-24 flex items-center justify-between">
                <button onClick={() => navigate(-1)} className="p-3 bg-white rounded-2xl border border-slate-100 shadow-sm"><X size={28} /></button>
                <div className="flex flex-col items-center">
                    <div className="bg-[#31326F] text-white px-8 py-2 rounded-full font-black text-xl mb-1">CHALLENGE MODE</div>
                    <div className="text-slate-400 font-bold">Question {qIndex + 1} of {TOTAL_QUESTIONS}</div>
                </div>
                <div className="font-black text-2xl text-slate-300 w-24 text-right">{Math.floor(timeElapsed / 60)}:{(timeElapsed % 60).toString().padStart(2, '0')}</div>
            </header>
            <main className="practice-content-wrapper flex items-center justify-center p-8">
                <div className="max-w-4xl w-full bg-white rounded-[4rem] p-16 shadow-2xl relative overflow-hidden">
                    <BrainCircuit size={150} className="absolute -top-10 -right-10 text-indigo-50 opacity-50 -z-0" />
                    <h2 className="text-4xl font-black text-[#31326F] text-center mb-16 relative z-10 leading-relaxed"><LatexContent html={currentQuestion.text} /></h2>
                    <div className="flex justify-center mb-16">{currentQuestion.visual}</div>
                    <div className="grid grid-cols-2 gap-8 relative z-10">
                        {shuffledOptions.map((opt, i) => (
                            <button
                                key={i} onClick={() => !isSubmitted && setSelectedOption(opt)} disabled={isSubmitted}
                                className={`p-10 text-2xl font-black rounded-3xl border-4 transition-all duration-300 ${selectedOption === opt ? 'border-[#31326F] bg-indigo-50 shadow-inner' : 'border-slate-50 bg-slate-50/20 hover:bg-white'} ${isSubmitted && opt === currentQuestion.correctAnswer ? 'bg-emerald-50 border-emerald-500 text-emerald-700' : ''} ${isSubmitted && selectedOption === opt && !isCorrect ? 'bg-red-50 border-red-500 text-red-700' : ''}`}
                            >
                                <LatexContent html={opt} />
                            </button>
                        ))}
                    </div>
                </div>
            </main>
            <footer className="h-28 px-16 flex items-center justify-between">
                <button className="text-2xl font-black text-red-500 hover:text-red-700 transition-colors" onClick={() => navigate(-1)}>Exit</button>
                <div className="flex gap-6">
                    {isSubmitted && <button className="px-12 py-4 bg-indigo-50 text-[#31326F] font-black rounded-3xl" onClick={() => setShowExplanationModal(true)}>See Solution</button>}
                    {isSubmitted ?
                        <button className="px-14 py-4 bg-[#31326F] text-white font-black rounded-[1.5rem] text-xl" onClick={handleNext}>{qIndex < TOTAL_QUESTIONS - 1 ? 'Next Challenge' : 'Finish'}</button> :
                        <button className="px-14 py-4 bg-[#4FB7B3] text-white font-black rounded-[1.5rem] text-xl" onClick={handleCheck} disabled={!selectedOption}>Submit Answer</button>
                    }
                </div>
            </footer>
            <ExplanationModal isOpen={showExplanationModal} isCorrect={isCorrect} correctAnswer={currentQuestion.correctAnswer} explanation={currentQuestion.solution} onClose={() => setShowExplanationModal(false)} onNext={() => { setShowExplanationModal(false); handleNext(); }} />
        </div>
    );
};

export default SkillApplicationProblemsArea;

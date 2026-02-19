import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { RefreshCw, Check, Eye, ChevronRight, ChevronLeft, X, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../../../../../services/api';
import LatexContent from '../../../../LatexContent';
import ExplanationModal from '../../../../ExplanationModal';
import '../../../../../pages/juniors/JuniorPracticeSession.css';

const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const ShapeOnGrid = ({ name, w, h, color = "#4FB7B3", cellSize = 25 }) => {
    const perimeter = 2 * (w + h);
    const area = w * h;
    return (
        <div className="flex flex-col items-center p-4 bg-white rounded-2xl border-2 border-slate-50 shadow-sm">
            <span className="mb-2 font-black text-[#31326F] text-lg">{name}</span>
            <div
                className="relative border-2 border-slate-200 bg-slate-50/20"
                style={{ width: w * cellSize, height: h * cellSize }}
            >
                <div className="absolute inset-0 grid" style={{ gridTemplateColumns: `repeat(${w}, 1fr)`, gridTemplateRows: `repeat(${h}, 1fr)` }}>
                    {[...Array(w * h)].map((_, i) => (
                        <div key={i} className={`border border-slate-100 ${color === 'none' ? '' : 'bg-indigo-400/20'}`}></div>
                    ))}
                </div>
            </div>
            <div className="mt-4 flex flex-col items-center">
                <span className="text-xs font-bold text-slate-400">Dimensions: {w} × {h}</span>
                <span className="text-sm font-black text-[#4FB7B3]">Perimeter: {perimeter} units</span>
            </div>
        </div>
    );
};

const CORRECT_MESSAGES = [
    "✨ You see the patterns perfectly! ✨",
    "🌟 Geometry guru! 🌟",
    "🎉 Correct! Different shapes, same boundary! 🎉",
    "✨ Brilliant observation! ✨",
    "🚀 Scaling your skills! 🚀"
];

const SamePerimeterDifferentShapes = () => {
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
    const SKILL_ID = 1165;
    const SKILL_NAME = "Same Perimeter with Different Shapes";
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

            // Easy (3) - Square vs Rectangle
            for (let i = 0; i < 3; i++) {
                const s = 4; // square side 4 -> P = 16
                const l = 5, w = 3; // rectangle 5x3 -> P = 16
                qs.push({
                    text: "A square of side $4$ cm and a rectangle of $5$ cm by $3$ cm are shown. Which statement is <strong>true</strong>?",
                    correctAnswer: "They have the same perimeter",
                    solution: `Square Perimeter $= 4 \\times 4 = 16$ cm. <br/> Rectangle Perimeter $= 2 \\times (5 + 3) = 16$ cm. <br/> Both have the <strong>same perimeter</strong>.`,
                    visual: <div className="flex gap-8 justify-center my-8"><ShapeOnGrid name="Square" w={4} h={4} /><ShapeOnGrid name="Rectangle" w={5} h={3} color="#F6AD55" /></div>,
                    shuffledOptions: ["Square has more perimeter", "Rectangle has more perimeter", "They have the same perimeter", "They have the same area"].sort(() => Math.random() - 0.5)
                });
            }

            // Medium (3) - Find the match
            for (let i = 0; i < 3; i++) {
                const targetP = 20;
                // Target: 2x(8+2) = 20
                qs.push({
                    text: `Which of these rectangles has a <strong>perimeter of $20$ units</strong>?`,
                    correctAnswer: "8 × 2",
                    solution: `Perimeter formula $= 2 \\times (L + W)$. <br/> For $8 \\times 2$: $2 \\times (8+2) = 20$. <br/> For $5 \\times 4$: $2 \\times (5+4) = 18$.`,
                    visual: <div className="flex gap-8 justify-center my-8"><ShapeOnGrid name="Option 1" w={8} h={2} color="#818CF8" /><ShapeOnGrid name="Option 2" w={5} h={4} color="#F472B6" /></div>,
                    shuffledOptions: ["8 × 2", "5 × 4", "6 × 3", "7 × 4"].sort(() => Math.random() - 0.5)
                });
            }

            // Hard (4) - Logic: Area vs Perimeter
            qs.push({
                text: "If two different shapes have the <strong>same perimeter</strong>, do they ALWAYS have the same area?",
                correctAnswer: "No, they can have different areas",
                solution: "Example: A square $4 \\times 4$ (Area = $16$) and a rectangle $5 \\times 3$ (Area = $15$) both have Perimeter $16$, but <strong>areas are different</strong>.",
                visual: <div className="h-24 flex items-center justify-center text-4xl font-black text-indigo-100 italic">P = 16 cm</div>,
                shuffledOptions: ["Yes, always", "No, they can have different areas", "Depends on the color", "Only if they are squares"].sort(() => Math.random() - 0.5)
            });

            for (let i = 0; i < 3; i++) {
                const p = 24;
                qs.push({
                    text: `How many different rectangles can be made using whole numbers with a <strong>perimeter of $24$ cm</strong>?`,
                    correctAnswer: "6",
                    solution: `Perimeter $24$ means $L + W = 12$. <br/> Pairs: $(11,1), (10,2), (9,3), (8,4), (7,5), (6,6)$. <br/> Total = <strong>6</strong> possibilities.`,
                    visual: <div className="h-24 flex items-center justify-center text-5xl font-black text-[#31326F] opacity-5">P = 24</div>,
                    shuffledOptions: ["4", "5", "6", "12"].sort(() => Math.random() - 0.5)
                });
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
            <div className="junior-practice-page results-view p-8 flex flex-col items-center justify-center min-h-screen">
                <div className="bg-white p-16 rounded-[4rem] shadow-2xl flex flex-col items-center max-w-2xl w-full border-t-[20px] border-[#31326F]">
                    <h1 className="text-6xl font-black text-[#31326F] mb-4 text-center leading-tight">Great Geometry Session!</h1>
                    <div className="flex gap-4 mb-12">{[1, 2, 3].map(i => <Star key={i} size={72} fill={percentage >= i * 33 ? "#FFD700" : "#EDF2F7"} color="#CBD5E0" />)}</div>
                    <div className="text-5xl font-black text-[#4FB7B3] mb-12">{score} / {TOTAL_QUESTIONS}</div>
                    <button className="w-full py-6 bg-[#31326F] text-white rounded-[2rem] font-black text-2xl hover:scale-[1.02] transition-all" onClick={() => navigate(-1)}>Back to Topics</button>
                </div>
            </div>
        );
    }

    return (
        <div className="junior-practice-page village-theme" style={{ fontFamily: '"Open Sans", sans-serif' }}>
            <header className="px-12 h-24 flex items-center justify-between">
                <button onClick={() => navigate(-1)} className="p-3 bg-white rounded-2xl border border-slate-50 shadow-sm"><X size={28} /></button>
                <div className="bg-white/90 px-10 py-3 rounded-full border border-slate-100 font-black text-2xl text-[#31326F]">Q{qIndex + 1} of {TOTAL_QUESTIONS}</div>
                <div className="font-black text-2xl text-slate-400 w-24 text-right">
                    {Math.floor(timeElapsed / 60)}:{(timeElapsed % 60).toString().padStart(2, '0')}
                </div>
            </header>
            <main className="practice-content-wrapper flex items-center justify-center p-8">
                <div className="max-w-5xl w-full bg-white rounded-[4rem] p-16 shadow-2xl">
                    <h2 className="text-4xl font-black text-[#31326F] text-center mb-12 leading-relaxed"><LatexContent html={currentQuestion.text} /></h2>
                    <div className="mb-12 transform scale-110">{currentQuestion.visual}</div>
                    <div className="grid grid-cols-2 gap-8">
                        {shuffledOptions.map((opt, i) => (
                            <button
                                key={i} onClick={() => !isSubmitted && setSelectedOption(opt)} disabled={isSubmitted}
                                className={`p-10 text-3xl font-black rounded-[2.5rem] border-4 transition-all duration-300 ${selectedOption === opt ? 'border-[#31326F] bg-indigo-50 shadow-inner' : 'border-slate-50 bg-slate-50/30 hover:bg-white hover:border-indigo-100 shadow-sm'} ${isSubmitted && opt === currentQuestion.correctAnswer ? 'bg-emerald-50 border-emerald-500 text-emerald-700' : ''} ${isSubmitted && selectedOption === opt && !isCorrect ? 'bg-red-50 border-red-500 text-red-700' : ''}`}
                            >
                                <LatexContent html={opt} />
                            </button>
                        ))}
                    </div>
                </div>
            </main>
            <footer className="h-28 px-16 flex items-center justify-between">
                <button className="text-2xl font-black text-red-500" onClick={() => navigate(-1)}>Exit</button>
                <div className="flex gap-6">
                    {isSubmitted && <button className="px-12 py-4 bg-indigo-50 text-[#31326F] font-black rounded-3xl" onClick={() => setShowExplanationModal(true)}>See Why</button>}
                    {isSubmitted ?
                        <button className="px-14 py-4 bg-[#31326F] text-white font-black rounded-3xl text-xl" onClick={handleNext}>{qIndex < TOTAL_QUESTIONS - 1 ? 'Next' : 'Done'}</button> :
                        <button className="px-14 py-4 bg-[#4FB7B3] text-white font-black rounded-3xl text-xl" onClick={handleCheck} disabled={!selectedOption}>Submit</button>
                    }
                </div>
            </footer>
            <ExplanationModal isOpen={showExplanationModal} isCorrect={isCorrect} correctAnswer={currentQuestion.correctAnswer} explanation={currentQuestion.solution} onClose={() => setShowExplanationModal(false)} onNext={() => { setShowExplanationModal(false); handleNext(); }} />
        </div>
    );
};

export default SamePerimeterDifferentShapes;

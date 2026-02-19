import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { RefreshCw, Check, Eye, ChevronRight, ChevronLeft, X, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../../../../../services/api';
import LatexContent from '../../../../LatexContent';
import ExplanationModal from '../../../../ExplanationModal';
import '../../../../../pages/juniors/JuniorPracticeSession.css';

const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const GridPerimeter = ({ points, cellSize = 30, color = "#4FB7B3" }) => {
    // Basic rectangle on grid for perimeter counting
    const minX = Math.min(...points.map(p => p[0]));
    const minY = Math.min(...points.map(p => p[1]));
    const maxX = Math.max(...points.map(p => p[0]));
    const maxY = Math.max(...points.map(p => p[1]));

    const w = (maxX - minX + 1);
    const h = (maxY - minY + 1);

    return (
        <div className="flex flex-col items-center my-8">
            <div className="relative border-4 border-[#31326F] rounded-lg shadow-lg overflow-hidden bg-white" style={{ width: w * cellSize, height: h * cellSize }}>
                <div className="absolute inset-0 grid" style={{ gridTemplateColumns: `repeat(${w}, 1fr)`, gridTemplateRows: `repeat(${h}, 1fr)` }}>
                    {[...Array(w * h)].map((_, i) => (
                        <div key={i} className="border border-slate-100 flex items-center justify-center bg-indigo-50/30"></div>
                    ))}
                </div>
                {/* Visual boundary highlight */}
                <div className="absolute inset-0 border-4 border-dashed border-[#4FB7B3] opacity-60"></div>
            </div>
            <div className="mt-4 text-sm text-slate-500 font-bold italic italic">Each grid square side = 1 cm</div>
        </div>
    );
};

const DimensionPerimeterObject = ({ w, h, unit = "cm" }) => {
    return (
        <div className="flex flex-col items-center my-12">
            <div
                className="relative border-[6px] border-[#31326F] bg-white rounded-xl shadow-xl flex items-center justify-center transition-all hover:scale-105"
                style={{ width: `${w * 30}px`, height: `${h * 30}px`, maxWidth: '300px', maxHeight: '200px' }}
            >
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-[#31326F] text-white px-3 py-1 rounded-full font-black text-sm">{w} {unit}</div>
                <div className="absolute top-1/2 -right-16 -translate-y-1/2 bg-[#31326F] text-white px-3 py-1 rounded-full font-black text-sm">{h} {unit}</div>
            </div>
        </div>
    );
};

const IrregularPerimeter = ({ path, width, height, cellSize = 30 }) => {
    return (
        <div className="flex flex-col items-center my-8">
            <svg width={width * cellSize + 10} height={height * cellSize + 10} className="bg-white">
                <path
                    d={path}
                    fill="#E0F2FE"
                    stroke="#31326F"
                    strokeWidth="4"
                    strokeLinejoin="round"
                />
                {/* Optional side labels could go here */}
            </svg>
            <div className="mt-4 text-sm text-slate-500 font-bold italic">Calculate the length of the entire boundary</div>
        </div>
    );
}

const CORRECT_MESSAGES = [
    "✨ Perimeter perfection! ✨",
    "🌟 Boundary master! 🌟",
    "🎉 Correct! You measured that border perfectly! 🎉",
    "✨ Brilliant visualization! ✨",
    "🚀 Scaling through geometry! 🚀"
];

const FindingPerimeter = () => {
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
    const SKILL_ID = 1163;
    const SKILL_NAME = "Finding Perimeter";
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

            // Easy (3) - Grid Counting
            for (let i = 0; i < 3; i++) {
                const w = randomInt(4, 7);
                const h = randomInt(3, 5);
                const perimeter = 2 * (w + h);
                const pts = [];
                for (let x = 0; x < w; x++) for (let y = 0; y < h; y++) pts.push([x, y]);

                qs.push({
                    text: "Find the <strong>perimeter</strong> of the rectangle shown on the grid.",
                    correctAnswer: `${perimeter} cm`,
                    solution: `Perimeter is the total length of the boundary. <br/> Top side = $${w}$ cm, Bottom side = $${w}$ cm, Left side = $${h}$ cm, Right side = $${h}$ cm. <br/> Total = $${w} + ${h} + ${w} + ${h} = ${perimeter}$ cm.`,
                    visual: <GridPerimeter points={pts} />,
                    shuffledOptions: [`${perimeter} cm`, `${w * h} cm`, `${perimeter + 2} cm`, `${perimeter - 2} cm`].sort(() => Math.random() - 0.5)
                });
            }

            // Medium (3) - Formulas
            for (let i = 0; i < 3; i++) {
                const w = randomInt(8, 15);
                const h = randomInt(5, 10);
                const perimeter = 2 * (w + h);
                qs.push({
                    text: `A rectangle has a length of $${w}$ cm and a width of $${h}$ cm. What is its <strong>perimeter</strong>?`,
                    correctAnswer: `${perimeter} cm`,
                    solution: `Perimeter of a rectangle is: $2 \\times (\\text{Length} + \\text{Width})$. <br/> $2 \\times (${w} + ${h}) = 2 \\times ${w + h} = ${perimeter}$ cm.`,
                    visual: <DimensionPerimeterObject w={6} h={4} />,
                    shuffledOptions: [`${perimeter} cm`, `${w * h} cm`, `${perimeter + 10} cm`, `${w + h} cm`].sort(() => Math.random() - 0.5)
                });
            }

            // Hard (4) - Irregular/L-shapes or missing side
            for (let i = 0; i < 4; i++) {
                if (i % 2 === 0) {
                    // L-shape
                    const w1 = 3, h1 = 5, w2 = 4, h2 = 2; // Fixed L-shape
                    const perimeter = (w1 + h1) + (w2 + h2) + (h1 - h2) + (w1 + w2); // This is just the bounding box perimeter
                    const actualPerim = (w1 + w2) + (h1) + (w2) + (h1 - h2) + (w1) + (h2); // simpler L-shape logic: it's just the perimeter of the enclosing rectangle if convex
                    // Let's just make it explicit:
                    // Top: w1, Left: h1, Bottom: w1+w2, Right: h2, and etc.
                    // For an L-shape made of two rectangles (w1 x h1) and (w2 x h2 attached at bottom right)
                    // perimeter = w1 + (h1-h2) + w2 + h2 + (w1+w2) + h1
                    const p = 3 + 3 + 4 + 2 + 7 + 5; // example values
                    qs.push({
                        text: "Calculate the <strong>perimeter</strong> of this L-shaped figure.",
                        correctAnswer: "24 cm",
                        solution: `Add all side lengths: $3 + 3 + 4 + 2 + 7 + 5 = 24$ cm.`,
                        visual: <IrregularPerimeter path="M 5,5 L 95,5 L 95,95 L 215,95 L 215,155 L 5,155 Z" width={8} height={6} />,
                        shuffledOptions: ["24 cm", "20 cm", "30 cm", "28 cm"].sort(() => Math.random() - 0.5)
                    });
                } else {
                    const p = randomInt(30, 50) * 2;
                    const l = randomInt(10, 20);
                    const w = (p / 2) - l;
                    qs.push({
                        text: `The perimeter of a rectangle is $${p}$ cm. If its length is $${l}$ cm, what is its <strong>width</strong>?`,
                        correctAnswer: `${w} cm`,
                        solution: `Perimeter $= 2 \\times (L + W)$ <br/> $${p} = 2 \\times (${l} + W)$ <br/> $${p / 2} = ${l} + W$ <br/> $W = ${p / 2} - ${l} = <strong>${w}$ cm</strong>.`,
                        visual: <div className="h-32 flex items-center justify-center text-5xl font-black text-[#31326F] opacity-10">P = {p}</div>,
                        shuffledOptions: [`${w} cm`, `${w + 5} cm`, `${l} cm`, `${p / 2} cm`].sort(() => Math.random() - 0.5)
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
            <div className="junior-practice-page results-view p-8 flex flex-col items-center">
                <div className="flex gap-4 mb-8 mt-12">{[1, 2, 3].map(i => <Star key={i} size={80} fill={percentage >= i * 33 ? "#FFD700" : "#EDF2F7"} color="#CBD5E0" />)}</div>
                <h1 className="text-6xl font-black text-[#31326F] mb-4">Completed!</h1>
                <div className="text-4xl font-black text-slate-400 mb-12">{score} / {TOTAL_QUESTIONS} Correct</div>
                <button className="px-20 py-6 bg-[#31326F] text-white rounded-[2rem] font-black text-3xl shadow-xl hover:scale-105 transition-all" onClick={() => navigate(-1)}>Finish</button>
            </div>
        );
    }

    return (
        <div className="junior-practice-page village-theme" style={{ fontFamily: '"Open Sans", sans-serif' }}>
            <header className="junior-practice-header flex justify-between items-center px-12 h-24">
                <button onClick={() => navigate(-1)} className="bg-white p-2 rounded-xl border border-slate-100 shadow-sm"><X size={28} /></button>
                <div className="bg-white/90 backdrop-blur px-8 py-3 rounded-full border border-slate-100 text-[#31326F] font-black text-2xl shadow-md">Question {qIndex + 1} / {TOTAL_QUESTIONS}</div>
                <div className="bg-white/50 px-4 py-2 rounded-xl font-bold text-xl">{Math.floor(timeElapsed / 60)}:{(timeElapsed % 60).toString().padStart(2, '0')}</div>
            </header>
            <main className="practice-content-wrapper flex items-center justify-center p-6">
                <div className="max-w-4xl w-full bg-white rounded-[4rem] p-16 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-bl-[8rem] -z-10"></div>
                    <h2 className="text-4xl font-black text-[#31326F] text-center mb-12 leading-tight"><LatexContent html={currentQuestion.text} /></h2>
                    <div className="mb-12 transition-all duration-500">{currentQuestion.visual}</div>
                    <div className="grid grid-cols-2 gap-8">
                        {shuffledOptions.map((opt, i) => (
                            <button
                                key={i} onClick={() => !isSubmitted && setSelectedOption(opt)} disabled={isSubmitted}
                                className={`p-10 text-3xl font-black rounded-[2.5rem] border-4 transition-all duration-300 transform hover:scale-[1.02] ${selectedOption === opt ? 'border-[#31326F] bg-indigo-50' : 'border-slate-50 bg-slate-50/20 hover:bg-white'} ${isSubmitted && opt === currentQuestion.correctAnswer ? 'bg-emerald-50 border-emerald-500 text-emerald-700' : ''} ${isSubmitted && selectedOption === opt && !isCorrect ? 'bg-red-50 border-red-500 text-red-700' : ''}`}
                            >
                                <LatexContent html={opt} />
                            </button>
                        ))}
                    </div>
                </div>
            </main>
            <footer className="h-28 bg-white/60 backdrop-blur-xl flex items-center justify-between px-16">
                <button className="text-red-500 font-black text-2xl" onClick={() => navigate(-1)}>Exit</button>
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

export default FindingPerimeter;

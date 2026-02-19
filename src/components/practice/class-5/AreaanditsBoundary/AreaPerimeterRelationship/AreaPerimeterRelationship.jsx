import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { RefreshCw, Check, Eye, ChevronRight, ChevronLeft, X, Star, Scaling, MoveDiagonal } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../../../../../services/api';
import LatexContent from '../../../../LatexContent';
import ExplanationModal from '../../../../ExplanationModal';
import '../../../../../pages/juniors/JuniorPracticeSession.css';

const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const RelationshipVisual = ({ type, value }) => {
    return (
        <div className="flex flex-col items-center justify-center my-12">
            {type === 'scaling' ? (
                <div className="flex items-center gap-12">
                    <div className="w-16 h-16 border-4 border-[#31326F] bg-indigo-50 flex items-center justify-center font-bold">Side x1</div>
                    <ChevronRight size={40} className="text-slate-300" />
                    <motion.div
                        initial={{ scale: 0.8 }}
                        animate={{ scale: [0.8, 1.2, 0.8] }}
                        transition={{ duration: 3, repeat: Infinity }}
                        className="w-32 h-32 border-4 border-[#31326F] bg-indigo-100 flex items-center justify-center font-black text-2xl"
                    >Side x2</motion.div>
                </div>
            ) : (
                <div className="flex items-center gap-8">
                    <div className="w-32 h-16 border-4 border-emerald-500 bg-emerald-50 flex flex-col items-center justify-center text-xs font-bold">
                        <span>P: 40 cm</span>
                        <span>A: 400 sq cm</span>
                    </div>
                    <MoveDiagonal className="text-slate-300" />
                    <div className="w-16 h-32 border-4 border-amber-500 bg-amber-50 flex flex-col items-center justify-center text-xs font-bold">
                        <span>P: 40 cm</span>
                        <span>A: 200 sq cm</span>
                    </div>
                </div>
            )}
        </div>
    );
};

const CORRECT_MESSAGES = [
    "✨ Brilliant relationship logic! ✨",
    "🌟 Geometry expert! 🌟",
    "🎉 Correct! You understand the link perfectly! 🎉",
    "✨ Sharp observation! ✨",
    "🚀 Scaling up your geometry skills! 🚀"
];

const AreaPerimeterRelationship = () => {
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
    const SKILL_ID = 1167;
    const SKILL_NAME = "Relationship Between Area and Perimeter";
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

            // Easy (3) - Compare fixed perimeter areas
            qs.push({
                text: "Two rectangles have the <strong>same perimeter</strong>. Rectangle A is a square ($5 \\times 5$ cm), and Rectangle B is $8 \\times 2$ cm. Which has a <strong>larger area</strong>?",
                correctAnswer: "Rectangle A (Square)",
                solution: `Square Area $= 5 \\times 5 = 25$ sq cm. <br/> Rectangle Area $= 8 \\times 2 = 16$ sq cm. <br/> The <strong>Square</strong> has a larger area. (Rule: Squares maximize area for a given perimeter!)`,
                visual: <RelationshipVisual type="comparison" />,
                shuffledOptions: ["Rectangle A (Square)", "Rectangle B", "They have the same area", "Depends on height"].sort(() => Math.random() - 0.5)
            });

            for (let i = 0; i < 2; i++) {
                qs.push({
                    text: "Can two shapes have the <strong>same area</strong> but <strong>different perimeters</strong>?",
                    correctAnswer: "Yes",
                    solution: "Yes! For example, a $4 \\times 4$ square and an $8 \\times 2$ rectangle both have area $16$ sq cm, but perimeters are $16$ cm and $20$ cm respectively.",
                    visual: <div className="h-24 flex items-center justify-center font-black text-indigo-200">A = 16 sq units</div>,
                    shuffledOptions: ["Yes", "No", "Only if they are circles", "Only if they are triangles"].sort(() => Math.random() - 0.5)
                });
            }

            // Medium (3) - Scaling logic
            qs.push({
                text: "If you <strong>double the side</strong> of a square from $3$ cm to $6$ cm, what happens to its <strong>perimeter</strong>?",
                correctAnswer: "It doubles (x2)",
                solution: `Original $P = 4 \\times 3 = 12$ cm. <br/> New $P = 4 \\times 6 = 24$ cm. <br/> The perimeter <strong>doubles</strong>.`,
                visual: <RelationshipVisual type="scaling" />,
                shuffledOptions: ["It doubles (x2)", "It triples (x3)", "It stays the same", "It quadruples (x4)"].sort(() => Math.random() - 0.5)
            });

            qs.push({
                text: "If you <strong>double the side</strong> of a square, what happens to its <strong>area</strong>?",
                correctAnswer: "It quadruples (x4)",
                solution: `Original $A = 3 \\times 3 = 9$. <br/> New $A = 6 \\times 6 = 36$. <br/> Since $36$ is $4 \\times 9$, the area <strong>quadruples (x4)</strong>.`,
                visual: <RelationshipVisual type="scaling" />,
                shuffledOptions: ["It doubles (x2)", "It quadruples (x4)", "It stays the same", "It increases by half"].sort(() => Math.random() - 0.5)
            });

            qs.push({
                text: "Among all rectangles with a perimeter of $20$ cm, which one will have the **maximum possible area**?",
                correctAnswer: "A square of side 5 cm",
                solution: "A square is the special rectangle that gives the largest area for any given perimeter. For $P=20$, sides sum to $10$. $5 \\times 5 = 25$ is the max.",
                visual: <div className="h-28 flex items-center justify-center font-black text-emerald-400">MAXIMIZE AREA</div>,
                shuffledOptions: ["A square of side 5 cm", "A rectangle of 9 × 1 cm", "A rectangle of 6 × 4 cm", "A rectangle of 8 × 2 cm"].sort(() => Math.random() - 0.5)
            });

            // Hard (4) - Calculations & Multi-step
            qs.push({
                text: "A square field has an area of $100$ sq m. What is its <strong>perimeter</strong>?",
                correctAnswer: "40 m",
                solution: `Step 1: Find side. Since $Area = 100$, Side $= 10$ m (because $10 \\times 10 = 100$). <br/> Step 2: Calculate perimeter. $P = 4 \\times S = 4 \\times 10 = <strong>40$ m</strong>.`,
                visual: <RelationshipVisual type="scaling" />,
                shuffledOptions: ["40 m", "100 m", "20 m", "50 m"].sort(() => Math.random() - 0.5)
            });

            qs.push({
                text: "If a rectangle has a fixed area of $24$ sq cm, which dimensions will give the **shortest possible perimeter**?",
                correctAnswer: "Dimensions closest to each other",
                solution: "The closer the sides are in length (closer to a square), the shorter the perimeter for a fixed area.",
                visual: <div className="h-24 flex items-center justify-center font-black text-amber-300 italic">Area = 24</div>,
                shuffledOptions: ["12 × 2", "24 × 1", "Dimensions closest to each other", "Dimensions furthest apart"].sort(() => Math.random() - 0.5)
            });

            // Two more hard
            for (let i = 0; i < 2; i++) {
                qs.push({
                    text: "A rectangular park is $20$ m long and $10$ m wide. If you increase its length by $5$ m and decrease its width by $5$ m, what happens to the **perimeter**?",
                    correctAnswer: "It stays the same",
                    solution: `Original $P = 2 \\times (20 + 10) = 60$ m. <br/> New $P = 2 \\times (25 + 5) = 60$ m. <br/> The boundary length <strong>stays the same</strong>.`,
                    visual: <div className="h-24 flex items-center justify-center font-black text-[#31326F] opacity-10">20x10 -> 25x5</div>,
                    shuffledOptions: ["It increases", "It decreases", "It stays the same", "It doubles"].sort(() => Math.random() - 0.5)
                });
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
            <div className="junior-practice-page results-view flex items-center justify-center min-h-screen bg-slate-50">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-xl w-full bg-white p-12 rounded-[5rem] shadow-2xl flex flex-col items-center">
                    <StarsDisplay percentage={percentage} />
                    <h1 className="text-6xl font-black text-[#31326F] mt-8 mb-4">Bravo!</h1>
                    <p className="text-2xl font-bold text-slate-400 mb-12">Relationship Master</p>
                    <div className="text-7xl font-black text-[#31326F] mb-12">{score} / {TOTAL_QUESTIONS}</div>
                    <button className="w-full py-6 bg-[#31326F] text-white rounded-[2rem] font-black text-2xl shadow-xl active:scale-95 transition-all" onClick={() => navigate(-1)}>Exit</button>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="junior-practice-page village-theme" style={{ fontFamily: '"Open Sans", sans-serif' }}>
            <header className="px-12 h-24 flex items-center justify-between">
                <button onClick={() => navigate(-1)} className="p-3 bg-white rounded-2xl border border-slate-100"><X size={28} /></button>
                <div className="bg-white/90 backdrop-blur px-8 py-3 rounded-full border border-slate-100 text-[#31326F] font-black text-2xl">Q{qIndex + 1} / {TOTAL_QUESTIONS}</div>
                <div className="font-black text-xl text-slate-400 w-24 text-right">{Math.floor(timeElapsed / 60)}:{(timeElapsed % 60).toString().padStart(2, '0')}</div>
            </header>
            <main className="practice-content-wrapper flex items-center justify-center p-8">
                <div className="max-w-4xl w-full bg-white rounded-[4rem] p-16 shadow-2xl relative">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-bl-[8rem] -z-10"></div>
                    <h2 className="text-4xl font-black text-[#31326F] text-center mb-12 leading-tight"><LatexContent html={currentQuestion.text} /></h2>
                    <div className="flex justify-center mb-12">{currentQuestion.visual}</div>
                    <div className="grid grid-cols-2 gap-8">
                        {shuffledOptions.map((opt, i) => (
                            <button
                                key={i} onClick={() => !isSubmitted && setSelectedOption(opt)} disabled={isSubmitted}
                                className={`p-10 text-2xl font-black rounded-3xl border-4 transition-all duration-300 ${selectedOption === opt ? 'border-[#31326F] bg-indigo-50' : 'border-slate-50 bg-slate-50/20 hover:bg-white'} ${isSubmitted && opt === currentQuestion.correctAnswer ? 'bg-emerald-50 border-emerald-500 text-emerald-700' : ''} ${isSubmitted && selectedOption === opt && !isCorrect ? 'bg-red-50 border-red-500 text-red-700' : ''}`}
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
                    {isSubmitted && <button className="px-12 py-4 bg-indigo-50 text-[#31326F] font-black rounded-3xl shadow-sm" onClick={() => setShowExplanationModal(true)}>Explanation</button>}
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

const StarsDisplay = ({ percentage }) => (
    <div className="flex gap-4">
        {[1, 2, 3].map(i => <motion.div key={i} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: i * 0.2 }}>
            <Star size={80} fill={percentage >= i * 33 ? "#FFD700" : "#EDF2F7"} color="#CBD5E0" />
        </motion.div>)}
    </div>
);

export default AreaPerimeterRelationship;

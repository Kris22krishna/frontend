import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { RefreshCw, Check, Eye, ChevronRight, ChevronLeft, X, Star, Ruler, Move } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../../../../../services/api';
import LatexContent from '../../../../LatexContent';
import ExplanationModal from '../../../../ExplanationModal';
import '../../../../../pages/juniors/JuniorPracticeSession.css';

const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const BoundaryVisual = ({ type, pValue }) => {
    return (
        <div className="flex flex-col items-center my-12">
            {type === 'wire' ? (
                <div className="relative group">
                    <motion.div
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="w-64 h-40 border-[8px] border-dashed border-slate-300 rounded-[2rem] flex items-center justify-center"
                    >
                        <Ruler className="text-slate-300 opacity-20" size={100} />
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-6 py-2 rounded-full border-2 border-slate-100 font-black text-[#31326F] shadow-lg">
                            Length = {pValue} cm
                        </div>
                    </motion.div>
                </div>
            ) : (
                <div className="w-80 h-48 bg-emerald-50 border-4 border-emerald-600 rounded-3xl relative overflow-hidden shadow-xl">
                    <div className="absolute inset-0 border-8 border-amber-700 opacity-40"></div>
                    <div className="flex items-center justify-center h-full">
                        <span className="font-black text-emerald-800 text-2xl uppercase tracking-widest">Fenced Area</span>
                    </div>
                    <div className="absolute -bottom-4 right-4 text-emerald-600 opacity-20"><Move size={120} /></div>
                </div>
            )}
        </div>
    );
};

const CORRECT_MESSAGES = [
    "✨ Excellent boundary logic! ✨",
    "🌟 Ruler master! 🌟",
    "🎉 Correct! You understand perimeter perfectly! 🎉",
    "✨ Brilliant visualization! ✨",
    "🚀 Scaling up your geometry skills! 🚀"
];

const PerimeterAsBoundary = () => {
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
    const SKILL_ID = 1164;
    const SKILL_NAME = "Understand Perimeter as Boundary Length";
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

            // Easy (3) - Basic definition/identification
            qs.push({
                text: "The total length of the <strong>outer boundary</strong> of a closed figure is called its...",
                correctAnswer: "Perimeter",
                solution: "The boundary length of any closed shape is specifically known as its <strong>Perimeter</strong>.",
                visual: <BoundaryVisual type="wire" pValue="?" />,
                shuffledOptions: ["Perimeter", "Area", "Width", "Volume"].sort(() => Math.random() - 0.5)
            });

            qs.push({
                text: "If a thread used to form a shape is $15$ cm long, what is the <strong>perimeter</strong> of that shape?",
                correctAnswer: "15 cm",
                solution: "Since the entire thread forms the boundary, the length of the thread is equal to the perimeter. So and it is <strong>15 cm</strong>.",
                visual: <BoundaryVisual type="wire" pValue="15" />,
                shuffledOptions: ["15 cm", "30 cm", "7.5 cm", "15 sq cm"].sort(() => Math.random() - 0.5)
            });

            qs.push({
                text: "To find how much <strong>fencing</strong> is needed for a park, we need to calculate its...",
                correctAnswer: "Perimeter",
                solution: "Fencing goes around the boundary, and boundary length is <strong>Perimeter</strong>.",
                visual: <BoundaryVisual type="fencing" />,
                shuffledOptions: ["Perimeter", "Area", "Weight", "Length only"].sort(() => Math.random() - 0.5)
            });

            // Medium (3) - Comparison/Logic
            for (let i = 0; i < 3; i++) {
                const p = randomInt(10, 25);
                qs.push({
                    text: `Shape A and Shape B are both made from the <strong>same $${p}$ cm piece of string</strong>. Which shape has a larger perimeter?`,
                    correctAnswer: "They have the same perimeter",
                    solution: "If both shapes are made from the same string, their boundary length (perimeter) must be equal to the string length ($${p}$ cm).",
                    visual: <div className="flex gap-8 justify-center my-8"><div className="w-16 h-16 border-2 border-slate-300 rounded-full"></div><div className="w-16 h-16 border-2 border-slate-300"></div></div>,
                    shuffledOptions: ["Shape A", "Shape B", "They have the same perimeter", "Depends on area"].sort(() => Math.random() - 0.5)
                });
            }

            // Hard (4) - Modification logic
            qs.push({
                text: "A square has a perimeter of $20$ cm. If we <strong>cut a small square from its corner</strong>, what happens to the perimeter of the new shape?",
                correctAnswer: "It stays the same",
                solution: "When you cut a corner, the two new sides created equal the two old side parts removed. So the total boundary length <strong>stays the same</strong>.",
                visual: <div className="h-32 flex items-center justify-center font-black text-indigo-300">✂️ Square Corner</div>,
                shuffledOptions: ["It increases", "It decreases", "It stays the same", "It doubles"].sort(() => Math.random() - 0.5)
            });

            qs.push({
                text: "A rectangular field has a perimeter of $100$ m. If the <strong>fence is moved outward by $1$ m</strong> on all sides, the perimeter will...",
                correctAnswer: "Increase by 8 m",
                solution: "Adding $1$m on all $4$ corners adds $1+1=2$m to both length and width. New $P = 2 \\times ((L+2) + (W+2)) = 2 \\times (L+W) + 8$. So it <strong>increases by 8m</strong>.",
                visual: <div className="h-32 flex items-center justify-center font-black text-indigo-300">Expanding Fence</div>,
                shuffledOptions: ["Increase by 4 m", "Increase by 8 m", "Stay the same", "Increase by 1 m"].sort(() => Math.random() - 0.5)
            });

            // Add 2 more hard
            for (let i = 0; i < 2; i++) {
                qs.push({
                    text: "Which of these figures will have the <strong>longest boundary</strong> if all small squares are $1$ cm?",
                    correctAnswer: "A long thin rectangle",
                    solution: "Long, thin shapes have more boundary for the same number of squares compared to compact shapes like squares.",
                    visual: <div className="flex gap-4 justify-center py-4"><div className="w-20 h-4 border border-slate-200 bg-slate-50"></div><div className="w-8 h-8 border border-slate-200 bg-slate-50"></div></div>,
                    shuffledOptions: ["A compact square", "A long thin rectangle", "They are always same", "A small triangle"].sort(() => Math.random() - 0.5)
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
                time_spent_seconds: 12
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
            <div className="junior-practice-page results-view flex flex-col items-center justify-center h-screen bg-slate-50">
                <div className="bg-white p-12 rounded-[4rem] shadow-2xl flex flex-col items-center max-w-2xl w-full">
                    <div className="flex gap-4 mb-8 text-amber-400">{[1, 2, 3].map(i => <Star key={i} size={64} fill={percentage >= i * 33 ? "currentColor" : "none"} />)}</div>
                    <h1 className="text-6xl font-black text-[#31326F] mb-4">Well Done!</h1>
                    <p className="text-2xl font-bold text-slate-400 mb-12">You've mastered Boundary concepts!</p>
                    <div className="text-5xl font-black text-[#4FB7B3] mb-12">{score} / {TOTAL_QUESTIONS}</div>
                    <button className="w-full py-6 bg-[#31326F] text-white rounded-[2rem] font-black text-2xl" onClick={() => navigate(-1)}>Exit Practice</button>
                </div>
            </div>
        );
    }

    return (
        <div className="junior-practice-page village-theme" style={{ fontFamily: '"Open Sans", sans-serif' }}>
            <header className="junior-practice-header px-12 h-24 flex items-center justify-between">
                <button onClick={() => navigate(-1)} className="p-3 bg-white rounded-2xl shadow-sm border border-slate-100"><X size={28} /></button>
                <div className="flex-1 flex justify-center">
                    <div className="bg-[#31326F]/5 px-10 py-3 rounded-full font-black text-2xl text-[#31326F]">Question {qIndex + 1} of {TOTAL_QUESTIONS}</div>
                </div>
                <div className="font-black text-xl text-slate-400 w-24 text-right">{formatTime(timeElapsed)}</div>
            </header>
            <main className="practice-content-wrapper flex items-center justify-center p-8">
                <div className="max-w-4xl w-full bg-white rounded-[4rem] p-16 shadow-2xl border-t-[16px] border-[#4FB7B3]">
                    <h2 className="text-4xl font-black text-[#31326F] text-center mb-12 leading-snug"><LatexContent html={currentQuestion.text} /></h2>
                    <div className="mb-12 scale-110">{currentQuestion.visual}</div>
                    <div className="grid grid-cols-2 gap-8">
                        {shuffledOptions.map((opt, i) => (
                            <button
                                key={i} onClick={() => !isSubmitted && setSelectedOption(opt)} disabled={isSubmitted}
                                className={`p-10 text-3xl font-black rounded-[2.5rem] border-4 transition-all duration-300 ${selectedOption === opt ? 'border-[#31326F] bg-indigo-50 shadow-inner' : 'border-slate-50 bg-slate-50/20 hover:border-slate-100'} ${isSubmitted && opt === currentQuestion.correctAnswer ? 'bg-emerald-50 border-emerald-500 text-emerald-700' : ''} ${isSubmitted && selectedOption === opt && !isCorrect ? 'bg-red-50 border-red-500 text-red-700' : ''}`}
                            >
                                <LatexContent html={opt} />
                            </button>
                        ))}
                    </div>
                </div>
            </main>
            <footer className="h-28 px-16 flex items-center justify-between bg-white/40">
                <button className="font-black text-2xl text-red-500" onClick={() => navigate(-1)}>Quit</button>
                <div className="flex gap-6">
                    {isSubmitted && <button className="px-12 py-4 bg-indigo-100 text-[#31326F] font-black rounded-3xl" onClick={() => setShowExplanationModal(true)}>Explanation</button>}
                    {isSubmitted ?
                        <button className="px-14 py-4 bg-[#31326F] text-white font-black rounded-[1.5rem] text-xl" onClick={handleNext}>{qIndex < TOTAL_QUESTIONS - 1 ? 'Next Question' : 'Finish'}</button> :
                        <button className="px-14 py-4 bg-[#4FB7B3] text-white font-black rounded-[1.5rem] text-xl" onClick={handleCheck} disabled={!selectedOption}>Submit Answer</button>
                    }
                </div>
            </footer>
            <ExplanationModal isOpen={showExplanationModal} isCorrect={isCorrect} correctAnswer={currentQuestion.correctAnswer} explanation={currentQuestion.solution} onClose={() => setShowExplanationModal(false)} onNext={() => { setShowExplanationModal(false); handleNext(); }} />
        </div>
    );
};

const formatTime = (s) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`;

export default PerimeterAsBoundary;

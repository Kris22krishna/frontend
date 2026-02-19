import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { RefreshCw, Check, Eye, ChevronRight, ChevronLeft, X, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../../../../../services/api';
import LatexContent from '../../../../LatexContent';
import ExplanationModal from '../../../../ExplanationModal';
import '../../../../../pages/juniors/JuniorPracticeSession.css';

const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const GridShape = ({ points, color = "#4FB7B3", gridW = 6, gridH = 6, cellSize = 25, label = "" }) => {
    // points is an array of [x, y] coordinates
    return (
        <div className="flex flex-col items-center">
            {label && <div className="mb-2 font-black text-[#31326F]">{label}</div>}
            <svg width={gridW * cellSize} height={gridH * cellSize} className="bg-white border border-slate-200">
                {/* Background Grid */}
                {[...Array(gridW + 1)].map((_, i) => (
                    <line key={`v-${i}`} x1={i * cellSize} y1={0} x2={i * cellSize} y2={gridH * cellSize} stroke="#f1f5f9" strokeWidth="1" />
                ))}
                {[...Array(gridH + 1)].map((_, i) => (
                    <line key={`h-${i}`} x1={0} y1={i * cellSize} x2={gridW * cellSize} y2={i * cellSize} stroke="#f1f5f9" strokeWidth="1" />
                ))}

                {/* Shaded points */}
                {points.map(([x, y], i) => (
                    <rect
                        key={i}
                        x={x * cellSize}
                        y={y * cellSize}
                        width={cellSize}
                        height={cellSize}
                        fill={color}
                        stroke="white"
                        strokeWidth="1"
                    />
                ))}
            </svg>
            <div className="mt-1 text-[10px] text-slate-400 font-bold italic">Area: {points.length} sq units</div>
        </div>
    );
};

const CORRECT_MESSAGES = [
    "✨ Sharp eyes! You found the matching area! ✨",
    "🌟 Pattern recognition master! 🌟",
    "🎉 Correct! They have the same area! 🎉",
    "✨ Brilliant visualization! ✨",
    "🚀 Zooming through geometry! 🚀"
];

const CompareShapesSameArea = () => {
    const { grade } = useParams();
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
    const questionStartTime = useRef(Date.now());
    const accumulatedTime = useRef(0);
    const isTabActive = useRef(true);
    const SKILL_ID = 1160;
    const SKILL_NAME = "Compare and Create Shapes with the Same Area";

    const TOTAL_QUESTIONS = 10;
    const [sessionQuestions, setSessionQuestions] = useState([]);
    const [answers, setAnswers] = useState({});

    useEffect(() => {
        const userId = sessionStorage.getItem('userId') || localStorage.getItem('userId');
        if (userId && !sessionId) {
            api.createPracticeSession(userId, SKILL_ID).then(sess => {
                if (sess && sess.session_id) setSessionId(sess.session_id);
            }).catch(err => console.error("Failed to start session", err));
        }

        const handleVisibilityChange = () => {
            if (document.hidden) {
                accumulatedTime.current += Date.now() - questionStartTime.current;
                isTabActive.current = false;
            } else {
                questionStartTime.current = Date.now();
                isTabActive.current = true;
            }
        };
        document.addEventListener("visibilitychange", handleVisibilityChange);

        const generateQuestions = () => {
            const questions = [];

            // Generate some random points for shapes
            const getPoints = (w, h, count) => {
                const pts = [];
                const used = new Set();
                while (pts.length < count) {
                    const x = randomInt(0, w - 1);
                    const y = randomInt(0, h - 1);
                    const key = `${x},${y}`;
                    if (!used.has(key)) {
                        used.add(key);
                        pts.push([x, y]);
                    }
                }
                return pts;
            };

            // Easy (3 Questions) - Which area is larger?
            for (let i = 0; i < 3; i++) {
                const count1 = randomInt(8, 12);
                const count2 = count1 + randomInt(2, 4);
                const [pts1, pts2] = [getPoints(5, 5, count1), getPoints(5, 5, count2)];
                const isLeftLarger = Math.random() > 0.5;
                const correctAnswer = isLeftLarger ? (count1 > count2 ? "Shape A" : "Shape B") : (count1 > count2 ? "Shape B" : "Shape A");
                // Normalizing to just A or B for simplicity
                const finalCorrect = count1 > count2 ? "Shape A" : "Shape B";

                questions.push({
                    text: "Compare these two shapes. Which one has a <strong>larger area</strong>?",
                    correctAnswer: finalCorrect,
                    solution: `Count the squares: Shape A has $${count1}$ squares. Shape B has $${count2}$ squares. $${Math.max(count1, count2)} > ${Math.min(count1, count2)}$, so <strong>${finalCorrect}</strong> is larger.`,
                    visual: (
                        <div className="flex gap-12 justify-center">
                            <GridShape points={pts1} label="Shape A" />
                            <GridShape points={pts2} label="Shape B" color="#F6AD55" />
                        </div>
                    ),
                    shuffledOptions: ["Shape A", "Shape B", "They are equal"].sort(() => Math.random() - 0.5)
                });
            }

            // Medium (3 Questions) - Same Area
            for (let i = 0; i < 3; i++) {
                const targetArea = randomInt(8, 10);
                const ptsTarget = getPoints(5, 5, targetArea);
                const ptsRight = getPoints(5, 5, targetArea);
                const ptsWrong = getPoints(5, 5, targetArea + 2);

                const isLeftCorrect = Math.random() > 0.5;

                questions.push({
                    text: `Look at the main shape. Which of these options has the <strong>same area</strong> (area = $${targetArea}$ sq units)?`,
                    correctAnswer: isLeftCorrect ? "Option 1" : "Option 2",
                    solution: `The main shape has $${targetArea}$ squares. Option 1 has $${isLeftCorrect ? targetArea : targetArea + 2}$ squares. Option 2 has $${isLeftCorrect ? targetArea + 2 : targetArea}$ squares.`,
                    visual: (
                        <div className="flex flex-col items-center gap-8">
                            <GridShape points={ptsTarget} label="Main Shape" />
                            <div className="flex gap-8">
                                <GridShape points={isLeftCorrect ? ptsRight : ptsWrong} label="Option 1" color="#818CF8" />
                                <GridShape points={isLeftCorrect ? ptsWrong : ptsRight} label="Option 2" color="#F472B6" />
                            </div>
                        </div>
                    ),
                    shuffledOptions: ["Option 1", "Option 2"]
                });
            }

            // Hard (4 Questions) - Match by value
            for (let i = 0; i < 4; i++) {
                const areas = [12, 12, 15, 18].sort(() => Math.random() - 0.5);
                const target = areas[0];
                const ptsTarget = getPoints(6, 6, target);

                questions.push({
                    text: "Calculate the area of this irregular shape on the grid.",
                    correctAnswer: `${target} sq units`,
                    solution: `Carefully count all the shaded unit squares. There are exactly $${target}$ shaded squares. So the area is <strong>$${target}$ sq units</strong>.`,
                    visual: <GridShape points={ptsTarget} gridW={6} gridH={6} cellSize={30} />,
                    shuffledOptions: [`${target} sq units`, `${target - 2} sq units`, `${target + 3} sq units`, `${target + 1} sq units`].sort(() => Math.random() - 0.5)
                });
            }

            return questions;
        };

        setSessionQuestions(generateQuestions());
        return () => document.removeEventListener("visibilitychange", null);
    }, []);

    useEffect(() => {
        if (showResults) return;
        const timer = setInterval(() => setTimeElapsed(prev => prev + 1), 1000);
        return () => clearInterval(timer);
    }, [showResults]);

    useEffect(() => {
        if (sessionQuestions.length > 0) {
            const qData = sessionQuestions[qIndex];
            setCurrentQuestion(qData);
            setShuffledOptions(qData.shuffledOptions);
            const ans = answers[qIndex];
            setSelectedOption(ans ? ans.selected : null);
            setIsSubmitted(!!ans);
            setIsCorrect(ans ? ans.isCorrect : false);
        }
    }, [qIndex, sessionQuestions, answers]);

    const formatTime = (s) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`;

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
                time_spent_seconds: 10 // approximation
            });
        }
    };

    const handleNext = async () => {
        if (qIndex < TOTAL_QUESTIONS - 1) {
            setQIndex(prev => prev + 1);
        } else {
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
            <div className="junior-practice-page results-view overflow-y-auto p-8 flex flex-col items-center">
                <h1 className="text-5xl font-black text-[#31326F] mb-8">Results 🎉</h1>
                <div className="flex gap-4 mb-8">
                    {[1, 2, 3].map(i => <Star key={i} size={80} fill={percentage >= i * 33 ? "#FFD700" : "#EDF2F7"} color="#CBD5E0" />)}
                </div>
                <div className="text-4xl font-black mb-12">{score} / {TOTAL_QUESTIONS} Correct!</div>
                <button className="px-12 py-4 bg-[#31326F] text-white rounded-2xl font-black text-2xl" onClick={() => navigate(-1)}>Back to Topics</button>
            </div>
        );
    }

    return (
        <div className="junior-practice-page village-theme" style={{ fontFamily: '"Open Sans", sans-serif' }}>
            <header className="junior-practice-header flex justify-between items-center px-8 h-20">
                <button onClick={() => navigate(-1)} className="bg-white p-2 rounded-xl border-2 border-slate-100"><X size={24} /></button>
                <div className="bg-white px-6 py-2 rounded-full border-2 border-slate-100 font-black text-xl">Question {qIndex + 1} / {TOTAL_QUESTIONS}</div>
                <div className="bg-white px-4 py-2 rounded-xl border-2 border-slate-100 text-lg font-bold">{formatTime(timeElapsed)}</div>
            </header>
            <main className="practice-content-wrapper p-4">
                <div className="max-w-4xl mx-auto bg-white rounded-[3rem] p-12 shadow-xl border-8 border-slate-50">
                    <h2 className="text-3xl font-black text-center text-[#31326F] mb-12"><LatexContent html={currentQuestion.text} /></h2>
                    <div className="mb-12">{currentQuestion.visual}</div>
                    <div className="grid grid-cols-2 gap-6">
                        {shuffledOptions.map((opt, i) => (
                            <button
                                key={i}
                                onClick={() => !isSubmitted && setSelectedOption(opt)}
                                disabled={isSubmitted}
                                className={`p-8 text-2xl font-black rounded-3xl border-4 transition-all ${selectedOption === opt ? 'border-[#31326F] bg-indigo-50 shadow-inner' : 'border-slate-100 hover:border-indigo-200'} ${isSubmitted && opt === currentQuestion.correctAnswer ? 'bg-emerald-50 border-emerald-500 text-emerald-700' : ''} ${isSubmitted && selectedOption === opt && !isCorrect ? 'bg-red-50 border-red-500 text-red-700' : ''}`}
                            >
                                <LatexContent html={opt} />
                            </button>
                        ))}
                    </div>
                </div>
            </main>
            <footer className="h-24 bg-white/80 backdrop-blur-md flex items-center justify-between px-12 border-t-2 border-slate-100">
                <button className="text-red-500 font-black text-xl" onClick={() => navigate(-1)}>Exit</button>
                <div className="flex gap-4">
                    {isSubmitted && <button className="px-8 py-3 bg-indigo-50 text-indigo-600 rounded-2xl font-black" onClick={() => setShowExplanationModal(true)}>Explain</button>}
                    {isSubmitted ? (
                        <button className="px-10 py-3 bg-[#31326F] text-white rounded-2xl font-black" onClick={handleNext}>{qIndex < TOTAL_QUESTIONS - 1 ? "Next" : "Done"}</button>
                    ) : (
                        <button className="px-10 py-3 bg-[#4FB7B3] text-white rounded-2xl font-black" onClick={handleCheck} disabled={!selectedOption}>Submit</button>
                    )}
                </div>
            </footer>
            <ExplanationModal isOpen={showExplanationModal} isCorrect={isCorrect} correctAnswer={currentQuestion.correctAnswer} explanation={currentQuestion.solution} onClose={() => setShowExplanationModal(false)} onNext={() => { setShowExplanationModal(false); handleNext(); }} />
        </div>
    );
};

export default CompareShapesSameArea;

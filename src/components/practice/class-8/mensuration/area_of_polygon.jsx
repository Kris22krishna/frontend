import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { RefreshCw, Check, Eye, ChevronRight, ChevronLeft, Pencil, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../../../../services/api';
import Whiteboard from '../../../Whiteboard';
import LatexContent from '../../../LatexContent';
import ExplanationModal from '../../../ExplanationModal';
import StickerExit from '../../../StickerExit';
import { FullScreenScratchpad } from '../../../FullScreenScratchpad';
import '../../../../pages/juniors/JuniorPracticeSession.css';

const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const CORRECT_MESSAGES = [
    "✨ Amazing job! You got it! ✨",
    "🌟 Brilliant! Keep it up! 🌟",
    "🎉 Correct! You're a math-star! 🎉",
    "✨ Fantastic work! ✨",
    "🚀 Super! You're on fire! 🚀",
    "🌈 Perfect! Well done! 🌈",
    "🎊 Great job! Moving on... 🎊",
    "💎 Spot on! Excellent! 💎"
];

const AreaOfPolygonComponent = () => {
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

    const [sessionId, setSessionId] = useState(null);
    const questionStartTime = useRef(Date.now());
    const accumulatedTime = useRef(0);
    const history = useRef({});
    const isTabActive = useRef(true);
    const SKILL_ID = 1102;
    const SKILL_NAME = "Mensuration - Area of a Polygon";

    const TOTAL_QUESTIONS = 10;
    const [answers, setAnswers] = useState({});

    useEffect(() => {
        const userId = sessionStorage.getItem('userId') || localStorage.getItem('userId');
        if (userId && !sessionId) {
            api.createPracticeSession(userId, SKILL_ID).then(sess => {
                if (sess && sess.session_id) setSessionId(sess.session_id);
            }).catch(err => console.error("Failed to start session", err));
        }

        const timer = setInterval(() => {
            setTimeElapsed(prev => prev + 1);
        }, 1000);

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

        return () => {
            clearInterval(timer);
            document.removeEventListener("visibilitychange", handleVisibilityChange);
        };
    }, []);

    useEffect(() => {
        generateQuestion(qIndex);
    }, [qIndex]);

    const generateQuestion = (index) => {
        const questionTypes = [
            'triangleArea', 'rectangleArea', 'trapeziumArea',
            'parallelogramArea', 'rhombusArea', 'combinedShape1',
            'splitPolygon', 'irregularPolygon', 'complexArea', 'realWorld'
        ];

        if (!window.shuffledMensQ_1102) {
            window.shuffledMensQ_1102 = [...questionTypes].sort(() => Math.random() - 0.5);
        }

        if (history.current[index]) {
            const stored = history.current[index];
            setCurrentQuestion(stored.qData);
            setShuffledOptions(stored.shuffledOptions);
            setSelectedOption(stored.selectedOption);
            setIsSubmitted(stored.isSubmitted);
            setIsCorrect(stored.isCorrect);
            return;
        }

        const questionType = window.shuffledMensQ_1102[index] || 'triangleArea';
        let qData;
        switch (questionType) {
            case 'triangleArea': qData = triangleArea(); break;
            case 'rectangleArea': qData = rectangleArea(); break;
            case 'trapeziumArea': qData = trapeziumArea(); break;
            case 'parallelogramArea': qData = parallelogramArea(); break;
            case 'rhombusArea': qData = rhombusArea(); break;
            case 'combinedShape1': qData = combinedShape1(); break;
            case 'splitPolygon': qData = splitPolygon(); break;
            case 'irregularPolygon': qData = irregularPolygon(); break;
            case 'complexArea': qData = complexArea(); break;
            case 'realWorld': qData = realWorld(); break;
            default: qData = triangleArea();
        }

        const newShuffledOptions = [...qData.options].sort(() => Math.random() - 0.5);
        history.current[index] = {
            qData, shuffledOptions: newShuffledOptions,
            selectedOption: null, isSubmitted: false, isCorrect: false
        };

        setShuffledOptions(newShuffledOptions);
        setCurrentQuestion(qData);
        setSelectedOption(null);
        setIsSubmitted(false);
        setIsCorrect(false);
    };

    // EASY 1: Area of a triangle
    const triangleArea = () => {
        const base = randomInt(4, 16);
        const height = randomInt(3, 12);
        const area = (base * height) / 2;
        const correctAnswer = `$${area}$ cm²`;
        return {
            text: `<div class='question-container'><p>Find the area of a triangle with base $${base}$ cm and height $${height}$ cm.</p></div>`,
            correctAnswer,
            solution: `Area of triangle $= \\frac{1}{2} \\times base \\times height$<br/><br/>$= \\frac{1}{2} \\times ${base} \\times ${height} = ${area}$ cm²`,
            options: [
                `$${area}$ cm²`,
                `$${base * height}$ cm²`,
                `$${area + base}$ cm²`,
                `$${Math.abs(area - height)}$ cm²`
            ]
        };
    };

    // EASY 2: Area of a rectangle
    const rectangleArea = () => {
        const length = randomInt(5, 15);
        const breadth = randomInt(3, 10);
        const area = length * breadth;
        const correctAnswer = `$${area}$ cm²`;
        return {
            text: `<div class='question-container'><p>Find the area of a rectangle with length $${length}$ cm and breadth $${breadth}$ cm.</p></div>`,
            correctAnswer,
            solution: `Area of rectangle $= length \\times breadth$<br/><br/>$= ${length} \\times ${breadth} = ${area}$ cm²`,
            options: [
                `$${area}$ cm²`,
                `$${2 * (length + breadth)}$ cm²`,
                `$${area + length}$ cm²`,
                `$${length + breadth}$ cm²`
            ]
        };
    };

    // EASY 3: Area of a trapezium
    const trapeziumArea = () => {
        const a = randomInt(4, 12);
        const b = randomInt(6, 16);
        const h = randomInt(3, 10);
        const area = ((a + b) * h) / 2;
        const correctAnswer = `$${area}$ cm²`;
        return {
            text: `<div class='question-container'><p>Find the area of a trapezium with parallel sides $${a}$ cm and $${b}$ cm, and height $${h}$ cm.</p></div>`,
            correctAnswer,
            solution: `Area of trapezium $= \\frac{1}{2} \\times (a + b) \\times h$<br/><br/>$= \\frac{1}{2} \\times (${a} + ${b}) \\times ${h}$<br/><br/>$= \\frac{1}{2} \\times ${a + b} \\times ${h} = ${area}$ cm²`,
            options: [
                `$${area}$ cm²`,
                `$${(a + b) * h}$ cm²`,
                `$${a * b * h}$ cm²`,
                `$${area + h}$ cm²`
            ]
        };
    };

    // MEDIUM 1: Area of a parallelogram
    const parallelogramArea = () => {
        const base = randomInt(5, 18);
        const height = randomInt(4, 14);
        const area = base * height;
        const side = randomInt(height + 1, height + 8);
        const correctAnswer = `$${area}$ cm²`;
        return {
            text: `<div class='question-container'><p>A parallelogram has a base of $${base}$ cm, a side of $${side}$ cm and a height of $${height}$ cm. Find its area.</p></div>`,
            correctAnswer,
            solution: `Area of parallelogram $= base \\times height$<br/><br/>Note: The side length is not needed for area calculation.<br/><br/>$= ${base} \\times ${height} = ${area}$ cm²`,
            options: [
                `$${area}$ cm²`,
                `$${base * side}$ cm²`,
                `$${2 * (base + side)}$ cm²`,
                `$${(base * height) / 2}$ cm²`
            ]
        };
    };

    // MEDIUM 2: Area of a rhombus
    const rhombusArea = () => {
        const d1 = randomInt(4, 16) * 2;
        const d2 = randomInt(3, 12) * 2;
        const area = (d1 * d2) / 2;
        const correctAnswer = `$${area}$ cm²`;
        return {
            text: `<div class='question-container'><p>Find the area of a rhombus with diagonals $${d1}$ cm and $${d2}$ cm.</p></div>`,
            correctAnswer,
            solution: `Area of rhombus $= \\frac{1}{2} \\times d_1 \\times d_2$<br/><br/>$= \\frac{1}{2} \\times ${d1} \\times ${d2} = ${area}$ cm²`,
            options: [
                `$${area}$ cm²`,
                `$${d1 * d2}$ cm²`,
                `$${d1 + d2}$ cm²`,
                `$${area + d1}$ cm²`
            ]
        };
    };

    // MEDIUM 3: Combined shape (rectangle + triangle)
    const combinedShape1 = () => {
        const l = randomInt(6, 14);
        const w = randomInt(4, 10);
        const th = randomInt(3, 8);
        const rectArea = l * w;
        const triArea = (l * th) / 2;
        const totalArea = rectArea + triArea;
        const correctAnswer = `$${totalArea}$ cm²`;
        return {
            text: `<div class='question-container'><p>A polygon is made of a rectangle ($${l}$ cm × $${w}$ cm) with a triangle on top (base $${l}$ cm, height $${th}$ cm). Find the total area.</p></div>`,
            correctAnswer,
            solution: `Area of rectangle $= ${l} \\times ${w} = ${rectArea}$ cm²<br/><br/>Area of triangle $= \\frac{1}{2} \\times ${l} \\times ${th} = ${triArea}$ cm²<br/><br/>Total area $= ${rectArea} + ${triArea} = ${totalArea}$ cm²`,
            options: [
                `$${totalArea}$ cm²`,
                `$${rectArea}$ cm²`,
                `$${rectArea + l * th}$ cm²`,
                `$${totalArea + w}$ cm²`
            ]
        };
    };

    // HARD 1: Splitting polygon into triangles
    const splitPolygon = () => {
        const d = randomInt(8, 20);
        const h1 = randomInt(3, 8);
        const h2 = randomInt(3, 8);
        const area1 = (d * h1) / 2;
        const area2 = (d * h2) / 2;
        const totalArea = area1 + area2;
        const correctAnswer = `$${totalArea}$ cm²`;
        return {
            text: `<div class='question-container'><p>A quadrilateral is divided by a diagonal of length $${d}$ cm into two triangles. The heights of the triangles from the diagonal are $${h1}$ cm and $${h2}$ cm. Find the area of the quadrilateral.</p></div>`,
            correctAnswer,
            solution: `Area of triangle 1 $= \\frac{1}{2} \\times ${d} \\times ${h1} = ${area1}$ cm²<br/><br/>Area of triangle 2 $= \\frac{1}{2} \\times ${d} \\times ${h2} = ${area2}$ cm²<br/><br/>Total area $= ${area1} + ${area2} = ${totalArea}$ cm²`,
            options: [
                `$${totalArea}$ cm²`,
                `$${d * (h1 + h2)}$ cm²`,
                `$${(d * h1 * h2) / 2}$ cm²`,
                `$${totalArea + d}$ cm²`
            ]
        };
    };

    // HARD 2: Irregular polygon split into trapezium + triangle
    const irregularPolygon = () => {
        const a = randomInt(6, 12);
        const b = randomInt(8, 16);
        const h1 = randomInt(4, 8);
        const base2 = randomInt(5, 10);
        const h2 = randomInt(3, 7);
        const trapArea = ((a + b) * h1) / 2;
        const triArea = (base2 * h2) / 2;
        const totalArea = trapArea + triArea;
        const correctAnswer = `$${totalArea}$ cm²`;
        return {
            text: `<div class='question-container'><p>A polygon is split into a trapezium (parallel sides $${a}$ cm and $${b}$ cm, height $${h1}$ cm) and a triangle (base $${base2}$ cm, height $${h2}$ cm). Find the total area.</p></div>`,
            correctAnswer,
            solution: `Area of trapezium $= \\frac{1}{2} \\times (${a} + ${b}) \\times ${h1} = ${trapArea}$ cm²<br/><br/>Area of triangle $= \\frac{1}{2} \\times ${base2} \\times ${h2} = ${triArea}$ cm²<br/><br/>Total area $= ${trapArea} + ${triArea} = ${totalArea}$ cm²`,
            options: [
                `$${totalArea}$ cm²`,
                `$${trapArea}$ cm²`,
                `$${totalArea + a}$ cm²`,
                `$${(a + b) * h1 + base2 * h2}$ cm²`
            ]
        };
    };

    // HARD 3: Complex area with subtraction
    const complexArea = () => {
        const outerSide = randomInt(12, 20);
        const innerL = randomInt(3, 6);
        const innerW = randomInt(2, 5);
        const outerArea = outerSide * outerSide;
        const innerArea = innerL * innerW;
        const shadedArea = outerArea - innerArea;
        const correctAnswer = `$${shadedArea}$ cm²`;
        return {
            text: `<div class='question-container'><p>A square field of side $${outerSide}$ cm has a rectangular pond ($${innerL}$ cm × $${innerW}$ cm) inside it. Find the area of the field excluding the pond.</p></div>`,
            correctAnswer,
            solution: `Area of square $= ${outerSide}^2 = ${outerArea}$ cm²<br/><br/>Area of pond $= ${innerL} \\times ${innerW} = ${innerArea}$ cm²<br/><br/>Shaded area $= ${outerArea} - ${innerArea} = ${shadedArea}$ cm²`,
            options: [
                `$${shadedArea}$ cm²`,
                `$${outerArea}$ cm²`,
                `$${outerArea + innerArea}$ cm²`,
                `$${shadedArea - outerSide}$ cm²`
            ]
        };
    };

    // BONUS: Real-world application
    const realWorld = () => {
        const l = randomInt(10, 30);
        const w = randomInt(8, 20);
        const rate = randomInt(5, 20);
        const area = l * w;
        const cost = area * rate;
        const correctAnswer = `₹$${cost}$`;
        return {
            text: `<div class='question-container'><p>A rectangular plot is $${l}$ m long and $${w}$ m wide. Find the cost of levelling it at ₹$${rate}$ per m².</p></div>`,
            correctAnswer,
            solution: `Area of plot $= ${l} \\times ${w} = ${area}$ m²<br/><br/>Cost $= ${area} \\times ${rate} = $ ₹$${cost}$`,
            options: [
                `₹$${cost}$`,
                `₹$${area}$`,
                `₹$${cost + rate}$`,
                `₹$${l * w * 2}$`
            ]
        };
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const recordQuestionAttempt = async (question, selected, isCorrect) => {
        const userId = sessionStorage.getItem('userId') || localStorage.getItem('userId');
        if (!userId) return;
        let timeSpent = accumulatedTime.current;
        if (isTabActive.current) timeSpent += Date.now() - questionStartTime.current;
        const seconds = Math.round(timeSpent / 1000);
        try {
            await api.recordAttempt({
                user_id: parseInt(userId, 10), session_id: sessionId, skill_id: SKILL_ID,
                template_id: null, difficulty_level: qIndex < 3 ? 'Easy' : qIndex < 6 ? 'Medium' : 'Hard',
                question_text: String(question.text || ''), correct_answer: String(question.correctAnswer || ''),
                student_answer: String(selected || ''), is_correct: isCorrect,
                solution_text: String(question.solution || ''), time_spent_seconds: seconds >= 0 ? seconds : 0
            });
        } catch (e) { console.error("Failed to record attempt", e); }
    };

    const handleCheck = () => {
        if (!selectedOption || !currentQuestion) return;
        const isRight = selectedOption === currentQuestion.correctAnswer;
        setIsCorrect(isRight);
        setIsSubmitted(true);
        setAnswers(prev => ({ ...prev, [qIndex]: isRight }));
        if (isRight) {
            setFeedbackMessage(CORRECT_MESSAGES[Math.floor(Math.random() * CORRECT_MESSAGES.length)]);
        } else { setShowExplanationModal(true); }
        recordQuestionAttempt(currentQuestion, selectedOption, isRight);
    };

    const handleNext = async () => {
        if (history.current[qIndex]) {
            history.current[qIndex] = { ...history.current[qIndex], selectedOption, isSubmitted, isCorrect };
        }
        if (qIndex < TOTAL_QUESTIONS - 1) {
            setQIndex(prev => prev + 1);
            setShowExplanationModal(false); setSelectedOption(null); setIsSubmitted(false); setIsCorrect(false);
            accumulatedTime.current = 0; questionStartTime.current = Date.now();
        } else {
            if (sessionId) await api.finishSession(sessionId).catch(console.error);
            const userId = sessionStorage.getItem('userId') || localStorage.getItem('userId');
            if (userId) {
                const totalCorrect = Object.values(answers).filter(val => val === true).length;
                try {
                    await api.createReport({
                        title: SKILL_NAME, type: 'practice',
                        score: (totalCorrect / TOTAL_QUESTIONS) * 100,
                        parameters: {
                            skill_id: SKILL_ID, skill_name: SKILL_NAME, total_questions: TOTAL_QUESTIONS,
                            correct_answers: totalCorrect, timestamp: new Date().toISOString(), time_taken_seconds: timeElapsed
                        },
                        user_id: parseInt(userId, 10)
                    });
                } catch (err) { console.error("Failed to create report", err); }
            }
            navigate(-1);
        }
    };

    const handlePrevious = () => {
        if (history.current[qIndex]) {
            history.current[qIndex] = { ...history.current[qIndex], selectedOption, isSubmitted, isCorrect };
        }
        if (qIndex > 0) {
            setQIndex(prev => prev - 1);
            setShowExplanationModal(false); setSelectedOption(null); setIsSubmitted(false); setIsCorrect(false);
        }
    };

    const handleOptionSelect = (option) => { if (isSubmitted) return; setSelectedOption(option); };

    if (!currentQuestion) return <div>Loading...</div>;

    return (
        <div className="junior-practice-page raksha-theme grey-selection-theme" style={{ fontFamily: '"Open Sans", sans-serif' }}>
            <header className="junior-practice-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 2rem' }}>
                <div className="header-left"></div>
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-max">
                    <div className="bg-white/90 backdrop-blur-md px-3 py-1.5 sm:px-6 sm:py-2 rounded-full border-2 border-[#4FB7B3]/30 text-[#31326F] font-black text-sm sm:text-xl shadow-lg whitespace-nowrap">
                        Question {qIndex + 1} / {TOTAL_QUESTIONS}
                    </div>
                </div>
                <div className="header-right">
                    <div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl border-2 border-[#4FB7B3]/30 text-[#31326F] font-bold text-lg shadow-md flex items-center gap-2">
                        {formatTime(timeElapsed)}
                    </div>
                </div>
            </header>

            <main className="practice-content-wrapper">
                <div className="practice-board-container" style={{ gridTemplateColumns: '1fr', maxWidth: '800px', margin: '0 auto' }}>
                    <div className="practice-left-col" style={{ width: '100%' }}>
                        <AnimatePresence mode="wait">
                            <motion.div key={qIndex} initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -50, opacity: 0 }} transition={{ duration: 0.4, ease: "easeOut" }} style={{ height: '100%', width: '100%' }}>
                                <div className="question-card-modern" style={{ paddingLeft: '2rem' }}>
                                    <div className="question-header-modern">
                                        <h2 className="question-text-modern" style={{ fontSize: 'clamp(1rem, 2vw, 1.6rem)', maxHeight: 'none', fontWeight: '500', textAlign: 'left', justifyContent: 'flex-start', overflow: 'visible' }}>
                                            <LatexContent html={currentQuestion.text} />
                                        </h2>
                                    </div>
                                    <div className="interaction-area-modern">
                                        <div className="options-grid-modern">
                                            {shuffledOptions.map((option, idx) => (
                                                <button key={idx} className={`option-btn-modern ${selectedOption === option ? 'selected' : ''} ${isSubmitted && option === currentQuestion.correctAnswer ? 'correct' : ''} ${isSubmitted && selectedOption === option && !isCorrect ? 'wrong' : ''}`} style={{ fontWeight: '500' }} onClick={() => handleOptionSelect(option)} disabled={isSubmitted}>
                                                    <LatexContent html={option} />
                                                </button>
                                            ))}
                                        </div>
                                        {isSubmitted && isCorrect && (
                                            <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="feedback-mini correct" style={{ marginTop: '20px' }}>
                                                {feedbackMessage}
                                            </motion.div>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </main>

            <ExplanationModal isOpen={showExplanationModal} isCorrect={isCorrect} correctAnswer={currentQuestion.correctAnswer} explanation={currentQuestion.solution} onClose={() => setShowExplanationModal(false)} onNext={() => setShowExplanationModal(false)} />

            <footer className="junior-bottom-bar">
                <div className="desktop-footer-controls">
                    <div className="bottom-left">
                        <button className="bg-red-50 text-red-500 px-6 py-2 rounded-xl border-2 border-red-100 font-bold hover:bg-red-100 transition-colors flex items-center gap-2" onClick={async () => { if (sessionId) await api.finishSession(sessionId).catch(console.error); navigate(-1); }}>Exit Practice</button>
                    </div>
                    <div className="bottom-center">
                        {isSubmitted && (<button className="view-explanation-btn" onClick={() => setShowExplanationModal(true)}><Eye size={20} /> View Explanation</button>)}
                    </div>
                    <div className="bottom-right">
                        <div className="nav-buttons-group">
                            {qIndex > 0 && (<button className="nav-pill-prev-btn" onClick={handlePrevious} title="Previous"><ChevronLeft size={28} strokeWidth={3} /> Previous</button>)}
                            {isSubmitted ? (
                                <button className="nav-pill-next-btn" onClick={handleNext}>{qIndex < TOTAL_QUESTIONS - 1 ? (<>Next <ChevronRight size={28} strokeWidth={3} /></>) : (<>Done <Check size={28} strokeWidth={3} /></>)}</button>
                            ) : (
                                <button className="nav-pill-submit-btn" onClick={handleCheck} disabled={!selectedOption}>Submit <Check size={28} strokeWidth={3} /></button>
                            )}
                        </div>
                    </div>
                </div>
                <div className="mobile-footer-controls">
                    <div className="flex items-center gap-2">
                        <button className="bg-red-50 text-red-500 p-2 rounded-lg border border-red-100" onClick={async () => { if (sessionId) await api.finishSession(sessionId).catch(console.error); navigate(-1); }}><X size={20} /></button>
                        {isSubmitted && (<button className="view-explanation-btn" onClick={() => setShowExplanationModal(true)}><Eye size={18} /> Explain</button>)}
                    </div>
                    <div className="mobile-footer-right" style={{ width: 'auto' }}>
                        <div className="nav-buttons-group">
                            {qIndex > 0 && (<button className="nav-pill-prev-btn" onClick={handlePrevious} title="Previous"><ChevronLeft size={28} strokeWidth={3} /> Previous</button>)}
                            {isSubmitted ? (<button className="nav-pill-next-btn" onClick={handleNext}>{qIndex < TOTAL_QUESTIONS - 1 ? "Next" : "Done"}</button>) : (<button className="nav-pill-submit-btn" onClick={handleCheck} disabled={!selectedOption}>Submit</button>)}
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default AreaOfPolygonComponent;

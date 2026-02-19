import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { RefreshCw, ArrowLeft, Check, X, Pencil, Eye, ChevronRight, ChevronLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../../../../services/api';
import { LatexText } from '../../../LatexText';
import ExplanationModal from '../../../ExplanationModal';
import InteractiveGraph from '../../../InteractiveGraph';
import '../../../../pages/juniors/JuniorPracticeSession.css';

const GraphicalMethod = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [qIndex, setQIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null); // For MCQ
    const [userLines, setUserLines] = useState([]); // For Graphing
    const [userInput, setUserInput] = useState({ x: '', y: '' }); // For Graphing Answer
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const [showExplanationModal, setShowExplanationModal] = useState(false);
    const [timeElapsed, setTimeElapsed] = useState(0);
    const [feedbackMessage, setFeedbackMessage] = useState("");
    const [questions, setQuestions] = useState([]);
    const [isGraphModalOpen, setIsGraphModalOpen] = useState(false);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const isMobile = windowWidth < 768;
    const graphSize = isMobile ? Math.min(windowWidth - 80, 350) : 480;

    // Logging states
    const [sessionId, setSessionId] = useState(null);
    const questionStartTime = useRef(Date.now());
    const accumulatedTime = useRef(0);
    const isTabActive = useRef(true);

    // Extract Skill ID from URL
    const SKILL_ID = parseInt(location.pathname.split('/').pop(), 10) || 10011;

    // Skill Metadata
    const SKILL_METADATA = {
        10011: { name: "Solve a pair of linear equations by graphing" },
        10021: { name: "Identify the Number of Solutions from Line Relationships" }
    };
    const SKILL_NAME = SKILL_METADATA[SKILL_ID]?.name || "Graphical Method";
    const [answers, setAnswers] = useState({});

    const generateQuestions = () => {
        const newQuestions = [];
        const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

        const createQuestion = (id, text, options, answer, solution, type = 'mcq', equations = [], solutionCoords = null) => ({
            id, text, options: options ? options.sort(() => Math.random() - 0.5) : [], correctAnswer: answer, solution, type, equations, solutionCoords
        });

        // Skill 10011: Solve by graphing (Numeric) -> UPDATED TO INTERACTIVE GRAPHING
        if (SKILL_ID === 10011) {
            // EASY 1: Intersecting at integer
            let x1 = getRandomInt(1, 4), y1 = getRandomInt(1, 4);
            // Eq1: x + y = C
            // Eq2: x - y = D
            newQuestions.push(createQuestion(1,
                `Draw graphs for: $x + y = ${x1 + y1}$ and $x - y = ${x1 - y1}$. Find the solution.`,
                null,
                `(${x1}, ${y1})`,
                `Plot $x+y=${x1 + y1}$ (e.g., passes through (${x1 + y1},0) and (0,${x1 + y1})). Plot $x-y=${x1 - y1}$ (e.g., passes through (${x1 - y1},0) and (0,${-(x1 - y1)})). They intersect at (${x1}, ${y1}).`,
                'graphing',
                [
                    { a: 1, b: 1, c: x1 + y1 }, // x + y = c
                    { a: 1, b: -1, c: x1 - y1 } // x - y = c
                ],
                { x: x1, y: y1 }
            ));

            // EASY 2: x=a, y=b logic
            let a = getRandomInt(2, 5), b = getRandomInt(2, 5);
            newQuestions.push(createQuestion(2,
                `Graph the system: $x = ${a}$ and $y = ${b}$.`,
                null,
                `(${a}, ${b})`,
                `Line $x=${a}$ is vertical at x=${a}. Line $y=${b}$ is horizontal at y=${b}. Intersection is (${a}, ${b}).`,
                'graphing',
                [
                    { a: 1, b: 0, c: a }, // 1x + 0y = a
                    { a: 0, b: 1, c: b }  // 0x + 1y = b
                ],
                { x: a, y: b }
            ));

            // MEDIUM 1: Standard System
            // 2x + y = 6, x - y = 3 => (3, 0)
            newQuestions.push(createQuestion(3,
                `Solve graphically: $2x + y = 6$ and $x - y = 3$.`,
                null,
                `(3, 0)`,
                `$2x+y=6$ (0,6), (3,0). $x-y=3$ (3,0), (0,-3). Intersection (3, 0).`,
                'graphing',
                [
                    { a: 2, b: 1, c: 6 },
                    { a: 1, b: -1, c: 3 }
                ],
                { x: 3, y: 0 }
            ));

            // MEDIUM 2: Intersection Logic
            let m_sol_x = 2, m_sol_y = 2;
            // x + y = 4
            // 2x - y = 2
            newQuestions.push(createQuestion(4,
                `Solve graphically: $x + y = 4$ and $2x - y = 2$.`,
                null,
                `(2, 2)`,
                `$x+y=4$ passes through (0,4), (4,0). $2x-y=2$ passes through (1,0), (0,-2). Intersection (2, 2).`,
                'graphing',
                [
                    { a: 1, b: 1, c: 4 },
                    { a: 2, b: -1, c: 2 }
                ],
                { x: 2, y: 2 }
            ));

            // HARD 1: Larger Coeffs
            // x + 2y = 8, x - y = 2 => (4, 2)
            newQuestions.push(createQuestion(5,
                `Solve: $x + 2y = 8$ and $x - y = 2$.`,
                null,
                `(4, 2)`,
                `$x+2y=8$ (8,0), (0,4). $x-y=2$ (2,0), (0,-2). Intersection (4, 2).`,
                'graphing',
                [
                    { a: 1, b: 2, c: 8 },
                    { a: 1, b: -1, c: 2 }
                ],
                { x: 4, y: 2 }
            ));

            // NEW: EASY 3 - Intersection at (pos, neg)
            // x + y = 1, x - y = 3 => (2, -1)
            newQuestions.push(createQuestion(6,
                `Solve graphically: $x + y = 1$ and $x - y = 3$.`,
                null,
                `(2, -1)`,
                `$x + y = 1$ (1,0), (0,1). $x - y = 3$ (3,0), (0,-3). Intersection (2, -1).`,
                'graphing',
                [
                    { a: 1, b: 1, c: 1 },
                    { a: 1, b: -1, c: 3 }
                ],
                { x: 2, y: -1 }
            ));

            // NEW: EASY 4 - Intersection at (neg, pos)
            // 2x + y = 0, x - y = -3 => (-1, 2)
            newQuestions.push(createQuestion(7,
                `Solve: $2x + y = 0$ and $x - y = -3$.`,
                null,
                `(-1, 2)`,
                `$2x+y=0$ passes through (0,0), (-1,2). $x-y=-3$ passes through (-3,0), (-1,2). Intersection (-1, 2).`,
                'graphing',
                [
                    { a: 2, b: 1, c: 0 },
                    { a: 1, b: -1, c: -3 }
                ],
                { x: -1, y: 2 }
            ));

            // NEW: MEDIUM 3 - Slope-intercept form
            // y = 2x + 1 => 2x - y = -1; x + y = 4 => (1, 3)
            newQuestions.push(createQuestion(8,
                `Solve: $y = 2x + 1$ and $x + y = 4$.`,
                null,
                `(1, 3)`,
                `Rearrange $y=2x+1$ to $2x-y=-1$. Plot points. Intersection (1, 3).`,
                'graphing',
                [
                    { a: 2, b: -1, c: -1 },
                    { a: 1, b: 1, c: 4 }
                ],
                { x: 1, y: 3 }
            ));

            // NEW: MEDIUM 4 - Intersection on Axis
            // x + y = 3, x - y = 3 => (3, 0)
            newQuestions.push(createQuestion(9,
                `Solve: $x + y = 3$ and $x - y = 3$.`,
                null,
                `(3, 0)`,
                `Intersection lies on the x-axis at (3, 0).`,
                'graphing',
                [
                    { a: 1, b: 1, c: 3 },
                    { a: 1, b: -1, c: 3 }
                ],
                { x: 3, y: 0 }
            ));

            // NEW: HARD 2 - Intersection on Y-Axis
            // 3x + 2y = 8, x - 2y = -8 => (0, 4)
            newQuestions.push(createQuestion(10,
                `Solve: $3x + 2y = 8$ and $x - 2y = -8$.`,
                null,
                `(0, 4)`,
                `Intersection lies on the y-axis at (0, 4).`,
                'graphing',
                [
                    { a: 3, b: 2, c: 8 },
                    { a: 1, b: -2, c: -8 }
                ],
                { x: 0, y: 4 }
            ));

        }

        // Skill 10021: Identify Number of Solutions (Conceptual - No Graphing)
        if (SKILL_ID === 10021) {
            // Type 1: Parallel Lines
            newQuestions.push(createQuestion(1,
                "The graph of a system of linear equations shows two **parallel lines**. How many solutions does the system have?",
                ["One unique solution", "No solution", "Infinitely many solutions", "Two solutions"],
                "No solution",
                "Parallel lines never intersect. Therefore, there is no common point and **no solution**."
            ));

            // Type 2: Intersecting Lines
            newQuestions.push(createQuestion(2,
                "The graph of a system of linear equations shows two lines **intersecting at exactly one point**. The system has:",
                ["One unique solution", "No solution", "Infinitely many solutions", "Two solutions"],
                "One unique solution",
                "Lines that intersect at a single point have exactly one common solution."
            ));

            // Type 3: Coincident Lines
            newQuestions.push(createQuestion(3,
                "The graph of a system of linear equations shows that the two lines are **coincident** (one on top of the other). The system has:",
                ["One unique solution", "No solution", "Infinitely many solutions", "Two solutions"],
                "Infinitely many solutions",
                "Coincident lines touch at every point. Since every point on the line is a solution, there are **infinitely many solutions**."
            ));

            // Type 4: Visual - Parallel
            newQuestions.push(createQuestion(4,
                "Two lines satisfy the condition $a_1/a_2 = b_1/b_2 \\neq c_1/c_2$. Geometrically, these lines are:",
                ["Intersecting", "Parallel", "Coincident", "Perpendicular"],
                "Parallel",
                "The condition $a_1/a_2 = b_1/b_2 \\neq c_1/c_2$ corresponds to **parallel lines** (same slope, different intercept)."
            ));

            // Type 5: Visual - Coincident
            newQuestions.push(createQuestion(5,
                "If a pair of linear equations has **infinitely many solutions**, what does their graph look like?",
                ["Intersecting lines", "Parallel lines", "Coincident lines", "Perpendicular lines"],
                "Coincident lines",
                "Infinitely many solutions mean the lines overlap completely, which are called **coincident lines**."
            ));
        }

        return newQuestions;
    };

    useEffect(() => {
        setQuestions(generateQuestions());
    }, [SKILL_ID]);

    // Restore state when qIndex changes
    useEffect(() => {
        const savedAnswer = answers[qIndex];
        if (savedAnswer) {
            setSelectedOption(savedAnswer.selectedOption);
            if (savedAnswer.userLines) setUserLines(savedAnswer.userLines);
            if (savedAnswer.userInput) setUserInput(savedAnswer.userInput);
            setIsCorrect(savedAnswer.isCorrect);
            setIsSubmitted(true);
        } else {
            setSelectedOption(null);
            setUserLines([]);
            setUserInput({ x: '', y: '' });
            setIsCorrect(false);
            setIsSubmitted(false);
        }
    }, [qIndex, answers]);

    const CORRECT_MESSAGES = ["Good job!", "Excellent!", "Perfect!", "Well done!"];
    useEffect(() => {
        const userId = sessionStorage.getItem('userId') || localStorage.getItem('userId');
        if (userId && !sessionId) {
            api.createPracticeSession(userId, SKILL_ID).then(sess => {
                if (sess && sess.session_id) setSessionId(sess.session_id);
            });
        }
        const timer = setInterval(() => setTimeElapsed(p => p + 1), 1000);
        return () => clearInterval(timer);
    }, [SKILL_ID]);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const isPointOnLine = (p, eq) => {
        // eq: ax + by = c
        // Tolerant check not strictly needed for integer grid clicker, but good for safety
        const val = eq.a * p.x + eq.b * p.y;
        return Math.abs(val - eq.c) < 0.1; // Float tolerance if strictly needed, though here we use ints
    };

    const handleCheck = () => {
        const currentQ = questions[qIndex];
        let isRight = false;
        let answerToLog = "";

        if (currentQ.type === 'graphing') {
            if (userLines.length !== 2) return; // Must draw 2 lines

            // Validation: Check if the 2 drawn lines correspond to the 2 required equations.
            // A drawn line (p1, p2) corresponds to an equation if BOTH points satisfy it.

            const eq1 = currentQ.equations[0];
            const eq2 = currentQ.equations[1];

            // Helper to check if a line matches an equation
            const lineMatchesEq = (line, eq) => {
                return isPointOnLine(line.p1, eq) && isPointOnLine(line.p2, eq);
            };

            // Two cases: 
            // 1. Line 1 -> Eq 1 AND Line 2 -> Eq 2
            // 2. Line 1 -> Eq 2 AND Line 2 -> Eq 1
            const match1 = lineMatchesEq(userLines[0], eq1) && lineMatchesEq(userLines[1], eq2);
            const match2 = lineMatchesEq(userLines[0], eq2) && lineMatchesEq(userLines[1], eq1);

            const linesCorrect = match1 || match2;
            const coordsCorrect = parseInt(userInput.x) === currentQ.solutionCoords.x && parseInt(userInput.y) === currentQ.solutionCoords.y;

            isRight = linesCorrect && coordsCorrect;
            answerToLog = JSON.stringify({ lines: userLines, solution: userInput });

        } else {
            // MCQ Logic
            if (!selectedOption) return;
            isRight = selectedOption === currentQ.correctAnswer;
            answerToLog = selectedOption;
        }

        setIsCorrect(isRight);
        setIsSubmitted(true);
        if (isRight) setFeedbackMessage(CORRECT_MESSAGES[Math.floor(Math.random() * CORRECT_MESSAGES.length)]);
        else setShowExplanationModal(true);
        setAnswers(prev => ({
            ...prev,
            [qIndex]: {
                selectedOption: selectedOption,
                userLines: userLines,
                userInput: userInput,
                isCorrect: isRight
            }
        }));

        const userId = sessionStorage.getItem('userId') || localStorage.getItem('userId');
        if (userId) {
            let t = accumulatedTime.current;
            if (isTabActive.current) t += Date.now() - questionStartTime.current;
            const sec = Math.max(0, Math.round(t / 1000));
            api.recordAttempt({
                user_id: parseInt(userId), session_id: sessionId, skill_id: SKILL_ID,
                question_text: currentQ.text, correct_answer: currentQ.correctAnswer,
                student_answer: answerToLog, is_correct: isRight, solution_text: currentQ.solution,
                time_spent_seconds: sec
            }).catch(console.error);
        }
    };

    const handlePrevious = () => {
        if (qIndex > 0) {
            setQIndex(prev => prev - 1);
            accumulatedTime.current = 0;
            questionStartTime.current = Date.now();
        }
    };

    const handleNext = async () => {
        if (qIndex < questions.length - 1) {
            setQIndex(p => p + 1);
            accumulatedTime.current = 0;
            questionStartTime.current = Date.now();
        } else {
            if (sessionId) await api.finishSession(sessionId).catch(console.error);
            const userId = sessionStorage.getItem('userId') || localStorage.getItem('userId');
            if (userId) {
                const totalCorrect = Object.values(answers).filter(val => val === true).length;
                await api.createReport({
                    title: SKILL_NAME,
                    type: 'practice',
                    score: (totalCorrect / questions.length) * 100,
                    parameters: {
                        skill_id: SKILL_ID,
                        skill_name: SKILL_NAME,
                        total_questions: questions.length,
                        correct_answers: totalCorrect,
                        timestamp: new Date().toISOString(),
                        time_taken_seconds: timeElapsed
                    },
                    user_id: parseInt(userId, 10)
                }).catch(console.error);
            }
            navigate(-1);
        }
    };

    if (questions.length === 0) return <div>Loading...</div>;
    const currentQuestion = questions[qIndex];

    return (
        <div className="junior-practice-page" style={{ fontFamily: '"Open Sans", sans-serif' }}>
            <header className="junior-practice-header" style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', padding: '0 2rem' }}>
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-max">
                    <div className="bg-white/90 backdrop-blur-md px-3 py-1.5 sm:px-6 sm:py-2 rounded-full border-2 border-[#4FB7B3]/30 text-[#31326F] font-black text-sm sm:text-xl shadow-lg whitespace-nowrap">
                        Question {qIndex + 1} / {questions.length}
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
                        <div className="question-card-modern" style={{ paddingLeft: '2rem' }}>
                            <div className="question-header-modern">
                                <h2 className="question-text-modern" style={{ fontSize: 'clamp(1rem, 2vw, 1.6rem)', maxHeight: 'none', fontWeight: '500', textAlign: 'left', justifyContent: 'flex-start', overflow: 'visible', color: '#2D3748' }}>
                                    <LatexText text={currentQuestion.text} />
                                </h2>
                            </div>
                            <div className="interaction-area-modern" style={{ overflowY: 'hidden' }}>
                                {currentQuestion.type === 'graphing' ? (
                                    <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', gap: '2rem', margin: '1rem 0' }}>
                                        {/* Left Side: Preview Graph (Clickable) */}
                                        <div
                                            onClick={() => !isSubmitted && setIsGraphModalOpen(true)}
                                            style={{ cursor: isSubmitted ? 'default' : 'pointer', position: 'relative' }}
                                            title="Click to expand and draw"
                                        >
                                            <InteractiveGraph
                                                onLinesUpdate={() => { }}
                                                readOnly={true}
                                                initialLines={userLines}
                                                maxLines={2}
                                                size={250} // Smaller preview size
                                            />
                                            {!isSubmitted && (
                                                <div style={{
                                                    position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                                                    background: 'rgba(255, 255, 255, 0.8)', padding: '0.5rem 1rem', borderRadius: '8px',
                                                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)', pointerEvents: 'none', fontWeight: '600', color: '#4F46E5'
                                                }}>
                                                    Click to Draw
                                                </div>
                                            )}
                                        </div>

                                        {/* Right Side: Inputs & Feedback */}
                                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '1rem' }}>
                                            {/* Inputs always visible so user knows what to do */}
                                            {!isSubmitted && (
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.2rem', color: '#1E293B', fontWeight: '500' }}>
                                                    <span>The solution is (</span>
                                                    <input
                                                        type="number"
                                                        value={userInput.x}
                                                        onChange={(e) => setUserInput({ ...userInput, x: e.target.value })}
                                                        style={{ width: '60px', padding: '0.4rem', borderRadius: '8px', border: '2px solid #E2E8F0', textAlign: 'center', fontSize: '1.1rem', outline: 'none' }}
                                                        placeholder="x"
                                                    />
                                                    <span>,</span>
                                                    <input
                                                        type="number"
                                                        value={userInput.y}
                                                        onChange={(e) => setUserInput({ ...userInput, y: e.target.value })}
                                                        style={{ width: '60px', padding: '0.4rem', borderRadius: '8px', border: '2px solid #E2E8F0', textAlign: 'center', fontSize: '1.1rem', outline: 'none' }}
                                                        placeholder="y"
                                                    />
                                                    <span>).</span>
                                                </div>
                                            )}
                                            {isSubmitted && isCorrect && (
                                                <div className="feedback-mini correct">
                                                    {feedbackMessage}
                                                </div>
                                            )}
                                            {isSubmitted && !isCorrect && (
                                                <div className="feedback-mini wrong">
                                                    Incorrect. Check solution.
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ) : (
                                    <div className="options-grid-modern">
                                        {currentQuestion.options.map((option, idx) => (
                                            <button
                                                key={idx}
                                                className={`option-btn-modern ${selectedOption === option ? 'selected' : ''} ${isSubmitted && option === currentQuestion.correctAnswer ? 'correct' : ''} ${isSubmitted && selectedOption === option && !isCorrect ? 'wrong' : ''}`}
                                                style={{ fontWeight: '500' }}
                                                onClick={() => !isSubmitted && setSelectedOption(option)}
                                                disabled={isSubmitted}
                                            >
                                                <LatexText text={option} />
                                            </button>
                                        ))}
                                        {isSubmitted && isCorrect && (
                                            <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="feedback-mini correct" style={{ marginTop: '20px' }}>
                                                {feedbackMessage}
                                            </motion.div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </main >

            {/* Large Graph Modal */}
            < AnimatePresence >
                {isGraphModalOpen && (
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        style={{
                            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                            background: 'rgba(0,0,0,0.7)', zIndex: 2000,
                            display: 'flex', alignItems: 'center', justifyContent: 'center'
                        }}
                    >
                        <motion.div
                            initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}
                            style={{
                                background: 'white',
                                padding: isMobile ? '1rem' : '1.5rem',
                                borderRadius: '24px',
                                position: 'relative',
                                maxHeight: '95vh',
                                width: isMobile ? '95vw' : 'auto',
                                maxWidth: '95vw',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                overflowY: 'auto', // Allow scrolling if content still overflows
                                overflowX: 'hidden',
                                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
                            }}
                        >
                            <button
                                onClick={() => setIsGraphModalOpen(false)}
                                style={{ position: 'absolute', top: isMobile ? '10px' : '15px', right: isMobile ? '10px' : '15px', background: '#F1F5F9', border: 'none', cursor: 'pointer', color: '#64748B', zIndex: 10, padding: '5px', borderRadius: '50%' }}
                            >
                                <X size={20} />
                            </button>

                            <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', alignItems: isMobile ? 'center' : 'stretch', gap: isMobile ? '1rem' : '2rem', width: '100%' }}>
                                {/* Left Side/Top: Large Graph */}
                                <div style={{ background: '#F8FAFC', padding: '10px', borderRadius: '16px', display: 'flex', justifyContent: 'center' }}>
                                    <InteractiveGraph
                                        onLinesUpdate={setUserLines}
                                        readOnly={false}
                                        initialLines={userLines}
                                        maxLines={2}
                                        size={graphSize} // Significantly larger
                                        showControls={false}
                                    />
                                </div>

                                {/* Right Side/Bottom: Title & Controls */}
                                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', minWidth: isMobile ? '100%' : '240px', gap: isMobile ? '1rem' : '1.5rem' }}>
                                    <div>
                                        <h3 style={{ margin: '0 0 0.5rem 0', color: '#1E293B', fontSize: isMobile ? '1.2rem' : '1.5rem', fontWeight: '800', textAlign: isMobile ? 'center' : 'left' }}>Plot the Equations</h3>
                                        <p style={{ margin: 0, color: '#64748B', fontSize: isMobile ? '0.9rem' : '1rem', textAlign: isMobile ? 'center' : 'left' }}>Draw both lines to find the solution.</p>
                                    </div>

                                    <div style={{ background: '#F1F5F9', padding: '1rem', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
                                        <h4 style={{ margin: '0 0 0.5rem 0', color: '#475569', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Current Points</h4>
                                        <div style={{ fontSize: '0.95rem', color: '#1E293B' }}>
                                            {userLines.length === 0 && <span style={{ color: '#94A3B8', fontStyle: 'italic' }}>No lines drawn yet</span>}
                                            {userLines.map((l, i) => (
                                                <div key={i} style={{ marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#4F46E5' }}></div>
                                                    Line {i + 1}: ({l.p1.x}, {l.p1.y}) to ({l.p2.x}, {l.p2.y})
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div style={{ display: 'flex', gap: '1rem', marginTop: 'auto' }}>
                                        <button
                                            onClick={() => setUserLines([])}
                                            style={{
                                                flex: 1,
                                                padding: '0.8rem',
                                                background: '#FEE2E2', color: '#DC2626', borderRadius: '12px',
                                                fontWeight: '700', cursor: 'pointer', transition: 'all 0.2s', border: '2px solid transparent'
                                            }}
                                            onMouseOver={(e) => e.currentTarget.style.borderColor = '#FCA5A5'}
                                            onMouseOut={(e) => e.currentTarget.style.borderColor = 'transparent'}
                                        >
                                            Reset
                                        </button>
                                        <button
                                            onClick={() => setIsGraphModalOpen(false)}
                                            style={{
                                                flex: 2,
                                                padding: '0.8rem',
                                                background: '#4F46E5', color: 'white', border: 'none', borderRadius: '12px',
                                                fontWeight: '700', cursor: 'pointer', boxShadow: '0 4px 6px -1px rgba(79, 70, 229, 0.4)'
                                            }}
                                        >
                                            Done
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence >

            <ExplanationModal isOpen={showExplanationModal} isCorrect={isCorrect} correctAnswer={currentQuestion.correctAnswer} explanation={currentQuestion.solution} onClose={() => setShowExplanationModal(false)} />

            <footer className="junior-bottom-bar">
                <div className="desktop-footer-controls">
                    <div className="bottom-left">
                        <button className="bg-red-50 text-red-500 px-6 py-2 rounded-xl border-2 border-red-100 font-bold" onClick={() => navigate(-1)}>Exit</button>
                    </div>
                    <div className="bottom-center">
                        {isSubmitted && <button className="view-explanation-btn" onClick={() => setShowExplanationModal(true)}><Eye size={20} /> Explain</button>}
                    </div>
                    <div className="bottom-right">
                        <div style={{ display: 'flex', gap: '10px' }}>
                            <button
                                className="nav-pill-next-btn bg-gray-200 text-gray-600"
                                onClick={handlePrevious}
                                disabled={qIndex === 0}
                                style={{ display: 'flex', alignItems: 'center', gap: '5px', padding: '0.5rem 1rem', borderRadius: '9999px', fontWeight: 'bold' }}
                            >
                                <ChevronLeft size={28} strokeWidth={3} />
                                Prev
                            </button>
                            {isSubmitted ?
                                <button className="nav-pill-next-btn" onClick={handleNext}>Next <ChevronRight /></button> :
                                <button
                                    className="nav-pill-submit-btn"
                                    onClick={handleCheck}
                                    disabled={currentQuestion && currentQuestion.type === 'graphing' ? (userLines.length !== 2 || userInput.x === '' || userInput.y === '') : !selectedOption}
                                >
                                    Submit <Check />
                                </button>
                            }
                        </div>
                    </div>
                </div>
                <div className="mobile-footer-controls">
                    <div className="mobile-footer-right">
                        <button
                            className="nav-pill-next-btn bg-gray-200 text-gray-600 p-2"
                            onClick={handlePrevious}
                            disabled={qIndex === 0}
                            style={{ minWidth: 'auto' }}
                        >
                            <ChevronLeft size={20} />
                        </button>
                        {isSubmitted && <button className="view-explanation-btn" onClick={() => setShowExplanationModal(true)}><Eye size={18} /> Explain</button>}
                        {isSubmitted ?
                            <button className="nav-pill-next-btn" onClick={handleNext}>Next <ChevronRight size={20} /></button> :
                            <button
                                className="nav-pill-submit-btn"
                                onClick={handleCheck}
                                disabled={currentQuestion && currentQuestion.type === 'graphing' ? (userLines.length !== 2 || userInput.x === '' || userInput.y === '') : !selectedOption}
                            >
                                Submit <Check size={20} />
                            </button>
                        }
                    </div>
                </div>
            </footer>
        </div >
    );
};

export default GraphicalMethod;

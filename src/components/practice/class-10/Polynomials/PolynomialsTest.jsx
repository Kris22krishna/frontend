import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, Eye, ChevronRight, ChevronLeft, SkipForward, ArrowLeft, RefreshCw, BarChart3, Clock, HelpCircle, CheckCircle2, XCircle } from 'lucide-react';
import { useSessionLogger } from '@/hooks/useSessionLogger';
import '../TenthPracticeSession.css';
import mascotImg from '../../../../assets/mascot.png';

const NODE_ID = 'a4101002-0010-0000-0000-000000000000'; // Polynomials Chapter Assessment

const getNow = () => Date.now();

const BLUE_THEME_CSS = `
    .option-btn-modern.selected {
        border-color: #3B82F6 !important;
        background-color: #EFF6FF !important;
        color: #1E40AF !important;
        box-shadow: 0 4px 0 #2563EB !important;
    }
    .option-btn-modern {
        min-height: 52px;
        min-width: 300px;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0.5rem 1rem !important;
        text-align: center;
        font-size: 0.95rem;
    }
    .grey-selection-theme {
        --selected-border: #3B82F6;
        --selected-bg: #EFF6FF;
    }
    .exam-report-container {
        max-width: 900px;
        margin: 2rem auto;
        padding: 2rem;
        background: white;
        border-radius: 24px;
        box-shadow: 0 10px 25px rgba(0,0,0,0.05);
    }
    .report-stat-card {
        padding: 1.5rem;
        border-radius: 16px;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.5rem;
        transition: transform 0.2s;
    }
    .report-stat-card:hover {
        transform: translateY(-5px);
    }
    .solution-accordion {
        border: 2px solid #FEF08A;
        border-radius: 16px;
        margin-bottom: 1.5rem;
        overflow: hidden;
        background: white;
    }
    .solution-header {
        padding: 1rem;
        background: #F8FAFC;
        display: flex;
        justify-content: space-between;
        align-items: center;
        cursor: pointer;
    }
    .solution-content {
        padding: 1.5rem;
        background: white;
        border-top: 1px solid #E2E8F0;
    }
    .status-badge {
        padding: 0.25rem 0.75rem;
        border-radius: 9999px;
        font-size: 0.875rem;
        font-weight: 600;
    }
    .status-correct { background: #DCFCE7; color: #166534; }
    .status-wrong { background: #FEE2E2; color: #991B1B; }
    .status-skipped { background: #F1F5F9; color: #475569; }

    .nav-pastel-btn {
        background: linear-gradient(135deg, #3B82F6, #2563EB) !important;
        color: white !important;
        border: none !important;
        box-shadow: 0 4px 15px rgba(59, 130, 246, 0.4) !important;
        transition: all 0.3s ease !important;
        font-weight: 800 !important;
        letter-spacing: 0.5px !important;
    }
    .nav-pastel-btn:hover:not(:disabled) {
        transform: translateY(-2px);
        box-shadow: 0 6px 20px rgba(59, 130, 246, 0.6) !important;
        background: linear-gradient(135deg, #2563EB, #1D4ED8) !important;
    }
    .nav-pastel-btn:disabled {
        background: #E2E8F0 !important;
        color: #94A3B8 !important;
        box-shadow: none !important;
        transform: none !important;
        cursor: not-allowed !important;
    }

    /* Mobile Responsiveness for Practice Session Layout */
    @media (max-width: 1024px) {
        .practice-board-container {
            grid-template-columns: 1fr !important;
            justify-items: center !important;
            margin-bottom: 2rem !important;
        }
        .practice-left-col {
            width: 100% !important;
            max-width: 600px !important;
            margin: 0 auto !important;
        }
        .question-palette-container {
            width: 100% !important;
            max-width: 500px !important;
            margin: 2rem auto 0 auto !important;
            max-height: none !important;
            height: auto !important;
        }
        .options-grid-modern {
            grid-template-columns: 1fr !important;
            justify-items: center !important;
        }
        .practice-content-wrapper {
            padding-bottom: 80px !important;
        }
        .option-btn-modern {
            min-height: 55px;
            font-size: 0.9rem;
            min-width: unset !important;
            width: 100% !important;
            max-width: 350px !important;
            margin: 0 auto !important;
        }
    }
    @media (max-width: 640px) {
        .junior-practice-header {
            padding: 0 1rem !important;
        }
        .practice-content-wrapper {
            padding: 1rem 1rem 80px 1rem !important;
        }
        .question-card-modern {
            padding: 1.5rem !important;
        }
        .question-text-modern {
            font-size: 1.1rem !important;
        }
    }
`;

const SKILL_ID = 1240;
const SKILL_NAME = "Polynomials Chapter Assessment";

const generateQuestions = () => {
    // Pool of questions across all topics
    const qPool = [
        // Types and Degrees
        { text: `Find the degree of the polynomial: $5x^3 - 4x^2 + x - 2$.`, options: [`$3$`, `$2$`, `$5$`, `$1$`], correctAnswer: `$3$`, solution: `The degree is the highest power of $x$, which is 3 in $5x^3$.` },
        { text: `State whether $2x^2 + 5x + 3$ is linear, quadratic, or cubic.`, options: [`Quadratic`, `Linear`, `Cubic`, `Constant`], correctAnswer: `Quadratic`, solution: `The highest power of $x$ is 2, so it is a quadratic polynomial.` },
        // Evaluating and Identifying
        { text: `Find the value of $p(x) = x^2 - 3x - 4$ at $x = -1$.`, options: [`$0$`, `$4$`, `$-8$`, `$8$`], correctAnswer: `$0$`, solution: `$p(-1) = (-1)^2 - 3(-1) - 4 = 1 + 3 - 4 = 0$.` },
        { text: `Check whether $-2$ is a zero of the polynomial $x + 2$.`, options: [`Yes`, `No`, `Cannot be determined`, `Only if $x=0$`], correctAnswer: `Yes`, solution: `Substitute $x = -2$: $(-2) + 2 = 0$. Since it equals 0, $-2$ is a zero.` },
        // Geometrical Interpretation
        { text: `What is the geometrical meaning of the zero of a polynomial $p(x)$?`, options: [`The x-intercept(s) of the graph of $p(x)$`, `The y-intercept of the graph of $p(x)$`, `The vertex of the parabola`, `The origin`], correctAnswer: `The x-intercept(s) of the graph of $p(x)$`, solution: `Geometrically, the zeroes of a polynomial $p(x)$ are the x-coordinates of the points where the graph of $y = p(x)$ intersects the x-axis.` },
        { text: `The graph of a quadratic polynomial $ax^2 + bx + c$ has the shape of a:`, options: [`Parabola`, `Straight line`, `Circle`, `Sine wave`], correctAnswer: `Parabola`, solution: `The graph of a quadratic polynomial is always a parabola.` },
        // Graphical Behaviour
        { text: `How many zeroes does a quadratic polynomial have if its graph intersects the x-axis at two distinct points?`, options: [`$2$`, `$1$`, `$0$`, `$3$`], correctAnswer: `$2$`, solution: `The number of real zeroes is equal to the number of distinct points where the graph intersects the x-axis.` },
        { text: `If a polynomial graph cuts the x-axis at 3 distinct points, how many real zeroes does it have?`, options: [`$3$`, `$2$`, `$1$`, `$0$`], correctAnswer: `$3$`, solution: `The number of intersections with the x-axis corresponds exactly to the number of real zeroes.` },
        // Relationship (Quadratic)
        { text: `Find the sum of the zeroes of the polynomial $x^2 - 5x + 6$.`, options: [`$5$`, `$-5$`, `$6$`, `$-6$`], correctAnswer: `$5$`, solution: `Sum of zeroes $= -\\frac{b}{a} = -\\frac{-5}{1} = 5$.` },
        { text: `Find the product of the zeroes of the polynomial $2x^2 + 7x + 3$.`, options: [`$\\frac{3}{2}$`, `$-\\frac{7}{2}$`, `$3$`, `$2$`], correctAnswer: `$\\frac{3}{2}$`, solution: `Product of zeroes $= \\frac{c}{a} = \\frac{3}{2}$.` },
        { text: `If the sum of zeroes of $kx^2 + 2x + 3k$ is equal to their product, find $k$.`, options: [`$-\\frac{2}{3}$`, `$\\frac{2}{3}$`, `$3$`, `$-3$`], correctAnswer: `$-\\frac{2}{3}$`, solution: `Sum = Product $\\Rightarrow -\\frac{2}{k} = \\frac{3k}{k} = 3 \\Rightarrow k = -\\frac{2}{3}$.` },
        // Constructing Quadratic
        { text: `Find a quadratic polynomial whose sum of zeroes is $4$ and product of zeroes is $3$.`, options: [`$x^2 - 4x + 3$`, `$x^2 + 4x + 3$`, `$x^2 - 3x + 4$`, `$x^2 - 4x - 3$`], correctAnswer: `$x^2 - 4x + 3$`, solution: `Polynomial is $x^2 - (\\text{Sum})x + (\\text{Product}) = x^2 - 4x + 3$.` },
        { text: `Find a quadratic polynomial whose zeroes are $-3$ and $4$.`, options: [`$x^2 - x - 12$`, `$x^2 + x - 12$`, `$x^2 - x + 12$`, `$x^2 + 7x - 12$`], correctAnswer: `$x^2 - x - 12$`, solution: `Sum = $1$, Product = $-12$. Polynomial is $x^2 - x - 12$.` },
        // Relationship (Cubic)
        { text: `Find the sum of the zeroes of the cubic polynomial $2x^3 - 5x^2 - 14x + 8$.`, options: [`$\\frac{5}{2}$`, `$-\\frac{5}{2}$`, `$-7$`, `$4$`], correctAnswer: `$\\frac{5}{2}$`, solution: `Sum of zeroes $= -\\frac{b}{a} = -\\frac{-5}{2} = \\frac{5}{2}$.` },
        { text: `Find the product of the zeroes of the cubic polynomial $3x^3 - 5x^2 - 11x - 3$.`, options: [`$1$`, `$-1$`, `$\\frac{11}{3}$`, `$-\\frac{11}{3}$`], correctAnswer: `$1$`, solution: `Product of zeroes $= -\\frac{d}{a} = -\\frac{-3}{3} = 1$.` },
        // Additional Questions for Variety
        { text: `What is the degree of the polynomial $7x^4 - 2x^3 + 5x^2 - x + 1$?`, options: [`$4$`, `$3$`, `$7$`, `$1$`], correctAnswer: `$4$`, solution: `The degree is the highest power of $x$, which is 4.` },
        { text: `Is the polynomial $p(x) = 3x + 5$ linear, quadratic, or cubic?`, options: [`Linear`, `Quadratic`, `Cubic`, `Constant`], correctAnswer: `Linear`, solution: `The highest power of $x$ is 1, so it is a linear polynomial.` },
        { text: `Find the value of $p(x) = x^2 - 4$ at $x = 2$.`, options: [`$0$`, `$4$`, `$8$`, `$-4$`], correctAnswer: `$0$`, solution: `$p(2) = 2^2 - 4 = 4 - 4 = 0$.` },
        { text: `What are the zeroes of the polynomial $x^2 - 9$?`, options: [`$3, -3$`, `$3, 0$`, `$9, -9$`, `$0, -9$`], correctAnswer: `$3, -3$`, solution: `$x^2 - 9 = 0 \\Rightarrow x^2 = 9 \\Rightarrow x = \\pm 3$.` },
        { text: `Find the sum of the zeroes of $x^2 + 7x + 10$.`, options: [`$-7$`, `$7$`, `$10$`, `$-10$`], correctAnswer: `$-7$`, solution: `Sum of zeroes $= -\\frac{b}{a} = -\\frac{7}{1} = -7$.` },
        { text: `Find the product of the zeroes of $x^2 - 4x + 3$.`, options: [`$3$`, `$-3$`, `$4$`, `$-4$`], correctAnswer: `$3$`, solution: `Product of zeroes $= \\frac{c}{a} = \\frac{3}{1} = 3$.` },
        { text: `Construct a quadratic polynomial whose zeroes are $2$ and $5$.`, options: [`$x^2 - 7x + 10$`, `$x^2 + 7x + 10$`, `$x^2 - 10x + 7$`, `$x^2 + 10x + 7$`], correctAnswer: `$x^2 - 7x + 10$`, solution: `Sum $= 7$, Product $= 10$. Polynomial is $x^2 - 7x + 10$.` },
        { text: `Find a quadratic polynomial with sum of zeroes $0$ and product $-1$.`, options: [`$x^2 - 1$`, `$x^2 + 1$`, `$x^2 + x$`, `$x^2 - x$`], correctAnswer: `$x^2 - 1$`, solution: `Sum $= 0$, Product $= -1$. Polynomial is $x^2 - 0x + (-1) = x^2 - 1$.` },
        { text: `Find the product of the zeroes of the cubic polynomial $x^3 - 6x^2 + 11x - 6$.`, options: [`$6$`, `$-6$`, `$11$`, `$-11$`], correctAnswer: `$6$`, solution: `Product of zeroes $= -\\frac{d}{a} = -\\frac{-6}{1} = 6$.` },
        { text: `The number of zeroes of a polynomial is equal to the number of points where its graph intersects the:`, options: [`x-axis`, `y-axis`, `Origin`, `Both axes`], correctAnswer: `x-axis`, solution: `Zeroes are the x-coordinates of the points where the graph intersects the x-axis.` },
        { text: `If one zero of the quadratic polynomial $x^2 + 3x + k$ is $2$, then the value of $k$ is:`, options: [`$-10$`, `$10$`, `$5$`, `$-5$`], correctAnswer: `$-10$`, solution: `Substitute $x=2$: $2^2 + 3(2) + k = 0 \\Rightarrow 4 + 6 + k = 0 \\Rightarrow k = -10$.` },
        { text: `A cubic polynomial can have at most how many zeroes?`, options: [`$3$`, `$2$`, `$1$`, `$4$`], correctAnswer: `$3$`, solution: `The maximum number of zeroes is equal to the degree of the polynomial.` },
        { text: `If a graph of $p(x)$ does not intersect the x-axis at all, then it has how many real zeroes?`, options: [`$0$`, `$1$`, `$2$`, `Infinite`], correctAnswer: `$0$`, solution: `Real zeroes correspond to x-axis intersections. No intersection means no real zeroes.` },
        { text: `The coefficient of $x$ in a quadratic polynomial $ax^2 + bx + c$ is associated with:`, options: [`Sum of zeroes`, `Product of zeroes`, `Difference of zeroes`, `Degree`], correctAnswer: `Sum of zeroes`, solution: `Sum of zeroes $= -\\frac{b}{a}$.` },
        { text: `If $\\alpha$ and $\\beta$ are zeroes of $x^2 - px + q$, then $\\frac{1}{\\alpha} + \\frac{1}{\\beta}$ is:`, options: [`$\\frac{p}{q}$`, `$\\frac{q}{p}$`, `$-\\frac{p}{q}$`, `$-\\frac{q}{p}$`], correctAnswer: `$\\frac{p}{q}$`, solution: `$\\frac{\\alpha + \\beta}{\\alpha\\beta} = \\frac{p}{q}$.` }
    ];

    // Shuffle and take 20
    const shuffled = qPool.sort(() => Math.random() - 0.5).slice(0, 20);
    return shuffled.map((q, idx) => ({
        id: idx + 1,
        text: q.text,
        options: q.options.sort(() => Math.random() - 0.5),
        correctAnswer: q.correctAnswer,
        solution: q.solution
    }));
};

const PolynomialsTest = () => {
    const navigate = useNavigate();
    const [qIndex, setQIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [timeElapsed, setTimeElapsed] = useState(0);
    const [isTestOver, setIsTestOver] = useState(false);
    const [responses, setResponses] = useState({});

    // Logging states
    const { startSession, logAnswer, finishSession } = useSessionLogger();
    const v4Answers = useRef([]);
    const questionStartTime = useRef(Date.now());
    const accumulatedTime = useRef(0);
    const isTabActive = useRef(true);

    const [questions, setQuestions] = useState(() => generateQuestions());

    useEffect(() => {
        startSession({ nodeId: NODE_ID, sessionType: 'assessment' });
        v4Answers.current = [];

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
            document.removeEventListener("visibilitychange", handleVisibilityChange);
        };
    }, []);

    useEffect(() => {
        if (isTestOver) return;
        const timer = setInterval(() => setTimeElapsed(p => p + 1), 1000);
        return () => clearInterval(timer);
    }, [isTestOver]);

    const handleRecordResponse = () => {
        const currentQ = questions[qIndex];
        const isCorrect = selectedOption ? selectedOption === currentQ.correctAnswer : null;
        
        let t = accumulatedTime.current;
        if (isTabActive.current) t += Date.now() - questionStartTime.current;
        const timeSpent = Math.round(t / 1000);
        const isSkipped = !selectedOption;

        const responseData = {
            selectedOption,
            isCorrect,
            timeTaken: (responses[qIndex]?.timeTaken || 0) + timeSpent,
            isSkipped
        };

        setResponses(prev => ({ ...prev, [qIndex]: responseData }));

        // v4 Log
        const entry = {
            question_index: qIndex + 1,
            answer_json: { selected: selectedOption || "SKIPPED" },
            is_correct: isCorrect ? 1.0 : 0.0,
            marks_awarded: isCorrect ? 1 : 0,
            marks_possible: 1,
            time_taken_ms: t
        };
        v4Answers.current[qIndex] = entry;
        logAnswer({
            questionIndex: entry.question_index,
            answerJson: entry.answer_json,
            isCorrect: entry.is_correct
        });

        const rawUid = sessionStorage.getItem('userId') || localStorage.getItem('userId');
        const uid = parseInt(rawUid, 10);
        if (!isNaN(uid)) {
            const attemptData = {
                difficulty_level: qIndex < 3 ? 'Easy' : qIndex < 6 ? 'Medium' : 'Hard',
                user_id: String(uid).includes("-") ? 1 : parseInt(uid, 10),
                session_id: null,
                skill_id: SKILL_ID,
                question_text: currentQ.text,
                correct_answer: currentQ.correctAnswer,
                student_answer: isSkipped ? "SKIPPED" : selectedOption,
                is_correct: isSkipped ? false : isCorrect,
                solution_text: currentQ.solution,
                time_spent_seconds: timeSpent
            };
            api.recordAttempt(attemptData).catch(console.error);
        }
        // Reset timers for next question
        accumulatedTime.current = 0;
        questionStartTime.current = Date.now();
    };

    const navigateToQuestion = (targetIndex) => {
        handleRecordResponse();
        setQIndex(targetIndex);
        setSelectedOption(responses[targetIndex]?.selectedOption || null);
    };

    const handleNext = () => {
        if (qIndex < questions.length - 1) {
            navigateToQuestion(qIndex + 1);
        } else {
            handleRecordResponse();
            finalizeTest();
        }
    };

    const handlePrev = () => {
        if (qIndex > 0) {
            navigateToQuestion(qIndex - 1);
        }
    };

    const finalizeTest = async () => {
        setIsTestOver(true);
        
        // v4 finish
        const payload = v4Answers.current.filter(Boolean);
        await finishSession({
            totalQuestions: questions.length,
            questionsAnswered: payload.length,
            answersPayload: payload
        });

        const rawUid = sessionStorage.getItem('userId') || localStorage.getItem('userId');
        const uid = parseInt(rawUid, 10);
        if (!isNaN(uid)) {
            const correctCount = Object.values(responses).filter(r => r.isCorrect === true).length;
            const wrongCount = Object.values(responses).filter(r => r.isCorrect === false && !r.isSkipped).length;
            const skippedCount = questions.length - correctCount - wrongCount;
            await api.createReport({
                title: SKILL_NAME,
                type: 'practice',
                score: (correctCount / questions.length) * 100,
                parameters: {
                    skill_id: SKILL_ID,
                    total_questions: questions.length,
                    correct_answers: correctCount,
                    skipped_questions: skippedCount,
                    time_taken_seconds: timeElapsed
                },
                user_id: uid
            }).catch(console.error);
        }
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    if (questions.length === 0) return <div>Loading...</div>;

    if (isTestOver) {
        const correct = Object.values(responses).filter(r => r.isCorrect === true).length;
        const wrong = Object.values(responses).filter(r => r.isCorrect === false && !r.isSkipped).length;
        const skipped = questions.length - correct - wrong;

        return (
            <div className="junior-practice-page grey-selection-theme" style={{ background: '#F8FAFC', minHeight: '100vh', padding: '2rem', overflowY: 'auto' }}>
                <style>{BLUE_THEME_CSS}</style>
                <div className="exam-report-container">
                    <div className="results-hero-section flex flex-col items-center mb-8 mt-4">
                        <img src={mascotImg} alt="Happy Mascot" className="w-40 h-40 mb-2 drop-shadow-lg object-contain" />
                        <h1 className="text-5xl font-black text-[#31326F] mb-2 tracking-tight">Test Report</h1>
                        <p className="text-[#64748B] text-xl font-medium mb-8">How you performed in <span className="font-bold">{SKILL_NAME}</span></p>

                        <div className="results-stats-grid grid grid-cols-2 md:grid-cols-5 gap-4 w-full max-w-5xl">
                            <div className="stat-card bg-[#EFF6FF] p-6 rounded-3xl shadow-sm border-2 border-[#DBEAFE] text-center flex flex-col items-center justify-center">
                                <span className="block text-xs font-black uppercase tracking-widest text-[#3B82F6] mb-1">Score</span>
                                <span className="text-4xl font-black text-[#1E3A8A]">{Math.round((correct / questions.length) * 100)}%</span>
                            </div>
                            <div className="stat-card bg-[#F0FDF4] p-6 rounded-3xl shadow-sm border-2 border-[#DCFCE7] text-center flex flex-col items-center justify-center">
                                <span className="block text-xs font-black uppercase tracking-widest text-[#22C55E] mb-1">Correct</span>
                                <span className="text-4xl font-black text-[#14532D]">{correct}</span>
                            </div>
                            <div className="stat-card bg-[#FEF2F2] p-6 rounded-3xl shadow-sm border-2 border-[#FEE2E2] text-center flex flex-col items-center justify-center">
                                <span className="block text-xs font-black uppercase tracking-widest text-[#EF4444] mb-1">Wrong</span>
                                <span className="text-4xl font-black text-[#7F1D1D]">{wrong}</span>
                            </div>
                            <div className="stat-card bg-[#F8FAFC] p-6 rounded-3xl shadow-sm border-2 border-[#E2E8F0] text-center flex flex-col items-center justify-center">
                                <span className="block text-xs font-black uppercase tracking-widest text-[#64748B] mb-1">Skipped</span>
                                <span className="text-4xl font-black text-[#334155]">{skipped}</span>
                            </div>
                            <div className="stat-card bg-[#EFF6FF] p-6 rounded-3xl shadow-sm border-2 border-[#DBEAFE] text-center flex flex-col items-center justify-center">
                                <span className="block text-xs font-black uppercase tracking-widest text-[#3B82F6] mb-1">Total Time</span>
                                <span className="text-4xl font-black text-[#1E3A8A]">{formatTime(timeElapsed)}</span>
                            </div>
                        </div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '3rem' }}>
                        <button
                            onClick={() => navigate(-1)}
                            className="bg-white text-[#31326F] border-2 border-[#31326F] px-8 py-3 rounded-2xl font-black uppercase tracking-wider hover:bg-[#31326F] hover:text-white transition-colors"
                            style={{ fontSize: '1.1rem', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                        >
                            Back to Topics
                        </button>
                    </div>

                    <div style={{ marginBottom: '2rem', maxWidth: '1000px', marginLeft: 'auto', marginRight: 'auto' }}>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#1E293B', marginBottom: '1.5rem' }}>Detailed Review & Solutions</h2>
                        {questions.map((q, idx) => {
                            const res = responses[idx] || { isSkipped: true, timeTaken: 0 };
                            return (
                                <details key={idx} className="solution-accordion group">
                                    <summary className="solution-header cursor-pointer hover:bg-slate-50 transition-colors" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', listStyle: 'none', width: '100%' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: 1, overflow: 'hidden' }}>
                                            <span style={{ fontWeight: '800', minWidth: '32px', height: '32px', background: '#FBBF24', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', fontSize: '0.9rem', flexShrink: 0 }}>{idx + 1}</span>
                                            <div className="hidden md:block truncate text-sm text-slate-500" style={{ flex: 1, maxWidth: '350px' }}>
                                                <LatexText text={q.text} />
                                            </div>
                                            {res.isSkipped ? <span className="status-badge status-skipped shrink-0">Skipped</span> :
                                                res.isCorrect ? <span className="status-badge status-correct shrink-0">Correct</span> :
                                                    <span className="status-badge status-wrong shrink-0">Incorrect</span>}
                                        </div>
                                        <div style={{ color: '#64748B', display: 'flex', alignItems: 'center', gap: '1rem', flexShrink: 0 }}>
                                            <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-blue-600 font-semibold text-sm whitespace-nowrap">
                                                Check Solution ↓
                                            </span>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                <Clock size={16} /> {res.timeTaken}s
                                            </div>
                                        </div>
                                    </summary>
                                    <div className="solution-content">
                                        <div style={{ marginBottom: '1rem', padding: '1rem', borderLeft: '4px solid #3B82F6', background: '#F8FAFC' }}>
                                            <LatexText text={q.text} />
                                        </div>
                                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
                                            {q.options.map((opt, oIdx) => (
                                                <div key={oIdx} style={{
                                                    padding: '0.75rem', borderRadius: '8px', border: '1px solid #E2E8F0',
                                                    background: opt === q.correctAnswer ? '#DCFCE7' : (opt === res.selectedOption ? '#FEE2E2' : 'white'),
                                                    color: opt === q.correctAnswer ? '#166534' : (opt === res.selectedOption ? '#991B1B' : '#475569')
                                                }}>
                                                    <LatexText text={opt} />
                                                </div>
                                            ))}
                                        </div>

                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                                            <div style={{ background: '#F8FAFC', padding: '1rem', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
                                                <h5 style={{ fontSize: '0.7rem', fontWeight: '800', color: '#94A3B8', textTransform: 'uppercase', marginBottom: '0.5rem', letterSpacing: '0.5px' }}>Your Answer</h5>
                                                {res.isSkipped ? (
                                                    <span style={{ color: '#F59E0B', fontWeight: '700', fontSize: '1.1rem' }}>Skipped</span>
                                                ) : (
                                                    <span style={{ color: res.isCorrect ? '#166534' : '#DC2626', fontWeight: '700', fontSize: '1.1rem' }}>
                                                        {res.selectedOption ? <LatexText text={res.selectedOption} /> : "Skipped"}
                                                    </span>
                                                )}
                                            </div>
                                            <div style={{ background: '#DCFCE7', padding: '1rem', borderRadius: '12px', border: '1px solid #BBF7D0' }}>
                                                <h5 style={{ fontSize: '0.7rem', fontWeight: '800', color: '#166534', textTransform: 'uppercase', marginBottom: '0.5rem', letterSpacing: '0.5px' }}>Correct Answer</h5>
                                                <span style={{ color: '#166534', fontWeight: '700', fontSize: '1.1rem' }}>
                                                    <LatexText text={q.correctAnswer} />
                                                </span>
                                            </div>
                                        </div>

                                        <div style={{ background: '#F0F9FF', padding: '1.5rem', borderRadius: '12px', border: '1px solid #E0F2FE' }}>
                                            <h4 style={{ color: '#0284C7', fontWeight: '800', marginBottom: '1rem', textTransform: 'uppercase', fontSize: '0.85rem', letterSpacing: '0.5px' }}>Solution:</h4>
                                            {(() => {
                                                const steps = q.solution.split(/(?<=\.)\s+(?=[A-Z0-9$])/);
                                                if (steps.length <= 1) {
                                                    return <LatexText text={q.solution} />;
                                                }
                                                return (
                                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                                                        {steps.map((stepStr, sIdx) => (
                                                            <div key={sIdx} style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                                                                <span style={{ fontWeight: '800', color: '#0F172A', fontSize: '0.9rem' }}>Step {sIdx + 1}:</span>
                                                                <span style={{ color: '#334155', lineHeight: '1.6' }}><LatexText text={stepStr.trim()} /></span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                );
                                            })()}
                                        </div>
                                    </div>
                                </details>
                            );
                        })}
                    </div>
                </div>
            </div>
        );
    }
    return (
        <div className="junior-practice-page grey-selection-theme" style={{ fontFamily: '"Open Sans", sans-serif', height: '100vh', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <style>{BLUE_THEME_CSS}</style>
            <header className="junior-practice-header" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) auto minmax(0, 1fr)', alignItems: 'center', padding: '0 2rem', gap: '1rem' }}>
                <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#31326F', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {SKILL_NAME.length > 30 ? "Chapter Test" : SKILL_NAME}
                </div>
                <div className="bg-white/90 backdrop-blur-md px-6 py-2 rounded-full border-2 border-[#3B82F6]/30 text-[#1E40AF] font-black text-xl shadow-lg">
                    {qIndex + 1} / {questions.length}
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl border-2 border-[#3B82F6]/30 text-[#1E40AF] font-bold text-lg shadow-md flex items-center gap-2">
                        <Clock size={20} /> {formatTime(timeElapsed)}
                    </div>
                </div>
            </header>

            <main className="practice-content-wrapper" style={{ flex: 1, padding: '1rem 2rem 2rem 2rem', overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
                <div className="practice-board-container" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) auto', gap: '2rem', maxWidth: '1200px', margin: '0 auto', alignItems: 'stretch', width: '100%', flex: 1, minHeight: 0, marginBottom: '2rem' }}>

                    {/* Left Column: Question Card */}
                    <div className="practice-left-col" style={{ width: "100%", minWidth: 0, height: "100%", display: "flex", flexDirection: "column", justifyContent: "flex-start" }}>
                        <div className="question-card-modern" style={{ padding: "1.5rem", flex: "none", minHeight: "auto", height: "fit-content", display: "flex", flexDirection: "column", justifyContent: "flex-start", margin: "0" }}>
                            <div className="question-header-modern" style={{ flexShrink: 0, marginBottom: "0.5rem" }}>
                                <h2 className="question-text-modern" style={{ fontSize: 'clamp(1rem, 1.8vw, 1.35rem)', maxHeight: 'none', fontWeight: '500', textAlign: 'left', color: '#2D3748', lineHeight: '1.5', marginBottom: '1rem' }}>
                                    <LatexText text={questions[qIndex].text} />
                                </h2>
                            </div>
                            <div className="interaction-area-modern" style={{ marginTop: "1rem", flex: "none" }}>
                                <div className="options-grid-modern" style={{ display: 'grid', gap: '0.75rem', width: '100%', maxWidth: '800px', gridTemplateColumns: 'repeat(2, 1fr)' }}>
                                    {questions[qIndex].options.map((option, idx) => (
                                        <button
                                            key={idx}
                                            className={`option-btn-modern ${selectedOption === option ? 'selected' : ''}`}
                                            onClick={() => setSelectedOption(option)}
                                        >
                                            <LatexText text={option} />
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Question Palette */}
                    <div className="question-palette-container" style={{ width: '300px', background: 'white', padding: '1rem', borderRadius: '24px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)', border: '1px solid #E2E8F0', display: 'flex', flexDirection: 'column', height: 'fit-content' }}>
                        <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#1E293B', marginBottom: '1rem', textAlign: 'center', flexShrink: 0 }}>Question Palette</h3>
                        <div className="palette-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '0.4rem', flex: 1, alignContent: 'start' }}>
                            {questions.map((_, idx) => {
                                const isCurrent = qIndex === idx;
                                const hasResponded = responses[idx] && !responses[idx].isSkipped;
                                const isSkipped = responses[idx] && responses[idx].isSkipped;

                                let btnBg = '#F8FAFC';
                                let btnColor = '#64748B';
                                let btnBorder = '1px solid #E2E8F0';

                                if (isCurrent) {
                                    btnBorder = '2px solid #3B82F6';
                                    btnBg = '#EFF6FF';
                                    btnColor = '#1D4ED8';
                                } else if (hasResponded) {
                                    btnBg = '#DCFCE7';
                                    btnColor = '#166534';
                                    btnBorder = '1px solid #BBF7D0';
                                } else if (isSkipped) {
                                    btnBg = '#FFF7ED';
                                    btnColor = '#C2410C';
                                    btnBorder = '1px solid #FFEDD5';
                                }

                                return (
                                    <button
                                        key={idx}
                                        onClick={() => navigateToQuestion(idx)}
                                        style={{
                                            height: '36px', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            borderRadius: '6px', fontWeight: '700', fontSize: '0.85rem',
                                            cursor: 'pointer', transition: 'all 0.2s',
                                            background: btnBg, color: btnColor, border: btnBorder, padding: '0'
                                        }}
                                        className="hover:shadow-md hover:-translate-y-0.5"
                                    >
                                        {idx + 1}
                                    </button>
                                );
                            })}
                        </div>
                        <div style={{ marginTop: 'auto', paddingTop: '1rem', display: 'grid', gridTemplateColumns: '1fr 1fr', rowGap: '0.5rem', columnGap: '1rem', fontSize: '0.8rem', color: '#64748B' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><div style={{ width: '12px', height: '12px', borderRadius: '3px', background: '#DCFCE7', border: '1px solid #BBF7D0' }}></div> Answered</div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><div style={{ width: '12px', height: '12px', borderRadius: '3px', background: '#FFF7ED', border: '1px solid #FFEDD5' }}></div> Skipped</div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><div style={{ width: '12px', height: '12px', borderRadius: '3px', background: '#F8FAFC', border: '1px solid #E2E8F0' }}></div> Unvisited</div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><div style={{ width: '12px', height: '12px', borderRadius: '3px', background: '#EFF6FF', border: '2px solid #3B82F6' }}></div> Current</div>
                        </div>
                    </div>

                </div>
            </main>

            <footer className="junior-bottom-bar">
                <div className="desktop-footer-controls">
                    <div className="bottom-left">
                        <button className="bg-red-50 text-red-500 px-6 py-2 rounded-xl border-2 border-red-100 font-bold" onClick={() => navigate(-1)}>Exit Test</button>
                    </div>
                    <div className="bottom-right">
                        <div style={{ display: 'flex', gap: '1.5rem' }}>
                            <button className="nav-pill-next-btn nav-pastel-btn" onClick={handlePrev} disabled={qIndex === 0}>
                                <ChevronLeft size={20} /> Previous
                            </button>
                            <button className="nav-pill-next-btn nav-pastel-btn" onClick={handleNext}>
                                {qIndex === questions.length - 1 ? "Finish Test" : "Next Question"} <ChevronRight size={20} />
                            </button>
                        </div>
                    </div>
                </div>
                <div className="mobile-footer-controls" style={{ justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
                    <div className="mobile-footer-left">
                        <button className="bg-red-50 text-red-500 px-3 py-2 rounded-xl border-2 border-red-100 font-bold" style={{ fontSize: '0.8rem', display: 'flex', alignItems: 'center' }} onClick={() => navigate(-1)}>
                            Exit
                        </button>
                    </div>
                    <div className="mobile-footer-right" style={{ display: 'flex', gap: '5px' }}>
                        <button
                            className="nav-pill-next-btn bg-gray-200 text-gray-600"
                            onClick={handlePrev}
                            disabled={qIndex === 0}
                            style={{ display: 'flex', alignItems: 'center', padding: '0.4rem 0.8rem', borderRadius: '9999px', fontWeight: 'bold', fontSize: '0.8rem' }}
                        >
                            <ChevronLeft size={16} strokeWidth={3} /> Prev
                        </button>
                        <button
                            className="nav-pill-next-btn"
                            style={{ display: 'flex', alignItems: 'center', padding: '0.4rem 0.8rem', borderRadius: '9999px', fontWeight: 'bold', fontSize: '0.8rem' }}
                            onClick={handleNext}
                        >
                            {qIndex === questions.length - 1 ? "Finish" : "Next"} <ChevronRight size={16} strokeWidth={3} />
                        </button>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default PolynomialsTest;

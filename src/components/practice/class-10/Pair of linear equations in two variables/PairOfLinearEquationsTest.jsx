import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, Eye, ChevronRight, ChevronLeft, SkipForward, ArrowLeft, RefreshCw, BarChart3, Clock, HelpCircle, CheckCircle2, XCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../../../../services/api';
import { LatexText } from '../../../LatexText';
import '../../../../pages/juniors/JuniorPracticeSession.css';
import mascotImg from '../../../../assets/mascot.png';

const BLUE_THEME_CSS = `
    .option-btn-modern.selected {
        border-color: #3B82F6 !important;
        background-color: #EFF6FF !important;
        color: #1E40AF !important;
        box-shadow: 0 4px 0 #2563EB !important;
    }
    .option-btn-modern {
        min-height: 65px;
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

const SKILL_ID = 1209;
const SKILL_NAME = "Pair of Linear Equations in Two Variables - Chapter Test";

const PairOfLinearEquationsTest = () => {
    const navigate = useNavigate();
    const [qIndex, setQIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [timeElapsed, setTimeElapsed] = useState(0);
    const [isTestOver, setIsTestOver] = useState(false);
    const [responses, setResponses] = useState({}); // Stores { qIndex: { selected, isCorrect, timeTaken, isSkipped } }

    // Timer refs
    const questionStartTime = useRef(Date.now());
    const [sessionId, setSessionId] = useState(null);
    const [questions, setQuestions] = useState([]);

    const generateQuestions = () => {
        return [
            {
                id: 1,
                text: "Which of the following values of $x$ and $y$ satisfy the equations $x + y = 5$ and $2x - 3y = 0$?",
                options: ["$x = 3, y = 2$", "$x = 2, y = 3$", "$x = 4, y = 1$", "$x = 5, y = 0$"],
                correctAnswer: "$x = 3, y = 2$",
                solution: "Substitute $x=3, y=2$ into $x+y=5$: $3+2=5$ (True). Into $2x-3y=0$: $2(3)-3(2)=6-6=0$ (True)."
            },
            {
                id: 2,
                text: "The pair of linear equations $a_1x + b_1y + c_1 = 0$ and $a_2x + b_2y + c_2 = 0$ is inconsistent if:",
                options: ["$\\frac{a_1}{a_2}$ ≠ $\\frac{b_1}{b_2}$", "$\\frac{a_1}{a_2} = \\frac{b_1}{b_2} = \\frac{c_1}{c_2}$", "$\\frac{a_1}{a_2} = \\frac{b_1}{b_2}$ ≠ $\\frac{c_1}{c_2}$", "$\\frac{a_1}{a_2}$ ≠ $\\frac{c_1}{c_2}$"],
                correctAnswer: "$\\frac{a_1}{a_2} = \\frac{b_1}{b_2}$ ≠ $\\frac{c_1}{c_2}$",
                solution: "Inconsistent means no solution (parallel lines). This occurs when $\\frac{a_1}{a_2} = \\frac{b_1}{b_2}$ ≠ $\\frac{c_1}{c_2}$."
            },
            {
                id: 3,
                text: "A boat goes 30 km upstream and 44 km downstream in 10 hours. In 13 hours, it can go 40 km upstream and 55 km downstream. Formulate the equations to find the speeds.",
                options: [
                    "$\\tfrac{30}{x-y} + \\tfrac{44}{x+y} = 10$, $\\tfrac{40}{x-y} + \\tfrac{55}{x+y} = 13$",
                    "$30(x-y) + 44(x+y) = 10$, $40(x-y) + 55(x+y) = 13$",
                    "$\\tfrac{x-y}{30} + \\tfrac{x+y}{44} = 10$, $\\tfrac{x-y}{40} + \\tfrac{x+y}{55} = 13$",
                    "$x-y = 30$, $x+y = 44$"
                ],
                correctAnswer: "$\\tfrac{30}{x-y} + \\tfrac{44}{x+y} = 10$, $\\tfrac{40}{x-y} + \\tfrac{55}{x+y} = 13$",
                solution: "Let speed of boat be $x$ and stream be $y$. Speed Upstream = $x-y$, Downstream = $x+y$. Time = Distance/Speed."
            },
            {
                id: 4,
                text: "Find the value of $k$ for which the pair of equations $x + 2y = 3$ and $5x + ky + 7 = 0$ has no solution.",
                options: ["$k = 10$", "$k = 5$", "$k = 2$", "$k = 15$"],
                correctAnswer: "$k = 10$",
                solution: "No solution: $\\frac{a_1}{a_2} = \\frac{b_1}{b_2}$ ≠ $\\frac{c_1}{c_2}$. $\\frac{1}{5} = \\frac{2}{k} \\Rightarrow k=10$. Check: $\\frac{3}{-7}$ ≠ $\\frac{1}{5}$. Correct."
            },
            {
                id: 5,
                text: "If the lines represented by $3x + 2ky = 2$ and $2x + 5y + 1 = 0$ are parallel, then the value of $k$ is:",
                options: ["$k = \\frac{15}{4}$", "$k = \\frac{3}{2}$", "$k = \\frac{5}{6}$", "$k = \\frac{4}{15}$"],
                correctAnswer: "$k = \\frac{15}{4}$",
                solution: "Parallel lines: $\\frac{a_1}{a_2} = \\frac{b_1}{b_2} \\Rightarrow \\frac{3}{2} = \\frac{2k}{5} \\Rightarrow 15 = 4k \\Rightarrow k = \\frac{15}{4}$."
            },
            {
                id: 6,
                text: "The graphical representation of $x = -2$ is a line:",
                options: ["parallel to y-axis", "parallel to x-axis", "passing through origin", "on the x-axis"],
                correctAnswer: "parallel to y-axis",
                solution: "$x=-2$ is a vertical line. All vertical lines are parallel to the y-axis."
            },
            {
                id: 7,
                text: "A fraction becomes $\\frac{1}{3}$ when 1 is subtracted from the numerator and it becomes $\\frac{1}{4}$ when 8 is added to its denominator. Find the fraction.",
                options: ["$\\frac{5}{12}$", "$\\frac{7}{15}$", "$\\frac{4}{11}$", "$\\frac{3}{10}$"],
                correctAnswer: "$\\frac{5}{12}$",
                solution: "Let fraction be $\\frac{x}{y}$. $\\frac{x-1}{y} = \\frac{1}{3} \\Rightarrow 3x-y=3$. $\\frac{x}{y+8}=\\frac{1}{4} \\Rightarrow 4x-y=8$. Subtract: $x=5$. Then $15-y=3 \\Rightarrow y=12$."
            },
            {
                id: 8,
                text: "The path of a train A is given by the equation $x + 2y - 4 = 0$ and the path of another train B is given by $2x + 4y - 12 = 0$. Represent this situation geometrically.",
                options: ["Parallel lines", "Intersecting lines", "Coincident lines", "Perpendicular lines"],
                correctAnswer: "Parallel lines",
                solution: "Ratios: $\\frac{a_1}{a_2} = \\frac{1}{2}, \\frac{b_1}{b_2} = \\frac{2}{4} = \\frac{1}{2}, \\frac{c_1}{c_2} = \\frac{-4}{-12} = \\frac{1}{3}$. Since $\\frac{a_1}{a_2} = \\frac{b_1}{b_2}$ ≠ $\\frac{c_1}{c_2}$, they are parallel lines."
            },
            {
                id: 9,
                text: "Solve for $x$ and $y$: $0.2x + 0.3y = 1.3, 0.4x + 0.5y = 2.3$.",
                options: ["$x=3, y=2$", "$x=2, y=3$", "$x=5, y=1$", "$x=1, y=4$"],
                correctAnswer: "$x=3, y=2$",
                solution: "Multiply both by 10: $2x+3y=13, 4x+5y=23$. Multiply 1st by 2: $4x+6y=26$. Subtract: $y=3$. Then $2x+9=13 \\Rightarrow 2x=4 \\Rightarrow x=2$. Wait, check $4(2)+5(3)=8+15=23$. Yes."
            },
            {
                id: 10,
                text: "The cost of 5 oranges and 3 apples is ₹35 and the cost of 2 oranges and 4 apples is ₹28. Formulate the system.",
                options: ["$5x + 3y = 35, 2x + 4y = 28$", "$5x - 3y = 35, 2x - 4y = 28$", "$3x + 5y = 35, 4x + 2y = 28$", "$x + y = 35, x + y = 28$"],
                correctAnswer: "$5x + 3y = 35, 2x + 4y = 28$",
                solution: "Let $x$ be cost of 1 orange, $y$ be cost of 1 apple. Equations are $5x+3y=35$ and $2x+4y=28$."
            },
            {
                id: 11,
                text: "The taxi charges in a city consist of a fixed charge together with the charge for the distance covered. For a distance of 10 km, the charge paid is ₹105 and for 15 km, ₹155. Find the fixed charge.",
                options: ["₹5", "₹10", "₹15", "₹20"],
                correctAnswer: "₹5",
                solution: "$x + 10y = 105, x + 15y = 155$. Subtracting gives $5y = 50 \\Rightarrow y=10$. Then $x + 100 = 105 \\Rightarrow x=5$."
            },
            {
                id: 12,
                text: "For what value of $p$ does the system $4x + py + 8 = 0$ and $2x + 2y + 2 = 0$ have a unique solution?",
                options: ["$p$ ≠ $4$", "$p = 4$", "$p$ ≠ $2$", "$p = 2$"],
                correctAnswer: "$p$ ≠ $4$",
                solution: "Unique solution: $\\frac{a_1}{a_2}$ ≠ $\\frac{b_1}{b_2} \\Rightarrow \\frac{4}{2}$ ≠ $\\frac{p}{2} \\Rightarrow 2$ ≠ $p/2 \\Rightarrow p$ ≠ $4$."
            },
            {
                id: 13,
                text: "Find the dimensions of a rectangular garden whose perimeter is 36 m and length is 4 m more than its width.",
                options: ["$20$ m, $16$ m", "$11$ m, $7$ m", "$15$ m, $11$ m", "$10$ m, $6$ m"],
                correctAnswer: "$11$ m, $7$ m",
                solution: "Let width be $x$, length be $x+4$. Perimeter $2(x + x+4) = 36 \\Rightarrow 2(2x+4) = 36 \\Rightarrow 2x+4 = 18 \\Rightarrow 2x = 14 \\Rightarrow x=7$. Thus length is 11m."
            },
            {
                id: 14,
                text: "Solve: $\\frac{10}{x} + \\frac{2}{y} = 4$ and $\\frac{15}{x} - \\frac{5}{y} = -2$.",
                options: ["$x=5, y=1$", "$x=2, y=3$", "$x=3, y=5$", "$x=1, y=5$"],
                correctAnswer: "$x=5, y=1$",
                solution: "Let $\\frac{1}{x}=u, \\frac{1}{y}=v$. $10u+2v=4, 15u-5v=-2$. Multiply 1st by 5, 2nd by 2: $50u+10v=20, 30u-10v=-4$. Add: $80u=16 \\Rightarrow u=\\frac{1}{5} \\Rightarrow x=5$. Then $2+2v=4 \\Rightarrow v=1 \\Rightarrow y=1$."
            },
            {
                id: 15,
                text: "The larger of two supplementary angles exceeds the smaller by 18 degrees. Find the angles.",
                options: ["$99^\\circ, 81^\\circ$", "$100^\\circ, 80^\\circ$", "$110^\\circ, 70^\\circ$", "$90^\\circ, 90^\\circ$"],
                correctAnswer: "$99^\\circ, 81^\\circ$",
                solution: "$x + y = 180, x - y = 18$. Add: $2x = 198 \\Rightarrow x = 99$. Then $y = 81$."
            },
            {
                id: 16,
                text: "Is the point (3, 4) a solution to $x + y = 7$ and $3x - 2y = 1$?",
                options: ["Yes", "No"],
                correctAnswer: "Yes",
                solution: "$3+4=7$ (True). $3(3)-2(4) = 9-8=1$ (True). Yes."
            },
            {
                id: 17,
                text: "Formulate: 5 pencils and 7 pens cost ₹50, whereas 7 pencils and 5 pens cost ₹46.",
                options: [
                    "$5x + 7y = 50$, $7x + 5y = 46$",
                    "$5x - 7y = 50$, $7x - 5y = 46$",
                    "$7x + 5y = 50$, $5x + 7y = 46$",
                    "$x + y = 50$, $x + y = 46$"
                ],
                correctAnswer: "$5x + 7y = 50$, $7x + 5y = 46$",
                solution: "Direct formulation: $5$ pencils and $7$ pens for ₹50 $\\Rightarrow 5x+7y=50$."
            },
            {
                id: 18,
                text: "A system of two linear equations is called dependent consistent if it has:",
                options: ["Infinitely many solutions", "No solution", "One unique solution", "Exactly two solutions"],
                correctAnswer: "Infinitely many solutions",
                solution: "Dependent consistent system means the lines overlap (coincident), thus having infinitely many solutions."
            },
            {
                id: 19,
                text: "Find $k$ if $x=2, y=1$ is a solution of $2x + 3y = k$.",
                options: ["$7$", "$5$", "$4$", "$6$"],
                correctAnswer: "$7$",
                solution: "$2(2) + 3(1) = 4 + 3 = 7$. Thus $k=7$."
            },
            {
                id: 20,
                text: "If $2x + y = 23$ and $4x - y = 19$, find the value of $5y - 2x$.",
                options: ["$31$", "$37$", "$25$", "$0$"],
                correctAnswer: "$31$",
                solution: "Add: $6x = 42 \\Rightarrow x = 7$. Then $14 + y = 23 \\Rightarrow y = 9$. $5(9) - 2(7) = 45 - 14 = 31$."
            },
            {
                id: 21,
                text: "The sum of a two-digit number and the number obtained by reversing the digits is 66. If the digits of the number differ by 2, find the number.",
                options: ["$42, 24$", "$53, 35$", "$64, 46$", "$20, 02$"],
                correctAnswer: "$42, 24$",
                solution: "$(10x+y) + (10y+x) = 66 \\Rightarrow 11x+11y=66 \\Rightarrow x+y=6$. $x-y=2$. Add: $2x=8 \\Rightarrow x=4, y=2$. Numbers are 42 and 24."
            },
            {
                id: 22,
                text: "Solve by substitution: $x - y = 3, \\frac{x}{3} + \\frac{y}{2} = 6$.",
                options: ["$x=9, y=6$", "$x=7, y=4$", "$x=6, y=3$", "$x=12, y=9$"],
                correctAnswer: "$x=9, y=6$",
                solution: "$x = y+3$. Substitute: $\\frac{y+3}{3} + \\frac{y}{2} = 6$. Multiply by 6: $2y+6 + 3y = 36 \\Rightarrow 5y = 30 \\Rightarrow y=6, x=9$."
            },
            {
                id: 23,
                text: "Two lines are coincident if:",
                options: ["$\\frac{a_1}{a_2} = \\frac{b_1}{b_2} = \\frac{c_1}{c_2}$", "$\\frac{a_1}{a_2}$ ≠ $\\frac{b_1}{b_2}$", "$\\frac{a_1}{a_2} = \\frac{b_1}{b_2}$ ≠ $\\frac{c_1}{c_2}$", "None of these"],
                correctAnswer: "$\\frac{a_1}{a_2} = \\frac{b_1}{b_2} = \\frac{c_1}{c_2}$",
                solution: "Coincident lines overlap everywhere, which happens when all coefficient and constant ratios are equal ($\\frac{a_1}{a_2} = \\frac{b_1}{b_2} = \\frac{c_1}{c_2}$)."
            },
            {
                id: 24,
                text: "Solve: $x + y = a-b$ and $ax - by = a^2+b^2$.",
                options: ["$x=a, y=-b$", "$x=b, y=-a$", "$x=a+b, y=0$", "$x=a-b, y=a+b$"],
                correctAnswer: "$x=a, y=-b$",
                solution: "From 1st: $y = a-b-x$. Subst into 2nd: $ax - b(a-b-x) = a^2+b^2 \\Rightarrow ax - ab + b^2 + bx = a^2+b^2 \\Rightarrow x(a+b) = a^2+ab \\Rightarrow x(a+b) = a(a+b) \\Rightarrow x=a$. Then $y = a-b-a = -b$."
            },
            {
                id: 25,
                text: "The area of a rectangle gets reduced by 9 square units if its length is reduced by 5 units and breadth is increased by 3 units. Formulate the equation.",
                options: ["$(x-5)(y+3) = xy - 9$", "$(x+5)(y-3) = xy - 9$", "$(x-5)(y-3) = xy + 9$", "$xy - 5x + 3y = 9$"],
                correctAnswer: "$(x-5)(y+3) = xy - 9$",
                solution: "Initial area $xy$. New area $(x-5)(y+3)$. Condition: $(x-5)(y+3) = xy - 9$."
            }
        ];
    };

    useEffect(() => {
        setQuestions(generateQuestions());
        const rawUid = sessionStorage.getItem('userId') || localStorage.getItem('userId');
        const uid = parseInt(rawUid, 10);
        if (!isNaN(uid)) {
            api.createPracticeSession(String(uid).includes("-") ? 1 : parseInt(uid, 10), SKILL_ID).then(sess => {
                if (sess && sess.session_id) setSessionId(sess.session_id);
            });
        }
    }, []);

    useEffect(() => {
        if (isTestOver) return;
        const timer = setInterval(() => setTimeElapsed(p => p + 1), 1000);
        return () => clearInterval(timer);
    }, [isTestOver]);

    const handleRecordResponse = () => {
        const currentQ = questions[qIndex];
        const isCorrect = selectedOption ? selectedOption === currentQ.correctAnswer : null;
        const timeSpent = Math.round((Date.now() - questionStartTime.current) / 1000);
        const isSkipped = !selectedOption;

        const responseData = {
            selectedOption,
            isCorrect,
            timeTaken: (responses[qIndex]?.timeTaken || 0) + timeSpent,
            isSkipped
        };

        setResponses(prev => ({ ...prev, [qIndex]: responseData }));

        const rawUid = sessionStorage.getItem('userId') || localStorage.getItem('userId');
        const uid = parseInt(rawUid, 10);
        if (!isNaN(uid)) {
            const attemptData = {
                difficulty_level: qIndex < 3 ? 'Easy' : qIndex < 6 ? 'Medium' : 'Hard',
                user_id: String(uid).includes("-") ? 1 : parseInt(uid, 10),
                session_id: sessionId,
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
    };

    const navigateToQuestion = (targetIndex) => {
        handleRecordResponse();
        setQIndex(targetIndex);
        setSelectedOption(responses[targetIndex]?.selectedOption || null);
        questionStartTime.current = Date.now();
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
        if (sessionId) await api.finishSession(sessionId).catch(console.error);

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
                                                const steps = q.solution.split(/(?<=\.)\s+(?=[A-Z0-9\$])/);
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
                    {SKILL_NAME}
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

            <main className="practice-content-wrapper" style={{ flex: 1, padding: '1rem 2rem 140px 2rem', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                <div className="practice-board-container" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) auto', gap: '2rem', maxWidth: '1200px', margin: '0 auto', alignItems: 'stretch', width: '100%', flex: 1, minHeight: 0, marginBottom: '60px' }}>

                    {/* Left Column: Question Card */}
                    <div className="practice-left-col" style={{ width: "100%", minWidth: 0, height: "100%", display: "flex", flexDirection: "column", justifyContent: "flex-start" }}>
                        <div className="question-card-modern" style={{ padding: "2rem", flex: "none", minHeight: "auto", height: "fit-content", display: "flex", flexDirection: "column", justifyContent: "flex-start", margin: "0" }}>
                            <div className="question-header-modern" style={{ flexShrink: 0, marginBottom: "0.5rem" }}>
                                <h2 className="question-text-modern" style={{ fontSize: 'clamp(1rem, 1.8vw, 1.35rem)', maxHeight: 'none', fontWeight: '500', textAlign: 'left', color: '#2D3748', lineHeight: '1.5', marginBottom: '1rem' }}>
                                    <LatexText text={questions[qIndex].text} />
                                </h2>
                            </div>
                            <div className="interaction-area-modern" style={{ marginTop: "1.5rem", flex: "none" }}>
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
                    <div className="question-palette-container" style={{ width: '300px', background: 'white', padding: '1.5rem', borderRadius: '24px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)', border: '1px solid #E2E8F0', display: 'flex', flexDirection: 'column', height: '100%', maxHeight: 'calc(100vh - 220px)' }}>
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
                <div className="mobile-footer-controls" style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
                    <div className="mobile-footer-left">
                        <button className="bg-red-50 text-red-500 px-3 py-2 rounded-xl border-2 border-red-100 font-bold" style={{ fontSize: '0.8rem', display: 'flex', alignItems: 'center' }} onClick={() => navigate(-1)}>
                            Exit
                        </button>
                    </div>
                    <div className="mobile-footer-center" style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
                        {isSubmitted && <button className="view-explanation-btn" style={{ fontSize: '0.7rem', padding: '0.3rem 0.5rem' }} onClick={() => setShowExplanationModal(true)}><Eye size={14} /> VIEW EXPLANATION</button>}
                    </div>
                    <div className="mobile-footer-right" style={{ display: 'flex', gap: '5px' }}>
                        <button
                            className="nav-pill-next-btn bg-gray-200 text-gray-600"
                            onClick={handlePrevious}
                            disabled={qIndex === 0}
                            style={{ display: 'flex', alignItems: 'center', padding: '0.4rem 0.8rem', borderRadius: '9999px', fontWeight: 'bold', fontSize: '0.8rem' }}
                        >
                            <ChevronLeft size={16} strokeWidth={3} /> Prev
                        </button>
                        {isSubmitted ? (
                            <button className="nav-pill-next-btn" style={{ display: 'flex', alignItems: 'center', padding: '0.4rem 0.8rem', borderRadius: '9999px', fontWeight: 'bold', fontSize: '0.8rem' }} onClick={handleNext}>Next <ChevronRight size={16} strokeWidth={3} /></button>
                        ) : (
                            <button className="nav-pill-submit-btn" style={{ display: 'flex', alignItems: 'center', padding: '0.4rem 0.8rem', borderRadius: '9999px', fontWeight: 'bold', fontSize: '0.8rem' }} onClick={handleCheck} disabled={!selectedOption}>Submit <Check size={16} strokeWidth={3} /></button>
                        )}
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default PairOfLinearEquationsTest;

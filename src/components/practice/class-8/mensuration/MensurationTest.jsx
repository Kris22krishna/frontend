import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, ChevronRight, ChevronLeft } from 'lucide-react';
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
        background: linear-gradient(135deg, #8BA4F9, #A3B8FA) !important;
        color: white !important;
        border: none !important;
        box-shadow: 0 4px 15px rgba(139, 164, 249, 0.4) !important;
        transition: all 0.3s ease !important;
    }
    .nav-pastel-btn:hover:not(:disabled) {
        transform: translateY(-2px);
        box-shadow: 0 6px 20px rgba(139, 164, 249, 0.5) !important;
        background: linear-gradient(135deg, #7C98F8, #92ABF9) !important;
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

const SKILL_ID = 8012; // Dummy specific ID for Grade 8
const SKILL_NAME = "Mensuration - Chapter Test";

const MensurationTest = () => {
    const navigate = useNavigate();
    const [qIndex, setQIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [timeElapsed, setTimeElapsed] = useState(0);
    const [isTestOver, setIsTestOver] = useState(false);
    const [responses, setResponses] = useState({});

    const questionStartTime = useRef(Date.now());
    const [sessionId, setSessionId] = useState(null);
    const [questions, setQuestions] = useState([]);

    const generateQuestions = () => {
        const pool = [
            {
                id: 1,
                text: "The area of a rhombus is $240\\text{ cm}^2$ and one of the diagonals is $16\\text{ cm}$. Find the other diagonal.",
                options: ["$30\\text{ cm}$", "$25\\text{ cm}$", "$20\\text{ cm}$", "$40\\text{ cm}$"],
                correctAnswer: "$30\\text{ cm}$",
                solution: "Area $= \\frac{1}{2} d_1 d_2 \\Rightarrow 240 = \\frac{1}{2} \\times 16 \\times d_2 \\Rightarrow d_2 = \\frac{240}{8} = 30\\text{ cm}$."
            },
            {
                id: 2,
                text: "The total surface area of a cube is $600\\text{ cm}^2$. The length of its edge is:",
                options: ["$10\\text{ cm}$", "$20\\text{ cm}$", "$8\\text{ cm}$", "$12\\text{ cm}$"],
                correctAnswer: "$10\\text{ cm}$",
                solution: "TSA $= 6a^2 \Rightarrow 6a^2 = 600 \Rightarrow a^2 = 100 \Rightarrow a = 10\\text{ cm}$."
            },
            {
                id: 3,
                text: "What is the area of a trapezium whose parallel sides are $10\\text{ cm}$ and $12\\text{ cm}$ and height is $4\\text{ cm}$?",
                options: ["$44\\text{ cm}^2$", "$88\\text{ cm}^2$", "$48\\text{ cm}^2$", "$40\\text{ cm}^2$"],
                correctAnswer: "$44\\text{ cm}^2$",
                solution: "Area $= \\frac{1}{2}(a+b)h = \\frac{1}{2}(10+12) \\times 4 = 22 \\times 2 = 44\\text{ cm}^2$."
            },
            {
                id: 4,
                text: "If the radius of a cylinder is $r$ and its height is $h$, then the volume of the cylinder is:",
                options: ["$\\pi r^2 h$", "$2\\pi r h$", "$2\\pi r(r+h)$", "$\\pi r h^2$"],
                correctAnswer: "$\\pi r^2 h$",
                solution: "The formula for the volume of a cylinder is $\\pi r^2 h$."
            },
            {
                id: 5,
                text: "How many small cubes of side $2\\text{ cm}$ can be put in a cubical box of side $6\\text{ cm}$?",
                options: ["$27$", "$9$", "$12$", "$18$"],
                correctAnswer: "$27$",
                solution: "Volume of big cube $= 6^3 = 216$. Volume of small cube $= 2^3 = 8$. Number of cubes $= 216 / 8 = 27$."
            },
            {
                id: 6,
                text: "A cuboid has dimensions $4\\text{ cm} \\times 3\\text{ cm} \\times 2\\text{ cm}$. Its total surface area is:",
                options: ["$52\\text{ cm}^2$", "$24\\text{ cm}^2$", "$48\\text{ cm}^2$", "$56\\text{ cm}^2$"],
                correctAnswer: "$52\\text{ cm}^2$",
                solution: "TSA $= 2(lb + bh + hl) = 2(12 + 6 + 8) = 2(26) = 52\\text{ cm}^2$."
            },
            {
                id: 7,
                text: "A rectangular piece of paper $11\\text{ cm} \\times 4\\text{ cm}$ is folded without overlapping to make a cylinder of height $4\\text{ cm}$. Find its volume.",
                options: ["$38.5\\text{ cm}^3$", "$44\\text{ cm}^3$", "$36\\text{ cm}^3$", "$22\\text{ cm}^3$"],
                correctAnswer: "$38.5\\text{ cm}^3$",
                solution: "The length becomes the circumference. $2\\pi r = 11 \Rightarrow 2 \\times \\frac{22}{7} \\times r = 11 \Rightarrow r = \\frac{7}{4}$. Volume $= \\pi r^2 h = \\frac{22}{7} \\times \\frac{7}{4} \\times \\frac{7}{4} \\times 4 = 38.5\\text{ cm}^3$."
            },
            {
                id: 8,
                text: "The volume of a cube is $1000\\text{ cm}^3$. Find its total surface area.",
                options: ["$600\\text{ cm}^2$", "$400\\text{ cm}^2$", "$100\\text{ cm}^2$", "$800\\text{ cm}^2$"],
                correctAnswer: "$600\\text{ cm}^2$",
                solution: "$a^3 = 1000 \Rightarrow a = 10$. TSA $= 6a^2 = 6(100) = 600\\text{ cm}^2$."
            },
            {
                id: 9,
                text: "A cylinder's radius is halved and height is doubled. What will be its new volume compared to the original?",
                options: ["Half", "Same", "Double", "One-fourth"],
                correctAnswer: "Half",
                solution: "New Volume $= \\pi (r/2)^2 (2h) = \\pi (r^2/4) \\cdot 2h = \\frac{1}{2} \\pi r^2 h$. Thus it is half."
            },
            {
                id: 10,
                text: "If length, breadth and height of a cuboid are in the ratio $1:2:3$ and its total surface area is $88\\text{ cm}^2$, find its volume.",
                options: ["$48\\text{ cm}^3$", "$64\\text{ cm}^3$", "$24\\text{ cm}^3$", "$16\\text{ cm}^3$"],
                correctAnswer: "$48\\text{ cm}^3$",
                solution: "Let dimensions be $x, 2x, 3x$. TSA $= 2(2x^2 + 6x^2 + 3x^2) = 2(11x^2) = 22x^2 = 88 \\Rightarrow x^2 = 4 \\Rightarrow x=2$. Volume $= x \\times 2x \\times 3x = 6x^3 = 6(8) = 48\\text{ cm}^3$."
            },
            {
                id: 11,
                text: "If the length of a diagonal of a square is $10\\sqrt{2}\\text{ cm}$, find its area.",
                options: ["$100\\text{ cm}^2$", "$200\\text{ cm}^2$", "$50\\text{ cm}^2$", "$150\\text{ cm}^2$"],
                correctAnswer: "$100\\text{ cm}^2$",
                solution: "Side of square $a = \\frac{d}{\\sqrt{2}} = 10$. Area $= a^2 = 100\\text{ cm}^2$."
            },
            {
                id: 12,
                text: "The area of a rhombus is $120\\text{ cm}^2$ and one of the diagonals is $24\\text{ cm}$. Find the perimeter of the rhombus.",
                options: ["$52\\text{ cm}$", "$40\\text{ cm}$", "$60\\text{ cm}$", "$48\\text{ cm}$"],
                correctAnswer: "$52\\text{ cm}$",
                solution: "Area $= \\frac{1}{2} d_1 d_2 \\Rightarrow 120 = \\frac{1}{2} \\times 24 \\times d_2 \\Rightarrow d_2 = 10\\text{ cm}$. The diagonals bisect at right angles. Half diagonals are $12$ and $5$. Side $= \\sqrt{12^2 + 5^2} = \\sqrt{169} = 13$, Perimeter $= 4 \\times 13 = 52\\text{ cm}$."
            },
            {
                id: 13,
                text: "Volume of a cylinder with radius $7\\text{ cm}$ and height $10\\text{ cm}$ is:",
                options: ["$1540\\text{ cm}^3$", "$154\\text{ cm}^3$", "$770\\text{ cm}^3$", "$3080\\text{ cm}^3$"],
                correctAnswer: "$1540\\text{ cm}^3$",
                solution: "$V = \\pi r^2 h = \\frac{22}{7} \\times 7^2 \\times 10 = 22 \\times 7 \\times 10 = 1540\\text{ cm}^3$."
            },
            {
                id: 14,
                text: "How many litres of water can a cuboidal tank of dimensions $2\\text{ m} \\times 1.5\\text{ m} \\times 1\\text{ m}$ hold?",
                options: ["$3000\\text{ L}$", "$300\\text{ L}$", "$30\\text{ L}$", "$30000\\text{ L}$"],
                correctAnswer: "$3000\\text{ L}$",
                solution: "Volume $= 2 \\times 1.5 \\times 1 = 3\\text{ m}^3$. Since $1\\text{ m}^3 = 1000\\text{ L}$, capacity $= 3000\\text{ L}$."
            },
            {
                id: 15,
                text: "The lateral surface area of a cube is $256\\text{ m}^2$. The volume of the cube is",
                options: ["$512\\text{ m}^3$", "$64\\text{ m}^3$", "$216\\text{ m}^3$", "$256\\text{ m}^3$"],
                correctAnswer: "$512\\text{ m}^3$",
                solution: "LSA $= 4a^2 = 256 \\Rightarrow a^2 = 64 \\Rightarrow a = 8\\text{ m}$. Volume $= a^3 = 8^3 = 512\\text{ m}^3$."
            },
            {
                id: 16,
                text: "What is the area of a parallelogram with base $15\\text{ cm}$ and height $8\\text{ cm}$?",
                options: ["$120\\text{ cm}^2$", "$60\\text{ cm}^2$", "$240\\text{ cm}^2$", "$30\\text{ cm}^2$"],
                correctAnswer: "$120\\text{ cm}^2$",
                solution: "Area $= \\text{base} \\times \\text{height} = 15 \\times 8 = 120\\text{ cm}^2$."
            },
            {
                id: 17,
                text: "Number of edges in a cube is",
                options: ["$12$", "$8$", "$6$", "$4$"],
                correctAnswer: "$12$",
                solution: "A cube has $6$ faces, $8$ vertices, and $12$ edges."
            },
            {
                id: 18,
                text: "The surface area of a cuboid is $2(lb + bh + hl)$. What is its lateral surface area?",
                options: ["$2h(l+b)$", "$2l(b+h)$", "$2b(l+h)$", "$lb$"],
                correctAnswer: "$2h(l+b)$",
                solution: "LSA excludes the top and bottom faces ($lb$), so LSA $= 2(bh + hl) = 2h(l+b)$."
            },
            {
                id: 19,
                text: "The ratio of the volumes of two cylinders with equal radii but heights in the ratio $1:2$ is",
                options: ["$1:2$", "$1:4$", "$2:1$", "$4:1$"],
                correctAnswer: "$1:2$",
                solution: "$V_1 / V_2 = (\\pi r^2 h_1) / (\\pi r^2 h_2) = h_1 / h_2 = 1 / 2$."
            },
            {
                id: 20,
                text: "The curved surface area of a cylinder of height $14\\text{ cm}$ is $88\\text{ cm}^2$. Find the diameter of the base.",
                options: ["$2\\text{ cm}$", "$1\\text{ cm}$", "$4\\text{ cm}$", "$7\\text{ cm}$"],
                correctAnswer: "$2\\text{ cm}$",
                solution: "CSA $= 2\\pi r h = 88 \\Rightarrow 2 \\times \\frac{22}{7} \\times r \\times 14 = 88 \\Rightarrow 88r = 88 \\Rightarrow r = 1\\text{ cm}$. Diameter $= 2r = 2\\text{ cm}$."
            }
        ];
        return pool.sort(() => Math.random() - 0.5);
    };

    useEffect(() => {
        setQuestions(generateQuestions());
        const rawUid = sessionStorage.getItem('userId') || localStorage.getItem('userId');
        const uid = parseInt(rawUid, 10);
        if (!isNaN(uid)) {
            api.createPracticeSession(uid, SKILL_ID).then(sess => {
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
                user_id: uid,
                session_id: sessionId,
                skill_id: SKILL_ID,
                template_id: null,
                difficulty_level: 'Medium',
                question_text: String(currentQ.text || ''),
                correct_answer: String(currentQ.correctAnswer || ''),
                student_answer: String(isSkipped ? "SKIPPED" : (selectedOption || '')),
                is_correct: isSkipped ? false : isCorrect,
                solution_text: String(currentQ.solution || ''),
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
            await api.createReport({
                title: SKILL_NAME,
                type: 'practice',
                score: (correctCount / questions.length) * 100,
                parameters: {
                    skill_id: SKILL_ID,
                    total_questions: questions.length,
                    correct_answers: correctCount,
                    skipped_questions: Object.values(responses).filter(r => r.isSkipped).length,
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
        const skipped = Object.values(responses).filter(r => r.isSkipped).length;
        const wrong = questions.length - correct - skipped;

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
                                                const steps = q.solution.split(/(?<=\\.)\\s+(?=[A-Z0-9$])/);
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
                    <div className="practice-left-col" style={{ width: '100%', minWidth: 0, height: '100%', display: 'flex', flexDirection: 'column' }}>
                        <div className="question-card-modern" style={{ padding: '2rem', flex: 1, display: 'flex', flexDirection: 'column', overflow: 'visible' }}>
                            <div className="question-header-modern">
                                <h2 className="question-text-modern" style={{ fontSize: 'clamp(1rem, 1.8vw, 1.35rem)', maxHeight: 'none', fontWeight: '500', textAlign: 'left', color: '#2D3748', lineHeight: '1.5', marginBottom: '1rem' }}>
                                    <LatexText text={questions[qIndex].text} />
                                </h2>
                            </div>
                            <div className="interaction-area-modern" style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
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
                <div className="mobile-footer-controls">
                    <button className="nav-pill-next-btn nav-pastel-btn" style={{ padding: '0.5rem 1rem' }} onClick={handlePrev} disabled={qIndex === 0}>
                        <ChevronLeft size={24} />
                    </button>
                    <button className="nav-pill-next-btn nav-pastel-btn" onClick={handleNext} style={{ flex: 1 }}>
                        {qIndex === questions.length - 1 ? "Finish" : "Next"} <ChevronRight size={24} />
                    </button>
                </div>
            </footer>
        </div>
    );
};

export default MensurationTest;

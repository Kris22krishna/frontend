import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, Eye, ChevronRight, ChevronLeft, SkipForward, ArrowLeft, RefreshCw, BarChart3, Clock, HelpCircle, CheckCircle2, XCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../../../services/api';
import { LatexText } from '../../LatexText';
import './NumberSystem.css';

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
    }
    .solution-accordion {
        border: 1px solid #E2E8F0;
        border-radius: 12px;
        margin-bottom: 1rem;
        overflow: hidden;
    }
    .solution-header {
        padding: 1rem;
        background: #F8FAFC;
        cursor: pointer;
    }
    .solution-content {
        padding: 1rem;
        border-top: 1px solid #E2E8F0;
    }
`;

const SKILL_ID = 1246;
const SKILL_NAME = "Number System - Chapter Test";

const NumberSystemTest = () => {
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
            // Classification
            { text: "Which of the following is an irrational number?", options: ["$\\sqrt{16}$", "$\\sqrt{12}$", "$\\frac{22}{7}$", "$0.\\overline{3}$"], correctAnswer: "$\\sqrt{12}$", solution: "$\\sqrt{16}=4$, $22/7$ and $0.\\overline{3}$ are rational. $\\sqrt{12}$ is non-terminating and non-repeating." },
            { text: "Every rational number is:", options: ["A natural number", "An integer", "A real number", "A whole number"], correctAnswer: "A real number", solution: "The set of real numbers contains all rational and irrational numbers." },
            { text: "Between two rational numbers, there are:", options: ["No rational number", "Exactly one rational number", "Infinitely many rational numbers", "Only irrational numbers"], correctAnswer: "Infinitely many rational numbers", solution: "There are infinitely many rational and irrational numbers between any two real numbers." },
            { text: "The number $1.1010010001...$ is:", options: ["Rational", "Irrational", "Integer", "Whole Number"], correctAnswer: "Irrational", solution: "It is non-terminating and non-repeating." },

            // Decimal Expansion
            { text: "Decimal expansion of $\\frac{1}{11}$ is:", options: ["$0.09$", "$0.\\overline{09}$", "$0.0\\overline{9}$", "$0.009$"], correctAnswer: "$0.\\overline{09}$", solution: "$1 \\div 11 = 0.0909...$" },
            { text: "$\\frac{p}{q}$ form of $0.\\overline{6}$ is:", options: ["$\\frac{6}{10}$", "$\\frac{2}{3}$", "$\\frac{1}{3}$", "$\\frac{3}{2}$"], correctAnswer: "$\\frac{2}{3}$", solution: "$0.66... = 6/9 = 2/3$." },
            { text: "Value of $0.999...$ in $p/q$ form is:", options: ["$\\frac{9}{10}$", "$1$", "$\\frac{99}{100}$", "None"], correctAnswer: "$1$", solution: "$0.\\overline{9}$ is mathematically equivalent to 1." },
            { text: "Which of these is a terminating decimal?", options: ["$\\frac{1}{3}$", "$\\frac{2}{5}$", "$\\frac{1}{7}$", "$\\frac{1}{6}$"], correctAnswer: "$\\frac{2}{5}$", solution: "$2/5 = 0.4$. The denominator only has 5 as a factor." },

            // Operations on Surds
            { text: "Value of $\\sqrt{10} \\times \\sqrt{15}$ is:", options: ["$5\\sqrt{6}$", "$25\\sqrt{6}$", "$10\\sqrt{5}$", "$\\sqrt{25}$"], correctAnswer: "$5\\sqrt{6}$", solution: "$\\sqrt{150} = \\sqrt{25 \\times 6} = 5\\sqrt{6}$." },
            { text: "Simplify: $(3+\\sqrt{3})(3-\\sqrt{3})$", options: ["$9$", "$3$", "$6$", "$0$"], correctAnswer: "$6$", solution: "$3^2 - (\\sqrt{3})^2 = 9 - 3 = 6$." },
            { text: "Value of $(\\sqrt{5}+\\sqrt{2})^2$ is:", options: ["$7+2\\sqrt{10}$", "$7+\\sqrt{10}$", "$7$", "$10$"], correctAnswer: "$7+2\\sqrt{10}$", solution: "$5 + 2 + 2\\sqrt{10} = 7 + 2\\sqrt{10}$." },
            { text: "Simplify: $\\sqrt{48} - \\sqrt{27}$", options: ["$\\sqrt{21}$", "$\\sqrt{3}$", "$3\\sqrt{3}$", "$7\\sqrt{3}$"], correctAnswer: "$\\sqrt{3}$", solution: "$4\\sqrt{3} - 3\\sqrt{3} = \\sqrt{3}$." },

            // Rationalisation
            { text: "Rationalising factor for $2+\\sqrt{3}$ is:", options: ["$2+\\sqrt{3}$", "$2-\\sqrt{3}$", "$\\sqrt{3}$", "$2$"], correctAnswer: "$2-\\sqrt{3}$", solution: "The conjugate of $a+b$ is $a-b$." },
            { text: "Value of $\\frac{1}{\\sqrt{7}-2}$ after rationalising is:", options: ["$\\frac{\\sqrt{7}+2}{3}$", "$\\sqrt{7}+2$", "$\\frac{\\sqrt{7}-2}{3}$", "$\\frac{\\sqrt{7}+2}{5}$"], correctAnswer: "$\\frac{\\sqrt{7}+2}{3}$", solution: "Multiply by $(\\sqrt{7}+2) / (7-4) = (\\sqrt{7}+2)/3$." },
            { text: "Rationalise the denominator of $\\frac{1}{\\sqrt{2}}$:", options: ["$\\frac{\\sqrt{2}}{2}$", "$\\sqrt{2}$", "$2$", "$\\frac{1}{2}$"], correctAnswer: "$\\frac{\\sqrt{2}}{2}$", solution: "$\\sqrt{2} / (\\sqrt{2} \\times \\sqrt{2}) = \\sqrt{2}/2$." },
            { text: "If $\\frac{\\sqrt{2}-1}{\\sqrt{2}+1} = a+b\\sqrt{2}$, find $a, b$.", options: ["$a=3, b=-2$", "$a=3, b=2$", "$a=-3, b=2$", "$a=1, b=1$"], correctAnswer: "$a=3, b=-2$", solution: "Rationalise: $(\\sqrt{2}-1)^2 / (2-1) = 2+1-2\\sqrt{2} = 3-2\\sqrt{2}$." },

            // Laws of Exponents
            { text: "Value of $(64)^{1/2}$ is:", options: ["$8$", "$4$", "$16$", "$32$"], correctAnswer: "$8$", solution: "$8^2 = 64$." },
            { text: "Simplify: $2^0 + 3^0 + 4^0$", options: ["$0$", "$1$", "$3$", "$9$"], correctAnswer: "$3$", solution: "$1 + 1 + 1 = 3$." },
            { text: "Value of $(125)^{-1/3}$ is:", options: ["$5$", "$\\frac{1}{5}$", "$-5$", "$25$"], correctAnswer: "$\\frac{1}{5}$", solution: "$(5^3)^{-1/3} = 5^{-1} = 1/5$." },
            { text: "Simplify: $(16)^{3/4}$", options: ["$4$", "$8$", "$12$", "$16$"], correctAnswer: "$8$", solution: "$(2^4)^{3/4} = 2^3 = 8$." }
        ];
        return pool.sort(() => Math.random() - 0.5);
    };

    useEffect(() => {
        setQuestions(generateQuestions());
        const userId = sessionStorage.getItem('userId') || localStorage.getItem('userId');
        if (userId) {
            api.createPracticeSession(String(userId).includes("-") ? 1 : parseInt(userId, 10), SKILL_ID).then(sess => {
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
        const isCorrect = selectedOption === currentQ.correctAnswer;
        const timeSpent = Math.round((Date.now() - questionStartTime.current) / 1000);
        setResponses(prev => ({ ...prev, [qIndex]: { selectedOption, isCorrect, timeTaken: timeSpent } }));

        const userId = sessionStorage.getItem('userId') || localStorage.getItem('userId');
        if (userId && sessionId) {
            api.recordAttempt({
                difficulty_level: qIndex < 7 ? 'Easy' : qIndex < 14 ? 'Medium' : 'Hard',
                user_id: String(userId).includes("-") ? 1 : parseInt(userId, 10),
                session_id: sessionId,
                skill_id: SKILL_ID,
                question_text: currentQ.text,
                correct_answer: currentQ.correctAnswer,
                student_answer: selectedOption || "SKIPPED",
                is_correct: !!isCorrect,
                solution_text: currentQ.solution,
                time_spent_seconds: timeSpent
            }).catch(console.error);
        }
    };

    const navigateToQuestion = (target) => {
        handleRecordResponse();
        setQIndex(target);
        setSelectedOption(responses[target]?.selectedOption || null);
        questionStartTime.current = Date.now();
    };

    const finalizeTest = async () => {
        setIsTestOver(true);
        if (sessionId) await api.finishSession(sessionId);
        const userId = sessionStorage.getItem('userId') || localStorage.getItem('userId');
        if (userId) {
            const correctCount = Object.values(responses).filter(r => r.isCorrect).length;
            await api.createReport({
                title: SKILL_NAME, type: 'practice', score: (correctCount / 20) * 100,
                parameters: { skill_id: SKILL_ID, correct_answers: correctCount, total_questions: 20 },
                user_id: String(userId).includes("-") ? 1 : parseInt(userId, 10)
            });
        }
    };

    const formatTime = (s) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`;

    if (questions.length === 0) return <div>Loading...</div>;

    if (isTestOver) {
        const correct = Object.values(responses).filter(r => r.isCorrect).length;
        return (
            <div className="junior-practice-page" style={{ overflowY: 'auto', padding: '2rem' }}>
                <style>{BLUE_THEME_CSS}</style>
                <div className="exam-report-container">
                    <h1 style={{ fontSize: '2.5rem', fontWeight: '900', color: '#1E3A8A', textAlign: 'center' }}>Test Report</h1>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', margin: '2rem 0' }}>
                        <div style={{ background: '#EFF6FF', padding: '1.5rem', borderRadius: '1rem', textAlign: 'center' }}>
                            <span style={{ display: 'block', fontSize: '0.8rem', fontWeight: '800' }}>SCORE</span>
                            <span style={{ fontSize: '2rem', fontWeight: '900' }}>{correct * 5}%</span>
                        </div>
                        <div style={{ background: '#DCFCE7', padding: '1.5rem', borderRadius: '1rem', textAlign: 'center' }}>
                            <span style={{ display: 'block', fontSize: '0.8rem', fontWeight: '800' }}>CORRECT</span>
                            <span style={{ fontSize: '2rem', fontWeight: '900' }}>{correct}</span>
                        </div>
                        <div style={{ background: '#F1F5F9', padding: '1.5rem', borderRadius: '1rem', textAlign: 'center' }}>
                            <span style={{ display: 'block', fontSize: '0.8rem', fontWeight: '800' }}>TIME</span>
                            <span style={{ fontSize: '2rem', fontWeight: '900' }}>{formatTime(timeElapsed)}</span>
                        </div>
                    </div>
                    <button onClick={() => navigate(-1)} className="nav-pill-next-btn" style={{ margin: '0 auto 2rem' }}>Back to Topics</button>
                    {questions.map((q, i) => (
                        <details key={i} className="solution-accordion">
                            <summary className="solution-header">
                                Ques {i + 1}: {responses[i]?.isCorrect ? "✅" : "❌"}
                            </summary>
                            <div className="solution-content">
                                <LatexText text={q.text} /><br />
                                <strong>Correct:</strong> <LatexText text={q.correctAnswer} /><br />
                                <strong>Solution:</strong> <LatexText text={q.solution} />
                            </div>
                        </details>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="junior-practice-page grey-selection-theme" style={{ height: '100vh', overflow: 'hidden' }}>
            <style>{BLUE_THEME_CSS}</style>
            <header className="junior-practice-header">
                <div style={{ fontWeight: '800' }}>Chapter Test</div>
                <div className="bg-white/90 px-6 py-2 rounded-full border-2 border-blue-100 font-black text-xl">
                    {qIndex + 1} / 20
                </div>
                <div>{formatTime(timeElapsed)}</div>
            </header>

            <main className="practice-content-wrapper" style={{ flex: 1, padding: '2rem', display: 'grid', gridTemplateColumns: '1fr 300px', gap: '2rem' }}>
                <div className="question-card-modern">
                    <div className="question-text-modern">
                        <LatexText text={questions[qIndex].text} />
                    </div>
                    <div className="options-grid-modern" style={{ gridTemplateColumns: '1fr 1fr' }}>
                        {questions[qIndex].options.map((opt, i) => (
                            <button key={i} className={`option-btn-modern ${selectedOption === opt ? 'selected' : ''}`} onClick={() => setSelectedOption(opt)}>
                                <LatexText text={opt} />
                            </button>
                        ))}
                    </div>
                </div>

                <div style={{ background: 'white', padding: '1.5rem', borderRadius: '1.5rem', border: '1px solid #E2E8F0' }}>
                    <h3 style={{ marginBottom: '1rem', fontWeight: '800' }}>Palette</h3>
                    <div className="palette-grid">
                        {questions.map((_, i) => (
                            <button key={i} onClick={() => navigateToQuestion(i)} style={{ background: qIndex === i ? '#EFF6FF' : responses[i] ? '#DCFCE7' : '#F8FAFC', border: qIndex === i ? '2px solid #3B82F6' : '1px solid #E2E8F0', height: '40px', borderRadius: '8px', fontWeight: '700' }}>{i + 1}</button>
                        ))}
                    </div>
                </div>
            </main>

            <footer className="junior-bottom-bar">
                <button className="nav-pill-next-btn" style={{ background: '#64748B' }} onClick={() => navigate(-1)}>Exit</button>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <button className="nav-pill-next-btn" onClick={() => qIndex > 0 && navigateToQuestion(qIndex - 1)} disabled={qIndex === 0}>Prev</button>
                    <button className="nav-pill-next-btn" onClick={() => qIndex < 19 ? navigateToQuestion(qIndex + 1) : (handleRecordResponse(), finalizeTest())}>
                        {qIndex === 19 ? "Finish" : "Next"}
                    </button>
                </div>
            </footer>
        </div>
    );
};

export default NumberSystemTest;

import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../../../../services/api';
import MathRenderer from '../../../MathRenderer';
import mascotImg from '../../../../assets/mascot.png';
import './NumberSystem.css';

const SKILL_ID = 1246;
const SKILL_NAME = "Chapter Test";

const NumberSystemTest = () => {
    const navigate = useNavigate();
    const [qIndex, setQIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [timeElapsed, setTimeElapsed] = useState(0);
    const [isTestOver, setIsTestOver] = useState(false);
    const [responses, setResponses] = useState({});
    const [sessionId, setSessionId] = useState(null);
    const [questions, setQuestions] = useState([]);
    const questionStartTime = useRef(Date.now());
    const topRef = useRef(null);
    const THEME_COLOR = '#312e81';

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
                title: SKILL_NAME, type: 'test', score: (correctCount / questions.length) * 100,
                parameters: { skill_id: SKILL_ID, correct_answers: correctCount, total_questions: questions.length },
                user_id: String(userId).includes("-") ? 1 : parseInt(userId, 10)
            });
        }
    };

    const formatTime = (s) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`;

    if (questions.length === 0) return <div>Loading...</div>;

    if (isTestOver) {
        const correctCount = Object.values(responses).filter(r => r.isCorrect).length;
        const score = correctCount; // Assuming score is just correctCount for display
        const totalQuestions = questions.length;

        return (
            <div className="ns-quiz-finished" style={{ maxWidth: 1000, margin: '40px auto', padding: '40px' }}>
                <div style={{ textAlign: 'center', marginBottom: 40, position: 'relative' }}>
                    <img
                        src={mascotImg}
                        alt="Mascot"
                        style={{
                            width: 140,
                            height: 'auto',
                            marginBottom: 20,
                            filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.1))'
                        }}
                    />
                    <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 36, fontWeight: 900, color: '#0f172a', marginBottom: 8 }}>Test Complete!</h2>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: 40, marginTop: 24 }}>
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: 48, fontWeight: 900, color: '#312e81' }}>{score} / {totalQuestions}</div>
                            <div style={{ fontSize: 16, color: '#64748b', fontWeight: 600 }}>Total Score</div>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: 48, fontWeight: 900, color: '#0d9488' }}>{Math.round((score / totalQuestions) * 100)}%</div>
                            <div style={{ fontSize: 16, color: '#64748b', fontWeight: 600 }}>Accuracy</div>
                        </div>
                    </div>
                </div>
                <button className="ns-btn-secondary" onClick={() => navigate(-1)} style={{ padding: '12px 32px', display: 'block', margin: '0 auto 40px auto' }}>Back to Skills</button>

                <h3 style={{ fontSize: 24, fontWeight: 800, marginBottom: 24, borderBottom: '2px solid #f1f5f9', paddingBottom: 12 }}>Detailed Report</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                    {questions.map((q, i) => {
                        const res = responses[i] || { selectedOption: null, isCorrect: false };
                        const isCorrect = res.isCorrect;
                        const isSkipped = res.selectedOption === null;
                        const statusColor = isCorrect ? '#0d9488' : (isSkipped ? '#94a3b8' : '#e11d48');

                        return (
                            <div key={i} style={{ padding: 24, borderRadius: 16, border: `2px solid ${statusColor}20`, background: isCorrect ? '#f0fdf9' : (isSkipped ? '#f8fafc' : '#fff1f2') }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                                    <span style={{ fontWeight: 800, color: statusColor }}>QUESTION {i + 1}</span>
                                    <span style={{ fontWeight: 800, color: statusColor }}>{isCorrect ? '✓ Correct' : (isSkipped ? '⚠ Skipped' : '✗ Incorrect')}</span>
                                </div>
                                <div style={{ fontSize: 17, fontWeight: 600, color: '#0f172a', marginBottom: 16 }}>
                                    <MathRenderer text={q.text} />
                                </div>
                                <div className="ns-summary-split">
                                    <div style={{ background: '#fff', padding: 16, borderRadius: 12, border: '1px solid #e2e8f0' }}>
                                        <div style={{ fontSize: 12, fontWeight: 800, color: '#64748b', textTransform: 'uppercase', marginBottom: 4 }}>Your Answer</div>
                                        <div style={{ fontSize: 15, fontWeight: 700, color: statusColor }}>{isSkipped ? 'No Answer' : <MathRenderer text={res.selectedOption} />}</div>
                                    </div>
                                    <div style={{ background: '#fff', padding: 16, borderRadius: 12, border: '1px solid #e2e8f0' }}>
                                        <div style={{ fontSize: 12, fontWeight: 800, color: '#64748b', textTransform: 'uppercase', marginBottom: 4 }}>Correct Answer</div>
                                        <div style={{ fontSize: 15, fontWeight: 700, color: '#0d9488' }}><MathRenderer text={q.correctAnswer} /></div>
                                    </div>
                                </div>
                                <div style={{ marginTop: 16, paddingTop: 16, borderTop: '1px dashed #e2e8f0' }}>
                                    <div style={{ fontSize: 12, fontWeight: 800, color: '#312e81', textTransform: 'uppercase', marginBottom: 4 }}>Solution</div>
                                    <div style={{ fontSize: 14, color: '#475569', lineHeight: 1.5 }}><MathRenderer text={q.solution} /></div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }

    const currentQ = questions[qIndex];

    return (
        <div className="ns-page" style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
            <nav className="ns-nav">
                <button className="ns-nav-back" onClick={() => navigate(-1)}>Exit Test</button>
                <div style={{ fontSize: 18, fontWeight: 900, color: '#0f172a' }}>Number System: Chapter Test</div>
                <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
                    <div style={{ fontSize: 14, fontWeight: 800, color: '#64748b' }}>{qIndex + 1} / {questions.length}</div>
                    <div style={{ padding: '4px 12px', background: '#f1f5f9', borderRadius: 8, fontWeight: 800, color: '#0f172a' }}>⏱ {formatTime(timeElapsed)}</div>
                </div>
            </nav>

            <div className="ns-assessment-layout" style={{ flex: 1, padding: '20px 40px' }}>
                <div style={{ flex: 1 }}>
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={qIndex}
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            transition={{ duration: 0.2 }}
                        >
                            <div className="ns-quiz-card" style={{ padding: 40, minHeight: 400 }}>
                                <div style={{ fontSize: 20, fontWeight: 700, color: '#0f172a', lineHeight: 1.6, marginBottom: 32 }}>
                                    <MathRenderer text={currentQ.text} />
                                </div>
                                <div className="ns-quiz-options">
                                    {currentQ.options.map((opt, i) => {
                                        const isSelected = selectedOption === opt;
                                        return (
                                            <button
                                                key={i}
                                                className={`ns-option-btn ${isSelected ? 'selected' : ''}`}
                                                onClick={() => setSelectedOption(opt)}
                                                style={{ '--skill-color': THEME_COLOR }}
                                            >
                                                <MathRenderer text={opt} />
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 24 }}>
                        <button className="ns-btn-secondary" onClick={() => qIndex > 0 && navigateToQuestion(qIndex - 1)} disabled={qIndex === 0} style={{ opacity: qIndex === 0 ? 0.5 : 1 }}>← Previous</button>
                        <div style={{ display: 'flex', gap: 12 }}>
                            <button className="ns-btn-secondary" onClick={() => qIndex < questions.length - 1 ? navigateToQuestion(qIndex + 1) : (handleRecordResponse(), finalizeTest())}>{qIndex === questions.length - 1 ? 'Skip & Finish' : 'Skip Question'}</button>
                            <button className="ns-btn-primary" onClick={() => qIndex < questions.length - 1 ? navigateToQuestion(qIndex + 1) : (handleRecordResponse(), finalizeTest())} style={{ background: THEME_COLOR }}>{qIndex === questions.length - 1 ? 'Submit Test ✓' : 'Next Question →'}</button>
                        </div>
                    </div>
                </div>

                <div className="ns-assessment-palette">
                    <div style={{ fontSize: 13, fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 16 }}>Question Palette</div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 8 }}>
                        {questions.map((_, i) => {
                            const isAnswered = responses[i] && responses[i].selectedOption !== null;
                            const isCurrent = qIndex === i;
                            return (
                                <button
                                    key={i}
                                    onClick={() => navigateToQuestion(i)}
                                    style={{
                                        aspectRatio: '1', borderRadius: 8, fontSize: 14, fontWeight: 800,
                                        background: isCurrent ? THEME_COLOR : (isAnswered ? '#0d9488' : '#f1f5f9'),
                                        color: (isCurrent || isAnswered) ? '#fff' : '#64748b',
                                        border: 'none', cursor: 'pointer', transition: 'all 0.2s'
                                    }}
                                >
                                    {i + 1}
                                </button>
                            );
                        })}
                    </div>
                    <div style={{ marginTop: 24, fontSize: 12, borderTop: '1px solid #f1f5f9', paddingTop: 16 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}><div style={{ width: 10, height: 10, borderRadius: '50%', background: THEME_COLOR }} /> Current</div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}><div style={{ width: 10, height: 10, borderRadius: '50%', background: '#0d9488' }} /> Answered</div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><div style={{ width: 10, height: 10, borderRadius: '50%', background: '#f1f5f9' }} /> Unvisited</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NumberSystemTest;

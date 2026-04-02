import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, ChevronLeft, Clock } from 'lucide-react';
import { LatexText } from '../../../../../LatexText';
import '../../../TenthPracticeSession.css';
import { useSessionLogger } from '@/hooks/useSessionLogger';
import { NODE_IDS } from '@/lib/curriculumIds';

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
        border-radius: 12px;
        border: 2px solid #E2E8F0;
        background: white;
        cursor: pointer;
        transition: all 0.2s;
    }
    .option-btn-modern:hover:not(.selected) {
        border-color: #94A3B8;
        background: #F8FAFC;
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
        padding: 0.5rem 1.5rem;
        border-radius: 999px;
        display: flex;
        align-items: center;
        gap: 0.5rem;
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

const SKILL_ID = 10153;
const SKILL_NAME = "Probability - Hard Test";

const ProbabilityHardTest = () => {
    const navigate = useNavigate();
    const [qIndex, setQIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [timeElapsed, setTimeElapsed] = useState(0);
    const [isTestOver, setIsTestOver] = useState(false);
    const [responses, setResponses] = useState({});

    const { startSession, logAnswer, finishSession } = useSessionLogger();
    const v4Answers = React.useRef([]);

    const [questions, setQuestions] = useState([]);

    const generateQuestions = () => {
        return [
            { id: 1, text: "A box contains 90 discs which are numbered from 1 to 90. If one disc is drawn at random, find the probability that it bears a perfect square number.", options: ["$\\frac{1}{10}$", "$\\frac{9}{90}$", "$\\frac{10}{90}$", "Both 1st and 2nd"], correctAnswer: "Both 1st and 2nd", solution: "Perfect squares $\\le 90$: $1, 4, 9, 16, 25, 36, 49, 64, 81$ (9 outcomes). Total = 90. Probability = $\\frac{9}{90} = \\frac{1}{10}$." },
            { id: 2, text: "Two dice are thrown at the same time. What is the probability that the sum of the two numbers appearing on the top of the dice is a prime number?", options: ["$\\frac{5}{12}$", "$\\frac{1}{2}$", "$\\frac{7}{18}$", "$\\frac{5}{36}$"], correctAnswer: "$\\frac{5}{12}$", solution: "Sums can be 2 to 12. Prime sums are 2, 3, 5, 7, 11. Pairs: (1,1), (1,2), (2,1), (1,4), (2,3), (3,2), (4,1), (1,6), (2,5), (3,4), (4,3), (5,2), (6,1), (5,6), (6,5). Total 15 pairs out of 36. Probability = $\\frac{15}{36} = \\frac{5}{12}$." },
            { id: 3, text: "Three different coins are tossed together. Find the probability of getting exactly two tails.", options: ["$\\frac{1}{4}$", "$\\frac{3}{8}$", "$\\frac{1}{8}$", "$\\frac{1}{2}$"], correctAnswer: "$\\frac{3}{8}$", solution: "Total outcomes for 3 coins = $2^3 = 8$. Outcomes with exactly two tails: TTH, THT, HTT. These are 3 outcomes. Probability = $\\frac{3}{8}$." },
            { id: 4, text: "Cards marked with numbers 13, 14, 15, ..., 60 are placed in a box and mixed thoroughly. What is the probability that the chosen card is a multiple of 5?", options: ["$\\frac{1}{5}$", "$\\frac{10}{48}$", "$\\frac{9}{48}$", "$\\frac{10}{60}$"], correctAnswer: "$\\frac{10}{48}$", solution: "Total numbers from 13 to 60 = $60 - 13 + 1 = 48$. Multiples of 5: 15, 20, 25, 30, 35, 40, 45, 50, 55, 60. There are 10 such numbers. Prob = $\\frac{10}{48}$." },
            { id: 5, text: "A jar contains 24 marbles, some are green and others are blue. If a marble is drawn at random from the jar, the probability that it is green is $\\frac{2}{3}$. Find the number of blue marbles in the jar.", options: ["8", "16", "12", "4"], correctAnswer: "8", solution: "$P(\\text{Green}) = \\frac{2}{3}$. Expected green: $\\frac{2}{3} \\times 24 = 16$. Number of blue marbles = $24 - 16 = 8$." },
            { id: 6, text: "A missing helicopter is reported to have crashed somewhere in a rectangular region which measures 9 km by 4.5 km. Inside this region is a lake of 3 km by 2.5 km. What is the probability that it crashed inside the lake?", options: ["$\\frac{5}{27}$", "$\\frac{7}{25}$", "$\\frac{7.5}{40.5}$", "Both 1st and 3rd"], correctAnswer: "Both 1st and 3rd", solution: "Total area = $9 \\times 4.5 = 40.5$ sq km. Lake area = $3 \\times 2.5 = 7.5$ sq km. Probability = $\\frac{7.5}{40.5} = \\frac{75}{405} = \\frac{5}{27}$." },
            { id: 7, text: "The probability of getting a defective shirt in a lot of 400 shirts is 0.035. Find the number of defective shirts in the lot.", options: ["14", "35", "10", "12"], correctAnswer: "14", solution: "Number of defective shirts = Probability $\\times$ Total shirts = $0.035 \\times 400 = 14$." },
            { id: 8, text: "If the probability of winning a game is $\\frac{x}{12}$ and the probability of losing is $\\frac{1}{3}$, find the value of x.", options: ["4", "6", "8", "10"], correctAnswer: "8", solution: "$P(\\text{Win}) + P(\\text{Lose}) = 1 \\Rightarrow \\frac{x}{12} + \\frac{1}{3} = 1 \\Rightarrow \\frac{x}{12} = \\frac{2}{3} \\Rightarrow x = 8$." },
            { id: 9, text: "A group consists of 12 persons, of which 3 are extremely patient, other 6 are extremely honest and rest are extremely kind. What is the probability of selecting a person who is both patient and honest?", options: ["0", "$\\frac{1}{4}$", "$\\frac{1}{2}$", "$\\frac{1}{12}$"], correctAnswer: "0", solution: "The problem states the traits characterize disjoint sets of people (3 + 6 + 3 = 12). There is no person who is both. Probability = 0." },
            { id: 10, text: "What is the probability of having 53 Mondays in a leap year?", options: ["$\\frac{1}{7}$", "$\\frac{2}{7}$", "$\\frac{53}{366}$", "$\\frac{1}{366}$"], correctAnswer: "$\\frac{2}{7}$", solution: "A leap year has 366 days = 52 weeks and 2 extra days. The 2 extra days can be (S,M), (M,T), (T,W), (W,Th), (Th,F), (F,S), (S,S). Total 7 pairs. 2 pairs contain Monday. Probability = $\\frac{2}{7}$." }
        ];
    };

    useEffect(() => {
        setQuestions(generateQuestions());
        startSession({
            nodeId: NODE_IDS.g10MathProbHardTest,
            sessionType: 'assessment'
        });
    }, [startSession]);

    useEffect(() => {
        if (isTestOver) return;
        const timer = setInterval(() => setTimeElapsed(p => p + 1), 1000);
        return () => clearInterval(timer);
    }, [isTestOver]);

    const handleRecordResponse = () => {
        const currentQ = questions[qIndex];
        const isCorrect = selectedOption ? selectedOption === currentQ.correctAnswer : null;
        const isSkipped = !selectedOption;

        const responseData = {
            selectedOption,
            isCorrect,
            isSkipped
        };

        const answerData = {
            question_index: qIndex,
            answer_json: {
                question: currentQ.text,
                selected: isSkipped ? "SKIPPED" : selectedOption,
                correct: currentQ.correctAnswer
            },
            is_correct: isSkipped ? 0 : (isCorrect ? 1 : 0),
        };

        v4Answers.current[qIndex] = answerData;
        logAnswer(answerData);

        setResponses(prev => ({ ...prev, [qIndex]: responseData }));
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
        finishSession({
            totalQuestions: questions.length,
            questionsAnswered: v4Answers.current.filter(Boolean).length,
            answersPayload: v4Answers.current.filter(Boolean)
        });
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
                    <div className="results-hero-section flex flex-col items-center mb-8 mt-4" style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🏆</div>
                        <h1 className="text-5xl font-black text-[#31326F] mb-2 tracking-tight">Test Report</h1>
                        <p className="text-[#64748B] text-xl font-medium mb-8">How you performed in <span className="font-bold">{SKILL_NAME}</span></p>

                        <div className="results-stats-grid" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                            <div className="stat-card" style={{ background: '#EFF6FF', padding: '1.5rem', borderRadius: '1.5rem', border: '2px solid #DBEAFE', minWidth: '120px' }}>
                                <span className="block text-xs font-black uppercase tracking-widest text-[#3B82F6] mb-1">Score</span>
                                <span className="text-4xl font-black text-[#1E3A8A]">{Math.round((correct / questions.length) * 100)}%</span>
                            </div>
                            <div className="stat-card" style={{ background: '#F0FDF4', padding: '1.5rem', borderRadius: '1.5rem', border: '2px solid #DCFCE7', minWidth: '120px' }}>
                                <span className="block text-xs font-black uppercase tracking-widest text-[#22C55E] mb-1">Correct</span>
                                <span className="text-4xl font-black text-[#14532D]">{correct}</span>
                            </div>
                            <div className="stat-card" style={{ background: '#FEF2F2', padding: '1.5rem', borderRadius: '1.5rem', border: '2px solid #FEE2E2', minWidth: '120px' }}>
                                <span className="block text-xs font-black uppercase tracking-widest text-[#EF4444] mb-1">Wrong</span>
                                <span className="text-4xl font-black text-[#7F1D1D]">{wrong}</span>
                            </div>
                        </div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '3rem' }}>
                        <button
                            onClick={() => navigate('/senior/grade/10/probability')}
                            className="bg-white text-[#31326F] border-2 border-[#31326F] px-8 py-3 rounded-2xl font-black uppercase tracking-wider hover:bg-[#31326F] hover:text-white transition-colors"
                        >
                            Back to Hub
                        </button>
                    </div>

                    <div style={{ marginBottom: '2rem', maxWidth: '1000px', margin: '0 auto' }}>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#1E293B', marginBottom: '1.5rem' }}>Detailed Review & Solutions</h2>
                        {questions.map((q, idx) => {
                            const res = responses[idx] || { isSkipped: true, timeTaken: 0 };
                            return (
                                <details key={idx} className="solution-accordion group" style={{ marginBottom: '1rem' }}>
                                    <summary className="solution-header" style={{ padding: '1.2rem', display: 'flex', gap: '1rem', outline: 'none' }}>
                                        <span style={{ minWidth: '32px', height: '32px', background: '#FBBF24', color: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>{idx + 1}</span>
                                        <div style={{ flex: 1 }}><LatexText text={q.text} /></div>
                                        {res.isSkipped ? <span className="status-badge status-skipped">Skipped</span> : res.isCorrect ? <span className="status-badge status-correct">Correct</span> : <span className="status-badge status-wrong">Incorrect</span>}
                                    </summary>
                                    <div className="solution-content" style={{ padding: '1.5rem', borderTop: '1px solid #E2E8F0', background: '#fff' }}>
                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                                            <div style={{ background: '#F8FAFC', padding: '1rem', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
                                                <h5 style={{ fontSize: '0.7rem', color: '#94A3B8', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Your Answer</h5>
                                                {res.isSkipped ? <span style={{ color: '#F59E0B', fontWeight: 'bold' }}>Skipped</span> : <span style={{ color: res.isCorrect ? '#166534' : '#DC2626', fontWeight: 'bold' }}><LatexText text={res.selectedOption || ''} /></span>}
                                            </div>
                                            <div style={{ background: '#DCFCE7', padding: '1rem', borderRadius: '12px', border: '1px solid #BBF7D0' }}>
                                                <h5 style={{ fontSize: '0.7rem', color: '#166534', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Correct Answer</h5>
                                                <span style={{ color: '#166534', fontWeight: 'bold' }}><LatexText text={q.correctAnswer} /></span>
                                            </div>
                                        </div>
                                        <div style={{ background: '#F0F9FF', padding: '1.5rem', borderRadius: '12px', border: '1px solid #E0F2FE' }}>
                                            <h4 style={{ color: '#0284C7', fontWeight: '800', marginBottom: '0.5rem', textTransform: 'uppercase', fontSize: '0.85rem' }}>Solution:</h4>
                                            <div style={{ color: '#334155', lineHeight: '1.6' }}><LatexText text={q.solution} /></div>
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
            <header className="junior-practice-header" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) auto minmax(0, 1fr)', alignItems: 'center', padding: '1rem 2rem', gap: '1rem', background: '#fff', borderBottom: '1px solid #E2E8F0' }}>
                <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#31326F' }}>
                    {SKILL_NAME}
                </div>
                <div style={{ background: '#F8FAFC', padding: '0.5rem 1.5rem', borderRadius: '99px', border: '2px solid #E2E8F0', color: '#1E40AF', fontWeight: '900', fontSize: '1.1rem' }}>
                    {qIndex + 1} / {questions.length}
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <div style={{ background: '#F8FAFC', padding: '0.5rem 1rem', borderRadius: '12px', border: '2px solid #E2E8F0', color: '#1E40AF', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Clock size={20} /> {formatTime(timeElapsed)}
                    </div>
                </div>
            </header>

            <main className="practice-content-wrapper" style={{ flex: 1, padding: '2rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', background: '#F1F5F9' }}>
                <div className="practice-board-container" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 300px', gap: '2rem', maxWidth: '1200px', margin: '0 auto', width: '100%' }}>

                    <div className="practice-left-col" style={{ display: "flex", flexDirection: "column" }}>
                        <div className="question-card-modern" style={{ padding: "2rem", background: '#fff', borderRadius: '24px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', border: '1px solid #E2E8F0' }}>
                            <div className="question-header-modern" style={{ marginBottom: "1.5rem" }}>
                                <h2 className="question-text-modern" style={{ fontSize: '1.35rem', fontWeight: '500', color: '#1E293B', lineHeight: '1.6' }}>
                                    <LatexText text={questions[qIndex].text} />
                                </h2>
                            </div>
                            <div className="options-grid-modern" style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(2, 1fr)' }}>
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

                    <div className="question-palette-container" style={{ background: 'white', padding: '1.5rem', borderRadius: '24px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', border: '1px solid #E2E8F0', height: 'fit-content' }}>
                        <h3 style={{ fontSize: '1.1rem', fontWeight: '800', color: '#1E293B', marginBottom: '1rem', textAlign: 'center' }}>Question Palette</h3>
                        <div className="palette-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.5rem' }}>
                            {questions.map((_, idx) => {
                                const isCurrent = qIndex === idx;
                                const hasResponded = responses[idx] && !responses[idx].isSkipped;
                                const isSkipped = responses[idx] && responses[idx].isSkipped;

                                let btnBg = '#F8FAFC'; let btnColor = '#64748B'; let btnBorder = '1px solid #E2E8F0';
                                if (isCurrent) { btnBorder = '2px solid #3B82F6'; btnBg = '#EFF6FF'; btnColor = '#1D4ED8'; }
                                else if (hasResponded) { btnBg = '#DCFCE7'; btnColor = '#166534'; btnBorder = '1px solid #BBF7D0'; }
                                else if (isSkipped) { btnBg = '#FFF7ED'; btnColor = '#C2410C'; btnBorder = '1px solid #FFEDD5'; }

                                return (
                                    <button
                                        key={idx}
                                        onClick={() => navigateToQuestion(idx)}
                                        style={{ height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '8px', fontWeight: '700', cursor: 'pointer', background: btnBg, color: btnColor, border: btnBorder }}
                                    >
                                        {idx + 1}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                </div>
            </main>

            <footer className="junior-bottom-bar" style={{ padding: '1rem 2rem', background: '#fff', borderTop: '1px solid #E2E8F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <button className="bg-red-50 text-red-500 px-6 py-2 rounded-xl border-2 border-red-100 font-bold" onClick={() => navigate('/senior/grade/10/probability')}>Exit Test</button>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <button className="nav-pastel-btn" onClick={handlePrev} disabled={qIndex === 0}>
                        <ChevronLeft size={20} /> Previous
                    </button>
                    <button className="nav-pastel-btn" onClick={handleNext}>
                        {qIndex === questions.length - 1 ? "Finish Test" : "Next Question"} <ChevronRight size={20} />
                    </button>
                </div>
            </footer>
        </div>
    );
};

export default ProbabilityHardTest;

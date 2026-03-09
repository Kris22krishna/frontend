import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, Eye, ChevronRight, ChevronLeft, SkipForward, ArrowLeft, RefreshCw, BarChart3, Clock, HelpCircle, CheckCircle2, XCircle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../../../../services/api';
import LatexContent from '../../../LatexContent';
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
        .junior-practice-header { padding: 0 1rem !important; }
        .practice-content-wrapper { padding: 1rem 1rem 80px 1rem !important; }
        .question-card-modern { padding: 1.5rem !important; }
        .question-text-modern { font-size: 1.1rem !important; }
    }
`;

const SKILL_ID = 1215;
const SKILL_NAME = "Weigh It, Pour It - Chapter Test";

const WeighItPourItTest = () => {
    const navigate = useNavigate();
    const [qIndex, setQIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [timeElapsed, setTimeElapsed] = useState(0);
    const [isTestOver, setIsTestOver] = useState(false);
    const [responses, setResponses] = useState({});
    const [questions, setQuestions] = useState([]);
    const [sessionId, setSessionId] = useState(null);
    const questionStartTime = useRef(Date.now());

    const POOL = [
        // 1. Weight Unit Conversion (5 Qs)
        { id: 1, topic: 'Weight Unit Conversion', text: "How many grams are there in 1 kilogram?", options: ["100 g", "500 g", "1000 g", "10000 g"], correctAnswer: "1000 g", solution: "1 kilogram = 1000 grams. This is the basic unit conversion for weight." },
        { id: 2, topic: 'Weight Unit Conversion', text: "500 g is what fraction of 1 kg?", options: ["1/4", "1/2", "3/4", "1/3"], correctAnswer: "1/2", solution: "500 g out of 1000 g = 500/1000 = 1/2. So 500 g is half a kilogram." },
        { id: 3, topic: 'Weight Unit Conversion', text: "A packet weighs 250 g. How many packets make 1 kg?", options: ["2", "3", "4", "5"], correctAnswer: "4", solution: "1 kg = 1000 g. Number of 250 g packets = 1000 ÷ 250 = 4 packets." },
        { id: 4, topic: 'Weight Unit Conversion', text: "Convert 2 kg 350 g to grams.", options: ["2350 g", "2035 g", "23500 g", "235 g"], correctAnswer: "2350 g", solution: "2 kg = 2000 g. So 2 kg 350 g = 2000 + 350 = 2350 g." },
        { id: 5, topic: 'Weight Unit Conversion', text: "750 g is what fraction of 1 kg?", options: ["1/2", "1/4", "3/4", "2/3"], correctAnswer: "3/4", solution: "750 g out of 1000 g = 750/1000 = 3/4 of a kilogram." },

        // 2. Capacity Unit Conversion (5 Qs)
        { id: 6, topic: 'Capacity Unit Conversion', text: "How many millilitres are there in 1 litre?", options: ["100 mL", "500 mL", "1000 mL", "10000 mL"], correctAnswer: "1000 mL", solution: "1 litre = 1000 millilitres. This is the basic unit conversion for capacity." },
        { id: 7, topic: 'Capacity Unit Conversion', text: "A glass holds 250 mL. How many glasses fill a 1 litre bottle?", options: ["2", "3", "4", "5"], correctAnswer: "4", solution: "1 litre = 1000 mL. Number of 250 mL glasses = 1000 ÷ 250 = 4 glasses." },
        { id: 8, topic: 'Capacity Unit Conversion', text: "500 mL is what fraction of 1 litre?", options: ["1/4", "1/2", "3/4", "1/3"], correctAnswer: "1/2", solution: "500 mL out of 1000 mL = 500/1000 = 1/2 of a litre." },
        { id: 9, topic: 'Capacity Unit Conversion', text: "Convert 3 litres 200 mL to millilitres.", options: ["3200 mL", "3020 mL", "32000 mL", "320 mL"], correctAnswer: "3200 mL", solution: "3 litres = 3000 mL. So 3 L 200 mL = 3000 + 200 = 3200 mL." },
        { id: 10, topic: 'Capacity Unit Conversion', text: "A bottle holds 200 mL. How many bottles make 1 litre?", options: ["4", "5", "6", "10"], correctAnswer: "5", solution: "1 litre = 1000 mL. Number of 200 mL bottles = 1000 ÷ 200 = 5 bottles." },

        // 3. Equal Grouping & Unit Count (5 Qs)
        { id: 11, topic: 'Equal Grouping & Unit Count', text: "A recipe needs 200 g of sugar. How many times can you make this recipe with 1 kg of sugar?", options: ["4", "5", "6", "3"], correctAnswer: "5", solution: "1 kg = 1000 g. Number of 200 g servings = 1000 ÷ 200 = 5 times." },
        { id: 12, topic: 'Equal Grouping & Unit Count', text: "If you keep pouring 250 mL at a time, after how many pours will you have 1 litre?", options: ["3", "4", "5", "6"], correctAnswer: "4", solution: "250 + 250 + 250 + 250 = 1000 mL = 1 litre. So 4 pours of 250 mL." },
        { id: 13, topic: 'Equal Grouping & Unit Count', text: "How many 125 g packets make half a kilogram?", options: ["2", "3", "4", "5"], correctAnswer: "4", solution: "Half a kilogram = 500 g. Number of 125 g packets = 500 ÷ 125 = 4 packets." },
        { id: 14, topic: 'Equal Grouping & Unit Count', text: "A medicine bottle has 100 mL. If you take 5 mL each day, for how many days will it last?", options: ["10", "15", "20", "25"], correctAnswer: "20", solution: "100 mL ÷ 5 mL/day = 20 days." },
        { id: 15, topic: 'Equal Grouping & Unit Count', text: "Adding 200 g + 200 g + 200 g + 200 g + 200 g = ?", options: ["1 kg", "800 g", "1 kg 200 g", "900 g"], correctAnswer: "1 kg", solution: "200 × 5 = 1000 g = 1 kg. Repeated addition of equal groups!" },

        // 4. Comparison of Quantities (5 Qs)
        { id: 16, topic: 'Comparison of Quantities', text: "Which is heavier: 800 g or 1 kg?", options: ["800 g", "1 kg", "They are equal", "Cannot tell"], correctAnswer: "1 kg", solution: "1 kg = 1000 g. Since 1000 g > 800 g, 1 kg is heavier." },
        { id: 17, topic: 'Comparison of Quantities', text: "Which holds more: 750 mL or 1 litre?", options: ["750 mL", "1 litre", "They are equal", "Cannot tell"], correctAnswer: "1 litre", solution: "1 litre = 1000 mL. Since 1000 mL > 750 mL, 1 litre holds more." },
        { id: 18, topic: 'Comparison of Quantities', text: "Rani has 2 kg 500 g of rice. Priya has 2750 g. Who has more?", options: ["Rani", "Priya", "They have the same", "Cannot compare"], correctAnswer: "Priya", solution: "Rani: 2 kg 500 g = 2500 g. Priya: 2750 g. Since 2750 > 2500, Priya has more." },
        { id: 19, topic: 'Comparison of Quantities', text: "Arrange in order from lightest to heaviest: 1 kg, 450 g, 1200 g", options: ["450 g, 1 kg, 1200 g", "1 kg, 450 g, 1200 g", "1200 g, 1 kg, 450 g", "450 g, 1200 g, 1 kg"], correctAnswer: "450 g, 1 kg, 1200 g", solution: "Convert all to grams: 1 kg = 1000 g. Order: 450 g < 1000 g < 1200 g." },
        { id: 20, topic: 'Comparison of Quantities', text: "Which is more: 3 bottles of 300 mL or 1 litre?", options: ["3 bottles of 300 mL", "1 litre", "They are equal", "Cannot tell"], correctAnswer: "1 litre", solution: "3 × 300 mL = 900 mL. 1 litre = 1000 mL. 1000 > 900, so 1 litre is more." },

        // 5. Mixed Measurement Word Problems (5 Qs)
        { id: 21, topic: 'Mixed Word Problems', text: "A watermelon weighs 3 kg 250 g. An apple weighs 150 g. How much heavier is the watermelon?", options: ["3 kg 100 g", "3 kg", "2 kg 100 g", "3 kg 200 g"], correctAnswer: "3 kg 100 g", solution: "3 kg 250 g − 150 g = 3 kg 100 g. Convert if needed: 3250 − 150 = 3100 g = 3 kg 100 g." },
        { id: 22, topic: 'Mixed Word Problems', text: "A jug holds 2 litres. If you pour out 750 mL, how much water is left?", options: ["1 L 250 mL", "1 L 500 mL", "1 L 350 mL", "750 mL"], correctAnswer: "1 L 250 mL", solution: "2 litres = 2000 mL. 2000 − 750 = 1250 mL = 1 litre 250 mL." },
        { id: 23, topic: 'Mixed Word Problems', text: "Ravi buys 3 packets of biscuits, each weighing 200 g, and a cake weighing 500 g. What is the total weight?", options: ["1 kg 100 g", "1 kg", "900 g", "1 kg 200 g"], correctAnswer: "1 kg 100 g", solution: "3 × 200 g = 600 g. Total = 600 + 500 = 1100 g = 1 kg 100 g." },
        { id: 24, topic: 'Mixed Word Problems', text: "A tank has 5 litres of water. If 4 buckets of 800 mL each are poured in, what is the total amount?", options: ["8 L 200 mL", "8 L", "7 L 200 mL", "9 L"], correctAnswer: "8 L 200 mL", solution: "4 × 800 mL = 3200 mL = 3 L 200 mL. Total = 5 L + 3 L 200 mL = 8 L 200 mL." },
        { id: 25, topic: 'Mixed Word Problems', text: "A shopkeeper has 5 kg of sugar. He sells 1 kg 750 g. How much is left?", options: ["3 kg 250 g", "3 kg 500 g", "4 kg 250 g", "3 kg 750 g"], correctAnswer: "3 kg 250 g", solution: "5 kg = 5000 g. 1 kg 750 g = 1750 g. 5000 − 1750 = 3250 g = 3 kg 250 g." },
    ];

    const generateQuestions = () => POOL;

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

    const handleRecordResponse = () => {
        const currentQ = questions[qIndex];
        const isCorrect = selectedOption ? selectedOption === currentQ.correctAnswer : null;
        const timeSpent = Math.round((Date.now() - questionStartTime.current) / 1000);
        const isSkipped = !selectedOption;
        const responseData = { selectedOption, isCorrect, timeTaken: (responses[qIndex]?.timeTaken || 0) + timeSpent, isSkipped };
        setResponses(prev => ({ ...prev, [qIndex]: responseData }));

        const rawUid = sessionStorage.getItem('userId') || localStorage.getItem('userId');
        const uid = parseInt(rawUid, 10);
        if (!isNaN(uid)) {
            api.recordAttempt({
                difficulty_level: 'Mixed', user_id: String(uid).includes("-") ? 1 : parseInt(uid, 10),
                session_id: sessionId, skill_id: SKILL_ID, question_text: currentQ.text,
                correct_answer: currentQ.correctAnswer, student_answer: isSkipped ? "SKIPPED" : selectedOption,
                is_correct: isSkipped ? false : isCorrect, solution_text: currentQ.solution,
                time_spent_seconds: timeSpent
            }).catch(console.error);
        }
    };

    const navigateToQuestion = (targetIndex) => {
        handleRecordResponse();
        setQIndex(targetIndex);
        setSelectedOption(responses[targetIndex]?.selectedOption || null);
        questionStartTime.current = Date.now();
    };

    const handleNext = () => { if (qIndex < questions.length - 1) navigateToQuestion(qIndex + 1); else { handleRecordResponse(); finalizeTest(); } };
    const handlePrev = () => { if (qIndex > 0) navigateToQuestion(qIndex - 1); };

    const finalizeTest = async () => {
        setIsTestOver(true);
        if (sessionId) await api.finishSession(sessionId).catch(console.error);
        const rawUid = sessionStorage.getItem('userId') || localStorage.getItem('userId');
        const uid = parseInt(rawUid, 10);
        if (!isNaN(uid)) {
            const correctCount = Object.values(responses).filter(r => r.isCorrect === true).length;
            const wrongCount = Object.values(responses).filter(r => r.isCorrect === false && !r.isSkipped).length;
            const skippedCount = questions.length - correctCount - wrongCount;
            await api.createReport({ title: SKILL_NAME, type: 'practice', score: (correctCount / questions.length) * 100, parameters: { skill_id: SKILL_ID, total_questions: questions.length, correct_answers: correctCount, skipped_questions: skippedCount, time_taken_seconds: timeElapsed }, user_id: uid }).catch(console.error);
        }
    };

    const formatTime = (seconds) => { const mins = Math.floor(seconds / 60); const secs = seconds % 60; return `${mins}:${secs.toString().padStart(2, '0')}`; };

    useEffect(() => { if (isTestOver) return; const timer = setInterval(() => setTimeElapsed(p => p + 1), 1000); return () => clearInterval(timer); }, [isTestOver]);

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
                            <div className="stat-card bg-[#EFF6FF] p-6 rounded-3xl shadow-sm border-2 border-[#DBEAFE] text-center flex flex-col items-center justify-center"><span className="block text-xs font-black uppercase tracking-widest text-[#3B82F6] mb-1">Score</span><span className="text-4xl font-black text-[#1E3A8A]">{Math.round((correct / questions.length) * 100)}%</span></div>
                            <div className="stat-card bg-[#F0FDF4] p-6 rounded-3xl shadow-sm border-2 border-[#DCFCE7] text-center flex flex-col items-center justify-center"><span className="block text-xs font-black uppercase tracking-widest text-[#22C55E] mb-1">Correct</span><span className="text-4xl font-black text-[#14532D]">{correct}</span></div>
                            <div className="stat-card bg-[#FEF2F2] p-6 rounded-3xl shadow-sm border-2 border-[#FEE2E2] text-center flex flex-col items-center justify-center"><span className="block text-xs font-black uppercase tracking-widest text-[#EF4444] mb-1">Wrong</span><span className="text-4xl font-black text-[#7F1D1D]">{wrong}</span></div>
                            <div className="stat-card bg-[#F8FAFC] p-6 rounded-3xl shadow-sm border-2 border-[#E2E8F0] text-center flex flex-col items-center justify-center"><span className="block text-xs font-black uppercase tracking-widest text-[#64748B] mb-1">Skipped</span><span className="text-4xl font-black text-[#334155]">{skipped}</span></div>
                            <div className="stat-card bg-[#EFF6FF] p-6 rounded-3xl shadow-sm border-2 border-[#DBEAFE] text-center flex flex-col items-center justify-center"><span className="block text-xs font-black uppercase tracking-widest text-[#3B82F6] mb-1">Total Time</span><span className="text-4xl font-black text-[#1E3A8A]">{formatTime(timeElapsed)}</span></div>
                        </div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '3rem' }}>
                        <button onClick={() => navigate(-1)} className="bg-white text-[#31326F] border-2 border-[#31326F] px-8 py-3 rounded-2xl font-black uppercase tracking-wider hover:bg-[#31326F] hover:text-white transition-colors" style={{ fontSize: '1.1rem', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}>Back to Topics</button>
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
                                            <div className="hidden md:block truncate text-sm text-slate-500" style={{ flex: 1, maxWidth: '350px' }}><LatexContent html={q.text} /></div>
                                            {res.isSkipped ? <span className="status-badge status-skipped shrink-0">Skipped</span> : res.isCorrect ? <span className="status-badge status-correct shrink-0">Correct</span> : <span className="status-badge status-wrong shrink-0">Incorrect</span>}
                                        </div>
                                        <div style={{ color: '#64748B', display: 'flex', alignItems: 'center', gap: '1rem', flexShrink: 0 }}>
                                            <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-blue-600 font-semibold text-sm whitespace-nowrap">Check Solution ↓</span>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Clock size={16} /> {res.timeTaken}s</div>
                                        </div>
                                    </summary>
                                    <div className="solution-content">
                                        <div style={{ marginBottom: '1rem', padding: '1rem', borderLeft: '4px solid #3B82F6', background: '#F8FAFC' }}><LatexContent html={q.text} /></div>
                                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
                                            {q.options.map((opt, oIdx) => (
                                                <div key={oIdx} style={{ padding: '0.75rem', borderRadius: '8px', border: '1px solid #E2E8F0', background: opt === q.correctAnswer ? '#DCFCE7' : (opt === res.selectedOption ? '#FEE2E2' : 'white'), color: opt === q.correctAnswer ? '#166534' : (opt === res.selectedOption ? '#991B1B' : '#475569') }}><LatexContent html={opt} /></div>
                                            ))}
                                        </div>
                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                                            <div style={{ background: '#F8FAFC', padding: '1rem', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
                                                <h5 style={{ fontSize: '0.7rem', fontWeight: '800', color: '#94A3B8', textTransform: 'uppercase', marginBottom: '0.5rem', letterSpacing: '0.5px' }}>Your Answer</h5>
                                                {res.isSkipped ? <span style={{ color: '#F59E0B', fontWeight: '700', fontSize: '1.1rem' }}>Skipped</span> : <span style={{ color: res.isCorrect ? '#166534' : '#DC2626', fontWeight: '700', fontSize: '1.1rem' }}>{res.selectedOption ? <LatexContent html={res.selectedOption} /> : "Skipped"}</span>}
                                            </div>
                                            <div style={{ background: '#DCFCE7', padding: '1rem', borderRadius: '12px', border: '1px solid #BBF7D0' }}>
                                                <h5 style={{ fontSize: '0.7rem', fontWeight: '800', color: '#166534', textTransform: 'uppercase', marginBottom: '0.5rem', letterSpacing: '0.5px' }}>Correct Answer</h5>
                                                <span style={{ color: '#166534', fontWeight: '700', fontSize: '1.1rem' }}><LatexContent html={q.correctAnswer} /></span>
                                            </div>
                                        </div>
                                        <div style={{ background: '#F0F9FF', padding: '1.5rem', borderRadius: '12px', border: '1px solid #E0F2FE' }}>
                                            <h4 style={{ color: '#0284C7', fontWeight: '800', marginBottom: '1rem', textTransform: 'uppercase', fontSize: '0.85rem', letterSpacing: '0.5px' }}>Solution:</h4>
                                            {(() => { const steps = q.solution.split(/(?<=\.)\s+(?=[A-Z0-9\$])/); if (steps.length <= 1) return <LatexContent html={q.solution} />; return (<div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>{steps.map((s, i) => (<div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}><span style={{ fontWeight: '800', color: '#0F172A', fontSize: '0.9rem' }}>Step {i + 1}:</span><span style={{ color: '#334155', lineHeight: '1.6' }}><LatexContent html={s.trim()} /></span></div>))}</div>); })()}
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
                <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#31326F', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{SKILL_NAME.length > 30 ? "Chapter Test" : SKILL_NAME}</div>
                <div className="bg-white/90 backdrop-blur-md px-6 py-2 rounded-full border-2 border-[#3B82F6]/30 text-[#1E40AF] font-black text-xl shadow-lg">{qIndex + 1} / {questions.length}</div>
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}><div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl border-2 border-[#3B82F6]/30 text-[#1E40AF] font-bold text-lg shadow-md flex items-center gap-2"><Clock size={20} /> {formatTime(timeElapsed)}</div></div>
            </header>
            <main className="practice-content-wrapper" style={{ flex: 1, padding: '1rem 2rem 140px 2rem', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                <div className="practice-board-container" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) auto', gap: '2rem', maxWidth: '1200px', margin: '0 auto', alignItems: 'stretch', width: '100%', flex: 1, minHeight: 0, marginBottom: '60px' }}>
                    <div className="practice-left-col" style={{ width: "100%", minWidth: 0, height: "100%", display: "flex", flexDirection: "column", justifyContent: "flex-start" }}>
                        <div className="question-card-modern" style={{ padding: "2rem", flex: "none", minHeight: "auto", height: "fit-content", display: "flex", flexDirection: "column", justifyContent: "flex-start", margin: "0" }}>
                            <div className="question-header-modern" style={{ flexShrink: 0, marginBottom: "0.5rem" }}>
                                <h2 className="question-text-modern" style={{ fontSize: 'clamp(1rem, 1.8vw, 1.35rem)', maxHeight: 'none', fontWeight: '500', textAlign: 'left', color: '#2D3748', lineHeight: '1.5', marginBottom: '1rem' }}><LatexContent html={questions[qIndex].text} /></h2>
                            </div>
                            <div className="interaction-area-modern" style={{ marginTop: "1.5rem", flex: "none" }}>
                                <div className="options-grid-modern" style={{ display: 'grid', gap: '0.75rem', width: '100%', maxWidth: '800px', gridTemplateColumns: 'repeat(2, 1fr)' }}>
                                    {questions[qIndex].options.map((option, idx) => (<button key={idx} className={`option-btn-modern ${selectedOption === option ? 'selected' : ''}`} onClick={() => setSelectedOption(option)}><LatexContent html={option} /></button>))}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="question-palette-container" style={{ width: '300px', background: 'white', padding: '1.5rem', borderRadius: '24px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)', border: '1px solid #E2E8F0', display: 'flex', flexDirection: 'column', height: '100%', maxHeight: 'calc(100vh - 220px)' }}>
                        <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#1E293B', marginBottom: '1rem', textAlign: 'center', flexShrink: 0 }}>Question Palette</h3>
                        <div className="palette-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '0.4rem', flex: 1, alignContent: 'start' }}>
                            {questions.map((_, idx) => {
                                const isCurrent = qIndex === idx; const hasResponded = responses[idx] && !responses[idx].isSkipped; const isSkipped = responses[idx] && responses[idx].isSkipped;
                                let btnBg = '#F8FAFC', btnColor = '#64748B', btnBorder = '1px solid #E2E8F0';
                                if (isCurrent) { btnBorder = '2px solid #3B82F6'; btnBg = '#EFF6FF'; btnColor = '#1D4ED8'; } else if (hasResponded) { btnBg = '#DCFCE7'; btnColor = '#166534'; btnBorder = '1px solid #BBF7D0'; } else if (isSkipped) { btnBg = '#FFF7ED'; btnColor = '#C2410C'; btnBorder = '1px solid #FFEDD5'; }
                                return (<button key={idx} onClick={() => navigateToQuestion(idx)} style={{ height: '36px', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '6px', fontWeight: '700', fontSize: '0.85rem', cursor: 'pointer', transition: 'all 0.2s', background: btnBg, color: btnColor, border: btnBorder, padding: '0' }} className="hover:shadow-md hover:-translate-y-0.5">{idx + 1}</button>);
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
                    <div className="bottom-left"><button className="bg-red-50 text-red-500 px-6 py-2 rounded-xl border-2 border-red-100 font-bold" onClick={() => navigate(-1)}>Exit Test</button></div>
                    <div className="bottom-right"><div style={{ display: 'flex', gap: '1.5rem' }}>
                        <button className="nav-pill-next-btn nav-pastel-btn" onClick={handlePrev} disabled={qIndex === 0}><ChevronLeft size={20} /> Previous</button>
                        <button className="nav-pill-next-btn nav-pastel-btn" onClick={handleNext}>{qIndex === questions.length - 1 ? "Finish Test" : "Next Question"} <ChevronRight size={20} /></button>
                    </div></div>
                </div>
                <div className="mobile-footer-controls" style={{ justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
                    <div className="mobile-footer-left"><button className="bg-red-50 text-red-500 px-3 py-2 rounded-xl border-2 border-red-100 font-bold" style={{ fontSize: '0.8rem', display: 'flex', alignItems: 'center' }} onClick={() => navigate(-1)}>Exit</button></div>
                    <div className="mobile-footer-right" style={{ display: 'flex', gap: '5px' }}>
                        <button className="nav-pill-next-btn bg-gray-200 text-gray-600" onClick={handlePrev} disabled={qIndex === 0} style={{ display: 'flex', alignItems: 'center', padding: '0.4rem 0.8rem', borderRadius: '9999px', fontWeight: 'bold', fontSize: '0.8rem' }}><ChevronLeft size={16} strokeWidth={3} /> Prev</button>
                        <button className="nav-pill-next-btn" style={{ display: 'flex', alignItems: 'center', padding: '0.4rem 0.8rem', borderRadius: '9999px', fontWeight: 'bold', fontSize: '0.8rem' }} onClick={handleNext}>{qIndex === questions.length - 1 ? "Finish" : "Next"} <ChevronRight size={16} strokeWidth={3} /></button>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default WeighItPourItTest;

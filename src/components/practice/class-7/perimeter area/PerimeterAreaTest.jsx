import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, ChevronRight, ChevronLeft } from 'lucide-react';
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
    .exam-report-container {
        max-width: 900px;
        margin: 0 auto;
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
    .status-badge { padding: 0.25rem 0.75rem; border-radius: 9999px; font-size: 0.875rem; font-weight: 600; }
    .status-correct { background: #DCFCE7; color: #166534; }
    .status-wrong { background: #FEE2E2; color: #991B1B; }
    .status-skipped { background: #F1F5F9; color: #475569; }
    .nav-pastel-btn {
        background: linear-gradient(135deg, #3B82F6, #2563EB) !important;
        color: white !important; border: none !important;
        box-shadow: 0 4px 15px rgba(59, 130, 246, 0.4) !important;
        transition: all 0.3s ease !important; font-weight: 800 !important;
    }
    .nav-pastel-btn:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(59, 130, 246, 0.6) !important; }
    .nav-pastel-btn:disabled { background: #E2E8F0 !important; color: #94A3B8 !important; box-shadow: none !important; cursor: not-allowed !important; }
    @media (max-width: 1024px) {
        .practice-board-container { grid-template-columns: 1fr !important; justify-items: center !important; }
        .practice-left-col { width: 100% !important; max-width: 600px !important; margin: 0 auto !important; }
        .question-palette-container { width: 100% !important; max-width: 500px !important; margin: 2rem auto 0 auto !important; max-height: none !important; height: auto !important; }
        .options-grid-modern { grid-template-columns: 1fr !important; justify-items: center !important; }
        .practice-content-wrapper { padding-bottom: 80px !important; }
        .option-btn-modern { min-height: 55px; font-size: 0.9rem; min-width: unset !important; width: 100% !important; max-width: 350px !important; margin: 0 auto !important; }
    }
    @media (max-width: 640px) {
        .junior-practice-header { padding: 0 1rem !important; }
        .practice-content-wrapper { padding: 1rem 1rem 80px 1rem !important; }
        .question-card-modern { padding: 1.5rem !important; }
        .question-text-modern { font-size: 1.1rem !important; }
    }
`;

/* ─── Unified Visual Component ─── */
const TestVisual = ({ type, data }) => {
    const s = "#31326F", f = "#4FB7B320", l = "#FF6B6B";

    // Parallelogram Dimensions
    if (type === 'para_dim') {
        const { base, height } = data;
        return (
            <svg width="200" height="120" viewBox="0 0 200 120">
                <path d="M50,100 L150,100 L170,20 L70,20 Z" fill={f} stroke={s} strokeWidth="2" />
                <line x1="70" y1="20" x2="70" y2="100" stroke={l} strokeWidth="1.5" strokeDasharray="4" />
                <rect x="70" y="90" width="10" height="10" fill="none" stroke={l} strokeWidth="1" />
                <text x="100" y="115" fontSize="12" fill={s} textAnchor="middle">{base}</text>
                <text x="65" y="60" fontSize="12" fill={l} textAnchor="end">{height}</text>
            </svg>
        );
    }

    // Triangle Dimensions
    if (type === 'tri_dim') {
        const { base, height } = data;
        return (
            <svg width="200" height="120" viewBox="0 0 200 120">
                <path d="M40,100 L160,100 L100,20 Z" fill={f} stroke={s} strokeWidth="2" />
                <line x1="100" y1="20" x2="100" y2="100" stroke={l} strokeWidth="1.5" strokeDasharray="4" />
                <rect x="100" y="90" width="10" height="10" fill="none" stroke={l} strokeWidth="1" />
                <text x="100" y="115" fontSize="12" fill={s} textAnchor="middle">{base}</text>
                <text x="105" y="60" fontSize="12" fill={l} textAnchor="start">{height}</text>
            </svg>
        );
    }

    // Circle Dimensions
    if (type === 'circle_dim') {
        const { r } = data;
        return (
            <svg width="140" height="140" viewBox="0 0 140 140">
                <circle cx="70" cy="70" r="50" fill={f} stroke={s} strokeWidth="2" />
                <circle cx="70" cy="70" r="2" fill={s} />
                <line x1="70" y1="70" x2="120" y2="70" stroke={l} strokeWidth="2" />
                <text x="95" y="60" fontSize="12" fill={l} textAnchor="middle">r = {r}</text>
            </svg>
        );
    }

    // Wire problem
    if (type === 'wire') {
        return (
            <svg width="200" height="80" viewBox="0 0 200 80">
                <rect x="30" y="15" width="50" height="50" fill="none" stroke={l} strokeWidth="2" />
                <text x="55" y="75" fontSize="10" fill={s} textAnchor="middle">Square</text>

                <path d="M100,40 L120,40" stroke={s} strokeWidth="2" markerEnd="url(#arrow)" />
                <defs><marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto"><path d="M0,0 L0,6 L9,3 z" fill={s} /></marker></defs>

                <circle cx="160" cy="40" r="25" fill="none" stroke={s} strokeWidth="2" />
                <text x="160" y="75" fontSize="10" fill={s} textAnchor="middle">Circle</text>
            </svg>
        );
    }

    return null;
};

/* ─── Main Component ─── */

const SKILL_ID = "1093";
const SKILL_NAME = "Class 7 - Perimeter and Area - Chapter Test";

const PerimeterAreaTest = () => {
    const navigate = useNavigate();
    const [qIndex, setQIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [timeElapsed, setTimeElapsed] = useState(0);
    const [isTestOver, setIsTestOver] = useState(false);
    const [responses, setResponses] = useState({});
    const questionStartTime = useRef(Date.now());
    const [sessionId, setSessionId] = useState(null);
    const [questions, setQuestions] = useState([]);

    const pickRandom = (arr, n) => {
        const shuffled = [...arr].sort(() => Math.random() - 0.5);
        return shuffled.slice(0, n);
    };

    useEffect(() => {
        const shuffle = arr => [...arr].sort(() => Math.random() - 0.5);

        // ── TOPIC 1: Parallelograms ──
        const paraPool = [
            () => ({ text: `<p>Find area of parallelogram with Base=7 cm, Height=4 cm.</p>`, visual: { type: 'para_dim', data: { base: '7 cm', height: '4 cm' } }, correctAnswer: "28 cm²", options: shuffle(["28 cm²", "14 cm²", "11 cm²", "22 cm²"]), solution: `<p>Area = \\( b \\times h = 7 \\times 4 = 28 \\text{ cm}^2 \\).</p>` }),
            () => ({ text: `<p>If Area = 246 cm² and Base = 20 cm, find Height.</p>`, correctAnswer: "12.3 cm", options: shuffle(["12.3 cm", "123 cm", "12.3 cm²", "10 cm"]), solution: `<p>Height = \\( 246 \\div 20 = 12.3 \\text{ cm} \\).</p>` }),
            () => ({ text: `<p>A parallelogram has base 8 cm and height 3.5 cm. What is its area?</p>`, visual: { type: 'para_dim', data: { base: '8 cm', height: '3.5 cm' } }, correctAnswer: "28 cm²", options: shuffle(["28 cm²", "32 cm²", "24 cm²", "14 cm²"]), solution: `<p>Area = \\( 8 \\times 3.5 = 28 \\text{ cm}^2 \\).</p>` }),
            () => ({ text: `<p>Find the base of a parallelogram if Area = 56 cm² and Height = 7 cm.</p>`, correctAnswer: "8 cm", options: shuffle(["8 cm", "7 cm", "49 cm", "63 cm"]), solution: `<p>Base = \\( 56 \\div 7 = 8 \\text{ cm} \\).</p>` }),
            () => ({ text: `<p>The area formula for a parallelogram is:</p>`, correctAnswer: "base × height", options: shuffle(["base × height", "½ × base × height", "side × side", "length × breadth × 2"]), solution: `<p>Area of parallelogram = \\( b \\times h \\).</p>` }),
        ];

        // ── TOPIC 2: Triangles ──
        const triPool = [
            () => ({ text: `<p>Find area of triangle with Base=4 cm, Height=3 cm.</p>`, visual: { type: 'tri_dim', data: { base: '4 cm', height: '3 cm' } }, correctAnswer: "6 cm²", options: shuffle(["6 cm²", "12 cm²", "7 cm²", "10 cm²"]), solution: `<p>Area = \\( \\frac{1}{2} \\times 4 \\times 3 = 6 \\text{ cm}^2 \\).</p>` }),
            () => ({ text: `<p>Find height of triangle if Area = 87 cm² and Base = 15 cm.</p>`, correctAnswer: "11.6 cm", options: shuffle(["11.6 cm", "5.8 cm", "116 cm", "12 cm"]), solution: `<p>\\( 87 = \\frac{1}{2} \\times 15 \\times h \\Rightarrow 174 = 15h \\Rightarrow h = 11.6 \\text{ cm} \\).</p>` }),
            () => ({ text: `<p>Is the area of a triangle half of a parallelogram of the same base and height?</p>`, correctAnswer: "Yes", options: shuffle(["Yes", "No", "Depends on shape", "Only for right triangles"]), solution: `<p>Yes, two identical triangles form a parallelogram.</p>` }),
            () => ({ text: `<p>Find the area of a triangle with Base = 10 cm and Height = 6 cm.</p>`, visual: { type: 'tri_dim', data: { base: '10 cm', height: '6 cm' } }, correctAnswer: "30 cm²", options: shuffle(["30 cm²", "60 cm²", "16 cm²", "20 cm²"]), solution: `<p>Area = \\( \\frac{1}{2} \\times 10 \\times 6 = 30 \\text{ cm}^2 \\).</p>` }),
            () => ({ text: `<p>A triangle has area 24 cm² and base 8 cm. Find its height.</p>`, correctAnswer: "6 cm", options: shuffle(["6 cm", "3 cm", "16 cm", "12 cm"]), solution: `<p>\\( 24 = \\frac{1}{2} \\times 8 \\times h \\Rightarrow h = 6 \\text{ cm} \\).</p>` }),
        ];

        // ── TOPIC 3: Circles ──
        const circPool = [
            () => ({ text: `<p>Circumference of a circle with radius 14 cm (\\( \\pi = \\frac{22}{7} \\)) is:</p>`, visual: { type: 'circle_dim', data: { r: '14 cm' } }, correctAnswer: "88 cm", options: shuffle(["88 cm", "44 cm", "154 cm", "616 cm"]), solution: `<p>\\( C = 2 \\times \\frac{22}{7} \\times 14 = 88 \\text{ cm} \\).</p>` }),
            () => ({ text: `<p>Area of circle with radius 10 cm (\\( \\pi = 3.14 \\)) is:</p>`, visual: { type: 'circle_dim', data: { r: '10 cm' } }, correctAnswer: "314 cm²", options: shuffle(["314 cm²", "31.4 cm²", "100 cm²", "628 cm²"]), solution: `<p>Area = \\( 3.14 \\times 10 \\times 10 = 314 \\text{ cm}^2 \\).</p>` }),
            () => ({ text: `<p>A wire in shape of square (side 11 cm) is reshaped into a circle. Find radius (\\( \\pi = \\frac{22}{7} \\)).</p>`, visual: { type: 'wire' }, correctAnswer: "7 cm", options: shuffle(["7 cm", "14 cm", "11 cm", "22 cm"]), solution: `<p>Perimeter = 44 cm. \\( 2\\pi r = 44 \\Rightarrow 2 \\times \\frac{22}{7} \\times r = 44 \\Rightarrow r = 7 \\text{ cm} \\).</p>` }),
            () => ({ text: `<p>Find area of circle with Diameter = 20 cm (\\( \\pi = 3.14 \\)).</p>`, visual: { type: 'circle_dim', data: { r: '10 cm' } }, correctAnswer: "314 cm²", options: shuffle(["314 cm²", "100 cm²", "628 cm²", "31.4 cm²"]), solution: `<p>Radius = 10 cm. Area = \\( 3.14 \\times 100 = 314 \\text{ cm}^2 \\).</p>` }),
            () => ({ text: `<p>Find the circumference of a circle with radius 7 cm (\\( \\pi = \\frac{22}{7} \\)).</p>`, visual: { type: 'circle_dim', data: { r: '7 cm' } }, correctAnswer: "44 cm", options: shuffle(["44 cm", "22 cm", "154 cm", "88 cm"]), solution: `<p>\\( C = 2 \\times \\frac{22}{7} \\times 7 = 44 \\text{ cm} \\).</p>` }),
        ];

        // 5 from Para, 5 from Tri, 5 from Circ => 15 Questions
        const selected = [
            ...pickRandom(paraPool, 5).map(fn => fn()),
            ...pickRandom(triPool, 5).map(fn => fn()),
            ...pickRandom(circPool, 5).map(fn => fn())
        ];

        setQuestions(selected);
    }, []);

    useEffect(() => {
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
        setResponses(prev => ({ ...prev, [qIndex]: { selectedOption, isCorrect, timeTaken: (prev[qIndex]?.timeTaken || 0) + timeSpent, isSkipped } }));
        const rawUid = sessionStorage.getItem('userId') || localStorage.getItem('userId');
        const uid = parseInt(rawUid, 10);
        if (!isNaN(uid)) {
            api.recordAttempt({ user_id: uid, session_id: sessionId, skill_id: SKILL_ID, template_id: null, difficulty_level: 'Medium',
                question_text: String(currentQ.text || ''), correct_answer: String(currentQ.correctAnswer || ''),
                student_answer: String(isSkipped ? "SKIPPED" : (selectedOption || '')), is_correct: isSkipped ? false : isCorrect,
                solution_text: String(currentQ.solution || ''), time_spent_seconds: timeSpent
            }).catch(console.error);
        }
    };

    const navigateToQuestion = (targetIndex) => {
        handleRecordResponse();
        setQIndex(targetIndex);
        setSelectedOption(responses[targetIndex]?.selectedOption || null);
        questionStartTime.current = Date.now();
    };

    const handleNext = () => { if (qIndex < questions.length - 1) { navigateToQuestion(qIndex + 1); } else { handleRecordResponse(); finalizeTest(); } };
    const handlePrev = () => { if (qIndex > 0) { navigateToQuestion(qIndex - 1); } };

    const finalizeTest = async () => {
        setIsTestOver(true);
        if (sessionId) await api.finishSession(sessionId).catch(console.error);
        const rawUid = sessionStorage.getItem('userId') || localStorage.getItem('userId');
        const uid = parseInt(rawUid, 10);
        if (!isNaN(uid)) {
            const correctCount = Object.values(responses).filter(r => r.isCorrect === true).length;
            const wrongCount = Object.values(responses).filter(r => r.isCorrect === false && !r.isSkipped).length;
            const skippedCount = questions.length - correctCount - wrongCount;
            await api.createReport({ title: SKILL_NAME, type: 'practice', score: (correctCount / questions.length) * 100,
                parameters: { skill_id: SKILL_ID, total_questions: questions.length, correct_answers: correctCount, skipped_questions: skippedCount, time_taken_seconds: timeElapsed },
                user_id: uid }).catch(console.error);
        }
    };

    const formatTime = (s) => `${Math.floor(s/60)}:${(s%60).toString().padStart(2,'0')}`;

    if (questions.length === 0) return <div>Loading...</div>;

    if (isTestOver) {
        const correct = Object.values(responses).filter(r => r.isCorrect === true).length;
        const wrong = Object.values(responses).filter(r => r.isCorrect === false && !r.isSkipped).length;
        const skipped = questions.length - correct - wrong;
        return (
            <div className="junior-practice-page grey-selection-theme p-4 md:p-8" style={{ background: '#F8FAFC', minHeight: '100vh', overflowY: 'auto' }}>
                <style>{BLUE_THEME_CSS}</style>
                <div className="exam-report-container mx-auto p-4 md:p-8 my-4 md:my-8">
                    <div className="flex flex-col items-center mb-8 mt-4 text-center">
                        <img src={mascotImg} alt="Mascot" className="w-32 h-32 md:w-40 md:h-40 mb-2 drop-shadow-lg object-contain" />
                        <h1 className="text-3xl md:text-5xl font-black text-[#31326F] mb-2">Test Report</h1>
                        <p className="text-[#64748B] text-base md:text-xl font-medium mb-8">How you performed in <span className="font-bold">{SKILL_NAME}</span></p>
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4 w-full max-w-5xl">
                            <div className="bg-[#EFF6FF] p-4 md:p-6 rounded-2xl shadow-sm border-2 border-[#DBEAFE] text-center"><span className="block text-[10px] md:text-xs font-black uppercase tracking-widest text-[#3B82F6] mb-1">Score</span><span className="text-2xl md:text-4xl font-black text-[#1E3A8A]">{Math.round((correct/questions.length)*100)}%</span></div>
                            <div className="bg-[#F0FDF4] p-4 md:p-6 rounded-2xl shadow-sm border-2 border-[#DCFCE7] text-center"><span className="block text-[10px] md:text-xs font-black uppercase tracking-widest text-[#22C55E] mb-1">Correct</span><span className="text-2xl md:text-4xl font-black text-[#14532D]">{correct}</span></div>
                            <div className="bg-[#FEF2F2] p-4 md:p-6 rounded-2xl shadow-sm border-2 border-[#FEE2E2] text-center"><span className="block text-[10px] md:text-xs font-black uppercase tracking-widest text-[#EF4444] mb-1">Wrong</span><span className="text-2xl md:text-4xl font-black text-[#7F1D1D]">{wrong}</span></div>
                            <div className="bg-[#F8FAFC] p-4 md:p-6 rounded-2xl shadow-sm border-2 border-[#E2E8F0] text-center"><span className="block text-[10px] md:text-xs font-black uppercase tracking-widest text-[#64748B] mb-1">Skipped</span><span className="text-2xl md:text-4xl font-black text-[#334155]">{skipped}</span></div>
                            <div className="bg-[#EFF6FF] p-4 md:p-6 rounded-2xl shadow-sm border-2 border-[#DBEAFE] text-center col-span-2 md:col-span-1"><span className="block text-[10px] md:text-xs font-black uppercase tracking-widest text-[#3B82F6] mb-1">Time</span><span className="text-2xl md:text-4xl font-black text-[#1E3A8A]">{formatTime(timeElapsed)}</span></div>
                        </div>
                    </div>
                    <div className="flex justify-center mb-12"><button onClick={() => navigate(-1)} className="bg-white text-[#31326F] border-2 border-[#31326F] px-8 py-3 rounded-2xl font-black uppercase hover:bg-[#31326F] hover:text-white transition-colors" style={{ fontSize: '1.1rem' }}>Back to Topics</button></div>
                    <div style={{ maxWidth: 1000, margin: '0 auto 2rem' }}>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1E293B', marginBottom: '1.5rem' }}>Detailed Review & Solutions</h2>
                        {questions.map((q, idx) => {
                            const res = responses[idx] || { isSkipped: true, timeTaken: 0 };
                            return (
                                <details key={idx} className="solution-accordion group">
                                    <summary className="solution-header cursor-pointer hover:bg-slate-50" style={{ listStyle: 'none', width: '100%' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: 1 }}>
                                            <span style={{ fontWeight: 800, minWidth: 32, height: 32, background: '#FBBF24', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', fontSize: '0.9rem', flexShrink: 0 }}>{idx+1}</span>
                                            <div className="hidden md:block truncate text-sm text-slate-500" style={{ flex: 1, maxWidth: 350 }}><LatexContent html={q.text} /></div>
                                            {res.isSkipped ? <span className="status-badge status-skipped">Skipped</span> : res.isCorrect ? <span className="status-badge status-correct">Correct</span> : <span className="status-badge status-wrong">Incorrect</span>}
                                        </div>
                                        <div style={{ color: '#64748B', display: 'flex', alignItems: 'center', gap: '1rem', flexShrink: 0 }}>
                                            <span className="opacity-0 group-hover:opacity-100 text-blue-600 font-semibold text-sm">Check Solution ↓</span>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Clock size={16}/> {res.timeTaken}s</div>
                                        </div>
                                    </summary>
                                    <div className="solution-content">
                                        <div style={{ marginBottom: '1rem', padding: '1rem', borderLeft: '4px solid #3B82F6', background: '#F8FAFC' }}><LatexContent html={q.text} /></div>
                                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
                                            {q.options.map((opt, oIdx) => (<div key={oIdx} style={{ padding: '0.75rem', borderRadius: 8, border: '1px solid #E2E8F0', background: opt===q.correctAnswer?'#DCFCE7':(opt===res.selectedOption?'#FEE2E2':'white'), color: opt===q.correctAnswer?'#166534':(opt===res.selectedOption?'#991B1B':'#475569') }}><LatexContent html={opt} /></div>))}
                                        </div>
                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                                            <div style={{ background: '#F8FAFC', padding: '1rem', borderRadius: 12, border: '1px solid #E2E8F0' }}>
                                                <h5 style={{ fontSize: '0.7rem', fontWeight: 800, color: '#94A3B8', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Your Answer</h5>
                                                {res.isSkipped ? <span style={{ color: '#F59E0B', fontWeight: 700 }}>Skipped</span> : <span style={{ color: res.isCorrect?'#166534':'#DC2626', fontWeight: 700 }}>{res.selectedOption ? <LatexContent html={res.selectedOption}/> : "Skipped"}</span>}
                                            </div>
                                            <div style={{ background: '#DCFCE7', padding: '1rem', borderRadius: 12, border: '1px solid #BBF7D0' }}>
                                                <h5 style={{ fontSize: '0.7rem', fontWeight: 800, color: '#166534', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Correct Answer</h5>
                                                <span style={{ color: '#166534', fontWeight: 700 }}><LatexContent html={q.correctAnswer}/></span>
                                            </div>
                                        </div>
                                        <div style={{ background: '#F0F9FF', padding: '1.5rem', borderRadius: 12, border: '1px solid #E0F2FE' }}>
                                            <h4 style={{ color: '#0284C7', fontWeight: 800, marginBottom: '1rem', textTransform: 'uppercase', fontSize: '0.85rem' }}>Solution:</h4>
                                            <LatexContent html={q.solution} />
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
            <header className="junior-practice-header" style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) auto minmax(0,1fr)', alignItems: 'center', padding: '0 2rem', gap: '1rem' }}>
                <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#31326F', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{SKILL_NAME}</div>
                <div className="bg-white/90 backdrop-blur-md px-6 py-2 rounded-full border-2 border-[#3B82F6]/30 text-[#1E40AF] font-black text-xl shadow-lg">{qIndex+1} / {questions.length}</div>
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl border-2 border-[#3B82F6]/30 text-[#1E40AF] font-bold text-lg shadow-md flex items-center gap-2"><Clock size={20}/> {formatTime(timeElapsed)}</div>
                </div>
            </header>
            <main className="practice-content-wrapper" style={{ flex: 1, padding: '1rem 2rem 140px 2rem', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                <div className="practice-board-container" style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) auto', gap: '2rem', maxWidth: 1200, margin: '0 auto', alignItems: 'stretch', width: '100%', flex: 1, minHeight: 0, marginBottom: 60 }}>
                    <div className="practice-left-col" style={{ width: '100%', minWidth: 0, height: '100%', display: 'flex', flexDirection: 'column' }}>
                        <div className="question-card-modern" style={{ padding: '2rem', flex: 1, display: 'flex', flexDirection: 'column', overflow: 'visible', justifyContent: 'flex-start' }}>
                            <div className="question-header-modern" style={{ flexShrink: 0, marginBottom: '1rem' }}>
                                <h2 className="question-text-modern" style={{ fontSize: 'clamp(1rem,1.8vw,1.35rem)', maxHeight: 'none', fontWeight: 500, textAlign: 'left', color: '#2D3748', lineHeight: 1.5, marginBottom: '1rem' }}>
                                    <LatexContent html={questions[qIndex].text} />
                                </h2>
                            </div>
                            <div className="interaction-area-modern" style={{ display: 'flex', flexDirection: 'column', marginTop: '1rem' }}>
                                <div className="options-grid-modern" style={{ display: 'grid', gap: '0.75rem', width: '100%', maxWidth: 800, gridTemplateColumns: 'repeat(2,1fr)' }}>
                                    {questions[qIndex].options.map((option, idx) => (
                                        <button key={idx} className={`option-btn-modern ${selectedOption===option?'selected':''}`} onClick={() => setSelectedOption(option)}>
                                            <LatexContent html={option} />
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="question-palette-container" style={{ width: 300, background: 'white', padding: '1.5rem', borderRadius: 24, boxShadow: '0 4px 6px -1px rgb(0 0 0/0.1)', border: '1px solid #E2E8F0', display: 'flex', flexDirection: 'column', height: '100%', maxHeight: 'calc(100vh - 220px)' }}>
                        <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#1E293B', marginBottom: '1rem', textAlign: 'center' }}>Question Palette</h3>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: '0.4rem', flex: 1, alignContent: 'start' }}>
                            {questions.map((_,idx) => {
                                const isCurrent = qIndex===idx;
                                const hasResponded = responses[idx] && !responses[idx].isSkipped;
                                const isSkipped = responses[idx] && responses[idx].isSkipped;
                                let bg='#F8FAFC',clr='#64748B',bdr='1px solid #E2E8F0';
                                if (isCurrent) { bdr='2px solid #3B82F6'; bg='#EFF6FF'; clr='#1D4ED8'; }
                                else if (hasResponded) { bg='#DCFCE7'; clr='#166534'; bdr='1px solid #BBF7D0'; }
                                else if (isSkipped) { bg='#FFF7ED'; clr='#C2410C'; bdr='1px solid #FFEDD5'; }
                                return (<button key={idx} onClick={() => navigateToQuestion(idx)} style={{ height: 36, width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 6, fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer', transition: 'all 0.2s', background: bg, color: clr, border: bdr, padding: 0 }} className="hover:shadow-md hover:-translate-y-0.5">{idx+1}</button>);
                            })}
                        </div>
                        <div style={{ marginTop: 'auto', paddingTop: '1rem', display: 'grid', gridTemplateColumns: '1fr 1fr', rowGap: '0.5rem', columnGap: '1rem', fontSize: '0.8rem', color: '#64748B' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><div style={{ width: 12, height: 12, borderRadius: 3, background: '#DCFCE7', border: '1px solid #BBF7D0' }}></div> Answered</div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><div style={{ width: 12, height: 12, borderRadius: 3, background: '#FFF7ED', border: '1px solid #FFEDD5' }}></div> Skipped</div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><div style={{ width: 12, height: 12, borderRadius: 3, background: '#F8FAFC', border: '1px solid #E2E8F0' }}></div> Unvisited</div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><div style={{ width: 12, height: 12, borderRadius: 3, background: '#EFF6FF', border: '2px solid #3B82F6' }}></div> Current</div>
                        </div>
                    </div>
                </div>
            </main>
            <footer className="junior-bottom-bar">
                <div className="desktop-footer-controls">
                    <div className="bottom-left"><button className="bg-red-50 text-red-500 px-6 py-2 rounded-xl border-2 border-red-100 font-bold" onClick={() => navigate(-1)}>Exit Test</button></div>
                    <div className="bottom-right">
                        <div style={{ display: 'flex', gap: '1.5rem' }}>
                            <button className="nav-pill-next-btn nav-pastel-btn" onClick={handlePrev} disabled={qIndex===0}><ChevronLeft size={20}/> Previous</button>
                            <button className="nav-pill-next-btn nav-pastel-btn" onClick={handleNext}>{qIndex===questions.length-1?"Finish Test":"Next Question"} <ChevronRight size={20}/></button>
                        </div>
                    </div>
                </div>
                <div className="mobile-footer-controls">
                    <button className="nav-pill-next-btn nav-pastel-btn" style={{ padding: '0.5rem 1rem' }} onClick={handlePrev} disabled={qIndex===0}><ChevronLeft size={24}/></button>
                    <button className="nav-pill-next-btn nav-pastel-btn" onClick={handleNext} style={{ flex: 1 }}>{qIndex===questions.length-1?"Finish":"Next"} <ChevronRight size={24}/></button>
                </div>
            </footer>
        </div>
    );
};

export default PerimeterAreaTest;

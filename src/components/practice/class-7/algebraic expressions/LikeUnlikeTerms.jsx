import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, X, Eye, ChevronRight, ChevronLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../../../../services/api';
import LatexContent from '../../../LatexContent';
import ExplanationModal from '../../../ExplanationModal';
import mascotImg from '../../../../assets/mascot.png';
import '../../../../pages/juniors/JuniorPracticeSession.css';

const CORRECT_MESSAGES = ["✨ Amazing!", "🌟 Brilliant!", "🎉 Correct!", "🚀 Super!", "💎 Excellent!"];

/* ─── SVG Visuals ─── */
const LikeUnlikeVisual = ({ type, data }) => {
    // Visual for grouping like terms? 
    // Maybe coloured boxes for different variable types.
    if (type === 'grouping_boxes') {
        const s = "#31326F";
        return (
            <svg width="250" height="80" viewBox="0 0 250 80">
                {/* Box 1: x terms */}
                <rect x="10" y="10" width="60" height="60" rx="4" fill="#E3F2FD" stroke="#2196F3" strokeWidth="2" />
                <text x="40" y="45" fontSize="14" fill="#1565C0" textAnchor="middle" fontWeight="bold">7x, -2x</text>

                {/* Box 2: y terms */}
                <rect x="90" y="10" width="60" height="60" rx="4" fill="#F3E5F5" stroke="#9C27B0" strokeWidth="2" />
                <text x="120" y="45" fontSize="14" fill="#7B1FA2" textAnchor="middle" fontWeight="bold">5y, y</text>

                {/* Box 3: xy terms */}
                <rect x="170" y="10" width="60" height="60" rx="4" fill="#E8F5E9" stroke="#4CAF50" strokeWidth="2" />
                <text x="200" y="45" fontSize="14" fill="#2E7D32" textAnchor="middle" fontWeight="bold">3xy</text>
            </svg>
        );
    }
    return null;
};

/* ─── Main Component ─── */
const LikeUnlikeTerms = () => {
    const navigate = useNavigate();
    const [questions, setQuestions] = useState([]);
    const [qIndex, setQIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const [showExplanationModal, setShowExplanationModal] = useState(false);
    const [timeElapsed, setTimeElapsed] = useState(0);
    const [feedbackMessage, setFeedbackMessage] = useState("");
    const [answers, setAnswers] = useState({});
    const [sessionId, setSessionId] = useState(null);
    const questionStartTime = useRef(Date.now());
    const accumulatedTime = useRef(0);
    const isTabActive = useRef(true);

    const SKILL_ID = "1097";
    const SKILL_NAME = "Class 7 - Algebraic Expressions - Like and Unlike Terms";

    /* ─── Helper: pick N random items from an array ─── */
    const pickRandom = (arr, n) => {
        const shuffled = [...arr].sort(() => Math.random() - 0.5);
        return shuffled.slice(0, n);
    };

    /* ─── Helper: Shuffle options ensuring no duplicates ─── */
    const shuffle = (array) => {
        return [...new Set(array)].sort(() => Math.random() - 0.5);
    };

    useEffect(() => {
        // ── Subtopic 3.1: Identifying Like Terms ──
        const identifyPool = [
            () => ({
                text: `<p>Are \\(7x\\) and \\(12y\\) like terms?</p>`,
                correctAnswer: "No",
                options: shuffle(["No", "Yes", "Sometimes", "Only if x=y"]),
                solution: `<p>Like terms must have the same algebraic factors (variables). \\(x\\) and \\(y\\) are different.</p>`
            }),
            () => ({
                text: `<p>Are \\(15x\\) and \\(-21x\\) like terms?</p>`,
                correctAnswer: "Yes",
                options: shuffle(["Yes", "No", "Only if x is positive", "Cannot say"]),
                solution: `<p>Both have the same variable \\(x\\). Assume exponents are 1. So, Yes.</p>`
            }),
            () => ({
                text: `<p>Which pair consists of like terms?</p>`,
                correctAnswer: "\\(6xy^2, 9xy^2\\)",
                options: shuffle(["\\(6xy^2, 9xy^2\\)", "\\(10x, 10\\)", "\\(pq, p^2q\\)", "\\(m, -m^2\\)"]),
                solution: `<p>Both have \\(xy^2\\).</p>`
            }),
            () => ({
                text: `<p>Are \\(4m^2p\\) and \\(4mp^2\\) like terms?</p>`,
                correctAnswer: "No",
                options: shuffle(["No", "Yes", "Sometimes", "Only if m=p"]),
                solution: `<p>No. In the first term \\(m\\) is squared, in the second \\(p\\) is squared. Powers must match.</p>`
            }),
            () => ({
                text: `<p>Are \\(abc\\) and \\(3cba\\) like terms?</p>`,
                correctAnswer: "Yes",
                options: shuffle(["Yes", "No", "Partially", "None"]),
                solution: `<p>Order of multiplication doesn't matter. \\(abc = cba\\). So, Yes.</p>`
            })
        ];

        // ── Subtopic 3.2: Grouping Like Terms ──
        const groupingPool = [
            () => ({
                text: `<p>Identify the like terms in: \\(12x, 12, -25x, -25\\).</p>`,
                visual: { type: 'grouping_boxes' },
                correctAnswer: "\\(12x, -25x\\) and \\(12, -25\\)",
                options: shuffle(["\\(12x, -25x\\) and \\(12, -25\\)", "\\(12x, 12\\)", "\\(-25x, -25\\)", "None"]),
                solution: `<p>Terms with \\(x\\) go together. Constants go together.</p>`
            }),
            () => ({
                text: `<p>Group like terms from: \\(10pq, 7p, 8q, -pq, -7p\\).</p>`,
                correctAnswer: "\\(10pq, -pq\\) and \\(7p, -7p\\)",
                options: shuffle(["\\(10pq, -pq\\) and \\(7p, -7p\\)", "\\(10pq, 7p\\)", "\\(8q, -pq\\)", "All are unlike"]),
                solution: `<p>\\(pq\\) terms match. \\(p\\) terms match. \\(8q\\) is alone.</p>`
            }),
            () => ({
                text: `<p>Which of these is a like term with \\(7mn\\)?</p>`,
                correctAnswer: "\\(-5nm\\)",
                options: shuffle(["\\(-5nm\\)", "\\(7m\\)", "\\(7n\\)", "\\(7m^2n\\)"]),
                solution: `<p>\\(mn\\) is same as \\(nm\\). So \\(-5nm\\) matches.</p>`
            }),
            () => ({
                text: `<p>Select the group of like terms:</p>`,
                correctAnswer: "\\(12x, -5x, x\\)",
                options: shuffle(["\\(12x, -5x, x\\)", "\\(12x, 12y, 12z\\)", "\\(x, x^2, x^3\\)", "\\(5, 5x, 5y\\)"]),
                solution: `<p>All terms in \\(12x, -5x, x\\) contain only the variable \\(x\\).</p>`
            }),
            () => ({
                text: `<p>Which term is <b>not</b> like the others? \\(3a, -a, 10a, 3b\\)</p>`,
                correctAnswer: "\\(3b\\)",
                options: shuffle(["\\(3b\\)", "\\(3a\\)", "\\(-a\\)", "\\(10a\\)"]),
                solution: `<p>\\(3a, -a, 10a\\) are like terms with variable \\(a\\). \\(3b\\) has variable \\(b\\).</p>`
            })
        ];

        // Pick 5 from identify, 5 from grouping -> Total 10 questions
        const selected = [
            ...pickRandom(identifyPool, 5).map(fn => fn()),
            ...pickRandom(groupingPool, 5).map(fn => fn()),
        ];

        setQuestions(selected);
    }, []);

    useEffect(() => {
        const uid = sessionStorage.getItem('userId') || localStorage.getItem('userId');
        if (uid && !sessionId) api.createPracticeSession(uid, SKILL_ID).then(s => s && setSessionId(s.session_id)).catch(console.error);
        const timer = setInterval(() => setTimeElapsed(p => p + 1), 1000);
        const hv = () => { if (document.hidden) { accumulatedTime.current += Date.now() - questionStartTime.current; isTabActive.current = false; } else { questionStartTime.current = Date.now(); isTabActive.current = true; } };
        document.addEventListener("visibilitychange", hv);
        return () => { clearInterval(timer); document.removeEventListener("visibilitychange", hv); };
    }, [sessionId]);

    const recordAttempt = async (q, sel, cor) => {
        const uid = sessionStorage.getItem('userId') || localStorage.getItem('userId');
        if (!uid) return;
        let t = accumulatedTime.current; if (isTabActive.current) t += Date.now() - questionStartTime.current;
        try { await api.recordAttempt({ user_id: parseInt(uid), session_id: sessionId, skill_id: SKILL_ID, difficulty_level: 'Medium', question_text: String(q.text), correct_answer: String(q.correctAnswer), student_answer: String(sel), is_correct: cor, solution_text: String(q.solution), time_spent_seconds: Math.max(0, Math.round(t / 1000)) }); } catch (e) { console.error(e); }
    };

    const handleCheck = () => {
        if (!selectedOption || !questions[qIndex]) return;
        const right = selectedOption === questions[qIndex].correctAnswer;
        setIsCorrect(right); setIsSubmitted(true);
        if (right) setFeedbackMessage(CORRECT_MESSAGES[Math.floor(Math.random() * CORRECT_MESSAGES.length)]);
        else setShowExplanationModal(true);
        setAnswers(prev => ({ ...prev, [qIndex]: { selectedOption, isCorrect: right } }));
        recordAttempt(questions[qIndex], selectedOption, right);
    };

    const handleNext = async () => {
        if (qIndex < questions.length - 1) {
            setQIndex(prev => prev + 1);
            accumulatedTime.current = 0; questionStartTime.current = Date.now();
        } else {
            if (sessionId) await api.finishSession(sessionId).catch(console.error);
            const uid = sessionStorage.getItem('userId') || localStorage.getItem('userId');
            if (uid) {
                const c = Object.values(answers).filter(v => v.isCorrect).length;
                await api.createReport({ title: SKILL_NAME, type: 'practice', score: (c / questions.length) * 100, parameters: { skill_id: SKILL_ID, skill_name: SKILL_NAME, total_questions: questions.length, correct_answers: c, time_taken_seconds: timeElapsed }, user_id: parseInt(uid) }).catch(console.error);
            }
            navigate(-1);
        }
    };

    useEffect(() => {
        const saved = answers[qIndex];
        if (saved) { setSelectedOption(saved.selectedOption); setIsCorrect(saved.isCorrect); setIsSubmitted(true); }
        else { setSelectedOption(null); setIsCorrect(false); setIsSubmitted(false); }
        setShowExplanationModal(false);
    }, [qIndex]);

    if (questions.length === 0) return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', color: '#31326F' }}>Loading questions...</div>;
    const cq = questions[qIndex];

    return (
        <div className="junior-practice-page raksha-theme" style={{ fontFamily: '"Open Sans", sans-serif' }}>
            <header className="junior-practice-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 2rem' }}>
                <div className="header-left"><span style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#31326F' }}>Like & Unlike</span></div>
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-max">
                    <div className="bg-white/90 backdrop-blur-md px-3 py-1.5 sm:px-6 sm:py-2 rounded-full border-2 border-[#4FB7B3]/30 text-[#31326F] font-black text-sm sm:text-xl shadow-lg whitespace-nowrap">Question {qIndex + 1} / {questions.length}</div>
                </div>
                <div className="header-right">
                    <div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl border-2 border-[#4FB7B3]/30 text-[#31326F] font-bold text-lg shadow-md flex items-center gap-2">{Math.floor(timeElapsed / 60)}:{(timeElapsed % 60).toString().padStart(2, '0')}</div>
                </div>
            </header>

            <main className="practice-content-wrapper">
                <div className="practice-board-container" style={{ gridTemplateColumns: '1fr', maxWidth: '800px', margin: '0 auto' }}>
                    <div className="practice-left-col" style={{ width: '100%' }}>
                        <div className="question-card-modern" style={{ paddingLeft: '2rem' }}>
                            <div className="question-header-modern">
                                <h2 className="question-text-modern" style={{ fontSize: 'clamp(1rem, 2vw, 1.6rem)', maxHeight: 'none', fontWeight: '500', textAlign: 'left', justifyContent: 'flex-start', overflow: 'visible' }}><LatexContent html={cq.text} /></h2>
                            </div>
                            {cq.visual && <div style={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}><LikeUnlikeVisual {...cq.visual} /></div>}
                            <div className="interaction-area-modern">
                                <div className="options-grid-modern">
                                    {cq.options.map((opt, i) => (
                                        <button key={i} className={`option-btn-modern ${selectedOption === opt ? 'selected' : ''} ${isSubmitted && opt === cq.correctAnswer ? 'correct' : ''} ${isSubmitted && selectedOption === opt && !isCorrect ? 'wrong' : ''}`} onClick={() => !isSubmitted && setSelectedOption(opt)} disabled={isSubmitted}><LatexContent html={opt} /></button>
                                    ))}
                                </div>
                                <AnimatePresence>{isSubmitted && isCorrect && (
                                    <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="feedback-mini correct" style={{ marginTop: '20px' }}><div className="flex items-center gap-3"><img src={mascotImg} alt="Mascot" className="w-12 h-12 object-contain" /><span>{feedbackMessage}</span></div></motion.div>
                                )}</AnimatePresence>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <ExplanationModal isOpen={showExplanationModal} isCorrect={isCorrect} correctAnswer={cq.correctAnswer} explanation={cq.solution} onClose={() => setShowExplanationModal(false)} />

            <footer className="junior-bottom-bar" style={{ position: 'fixed', bottom: 0 }}>
                <div className="desktop-footer-controls">
                    <div className="bottom-left"><button className="bg-red-50 text-red-500 px-6 py-2 rounded-xl border-2 border-red-100 font-bold hover:bg-red-100 transition-colors flex items-center gap-2" onClick={() => navigate(-1)}>Exit</button></div>
                    <div className="bottom-center">{isSubmitted && <button className="view-explanation-btn" onClick={() => setShowExplanationModal(true)}><Eye size={20} /> View Explanation</button>}</div>
                    <div className="bottom-right">
                        <div className="nav-buttons-group">
                            <button className="nav-pill-next-btn bg-gray-200 text-gray-600" onClick={() => setQIndex(i => Math.max(0, i - 1))} disabled={qIndex === 0}><ChevronLeft size={28} strokeWidth={3} /> Prev</button>
                            {isSubmitted ? (
                                <button className="nav-pill-next-btn" onClick={handleNext}>{qIndex < questions.length - 1 ? (<>Next <ChevronRight size={28} strokeWidth={3} /></>) : (<>Done <Check size={28} strokeWidth={3} /></>)}</button>
                            ) : (
                                <button className="nav-pill-submit-btn" onClick={handleCheck} disabled={!selectedOption}>Submit <Check size={28} strokeWidth={3} /></button>
                            )}
                        </div>
                    </div>
                </div>
                <div className="mobile-footer-controls">
                    <div className="flex items-center gap-2">
                        <button className="bg-red-50 text-red-500 p-2 rounded-lg border border-red-100" onClick={() => navigate(-1)}><X size={20} /></button>
                        {isSubmitted && <button className="view-explanation-btn" onClick={() => setShowExplanationModal(true)}><Eye size={18} /> Explain</button>}
                    </div>
                    <div className="mobile-footer-right" style={{ width: 'auto' }}>
                        <div className="nav-buttons-group">
                            <button className="nav-pill-next-btn bg-gray-200 text-gray-600 p-2" onClick={() => setQIndex(i => Math.max(0, i - 1))} disabled={qIndex === 0}><ChevronLeft size={20} /></button>
                            {isSubmitted ? (<button className="nav-pill-next-btn" onClick={handleNext}>{qIndex < questions.length - 1 ? "Next" : "Done"}</button>) : (<button className="nav-pill-submit-btn" onClick={handleCheck} disabled={!selectedOption}>Submit</button>)}
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default LikeUnlikeTerms;
